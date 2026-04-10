import dayjs from 'dayjs';
import { selectModel } from '@/services/yuan/llmModelController';
import {
  chatConversationEdit,
  chatConversationGetInfo,
  chatConversationList,
  chatConversationRemove,
} from '@/services/yuan/chatConversationController';
import { chatMessageList } from '@/services/yuan/chatMessageController';

export type ChatRole = 'user' | 'assistant';
export type MessageStatus = 'done' | 'streaming' | 'error';

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  status?: MessageStatus;
  createdAt: string;
};

export type ConversationItem = {
  id: string;
  title: string;
  preview: string;
  model: string;
  updatedAt: string;
  messages: ChatMessage[];
  isDraft?: boolean;
};

export type ModelOption = {
  label: string;
  value: string;
};

export type ChatRuntimeContext = {
  tenantId: string;
  userId: string;
};

export type LoadChatMessagesParams = ChatRuntimeContext & {
  conversationId: string;
  pageNum?: number;
  pageSize?: number;
};

export type LoadChatMessagesResult = {
  messages: ChatMessage[];
  total: number;
  pageNum: number;
  pageSize: number;
  hasMore: boolean;
};

export type SendChatMessageParams = ChatRuntimeContext & {
  conversationId?: string;
  model: string;
  content: string;
  messages: ChatMessage[];
  regenerate?: boolean;
  onDelta?: (deltaText: string) => void;
};

export type SendChatMessageResult = {
  conversationId?: string;
  title?: string;
  preview?: string;
  assistantMessage: ChatMessage;
};

type StreamMeta = {
  conversationId?: string;
  title?: string;
  preview?: string;
};

type SseEvent = {
  event: string;
  data: string;
};

const PAGE_SIZE = 100;
const MESSAGE_PAGE_SIZE = 20;
const CHAT_STREAM_URL = 'http://localhost:6011/ai/chat/stream';

const normalizeLineEndings = (value: string) => value.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

const parseSseBlock = (block: string): SseEvent | null => {
  const lines = block.split('\n').map((line) => line.trimEnd());
  let eventName = 'message';
  const dataLines: string[] = [];

  for (const line of lines) {
    if (!line || line.startsWith(':')) {
      continue;
    }
    if (line.startsWith('event:')) {
      eventName = line.slice(6).trim();
      continue;
    }
    if (line.startsWith('data:')) {
      dataLines.push(line.slice(5).trimStart());
    }
  }

  if (!dataLines.length) {
    return null;
  }

  return { event: eventName, data: dataLines.join('\n') };
};

const parseSse = (buffer: string): { events: SseEvent[]; rest: string } => {
  const normalized = normalizeLineEndings(buffer);
  const parts = normalized.split('\n\n');
  const rest = parts.pop() ?? '';
  const events: SseEvent[] = [];

  for (const block of parts) {
    const parsed = parseSseBlock(block);
    if (parsed) {
      events.push(parsed);
    }
  }

  return { events, rest };
};

const safeJsonParse = (value: string) => {
  try {
    return JSON.parse(value);
  } catch (_error) {
    return undefined;
  }
};

const normalizeMessageRole = (role?: string): ChatRole | null => {
  if (role === 'user') {
    return 'user';
  }
  if (role === 'assistant') {
    return 'assistant';
  }
  return null;
};

const getPreview = (content?: string) => {
  const normalized = (content ?? '').trim().replace(/\s+/g, ' ');
  if (!normalized) {
    return '';
  }
  return normalized.length > 32 ? `${normalized.slice(0, 32)}...` : normalized;
};

const mapModelOption = (item: API.SelectModel): ModelOption | null => {
  if (!item.value) {
    return null;
  }
  return {
    value: item.value,
    label: item.label ?? item.value,
  };
};

const mapConversationItem = (item: API.ChatConversationVo, defaultModel: string): ConversationItem => {
  const meta = item.metaJson ? safeJsonParse(item.metaJson) : undefined;
  return {
    id: item.id,
    title: item.title || '未命名会话',
    preview: '',
    model: typeof meta?.model === 'string' ? meta.model : defaultModel,
    updatedAt: item.lastMessageAt || item.updateTime || item.createTime || dayjs().toISOString(),
    messages: [],
  };
};

const mapMessageItem = (item: API.ChatMessageVo): ChatMessage | null => {
  const role = normalizeMessageRole(item.role);
  if (!role) {
    return null;
  }

  return {
    id: item.id,
    role,
    content: item.content ?? '',
    status: item.status === 'FAILED' ? 'error' : 'done',
    createdAt: item.createTime || item.updateTime || dayjs().toISOString(),
  };
};

const isChatMessage = (item: ChatMessage | null): item is ChatMessage => Boolean(item);

const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const parseEventPayload = (raw: string) => {
  const parsed = safeJsonParse(raw);
  if (!parsed) {
    return {
      text: raw,
      meta: {} as StreamMeta,
      isError: false,
    };
  }

  const meta: StreamMeta = {
    conversationId:
      parsed.conversationId ?? parsed.data?.conversationId ?? parsed.result?.conversationId,
    title: parsed.title ?? parsed.data?.title ?? parsed.result?.title,
    preview: parsed.preview ?? parsed.data?.preview ?? parsed.result?.preview,
  };

  const text =
    parsed.delta ??
    parsed.content ??
    parsed.message ??
    parsed.text ??
    parsed.answer ??
    parsed.data?.delta ??
    parsed.data?.content ??
    parsed.data?.message ??
    parsed.result?.content ??
    parsed.result?.message ??
    '';

  return {
    text: typeof text === 'string' ? text : '',
    meta,
    isError: parsed.success === false || parsed.code === 500 || parsed.event === 'error',
  };
};

const buildMetaFromNamedEvent = (eventName: string, rawData: string): StreamMeta => {
  if (eventName === 'conversationId') {
    return { conversationId: rawData.trim() };
  }
  if (eventName === 'title') {
    return { title: rawData.trim() };
  }
  if (eventName === 'preview') {
    return { preview: rawData.trim() };
  }
  return {};
};

const isContentEvent = (eventName: string) => eventName === 'delta' || eventName === 'message';

const resolveStreamText = (eventName: string, payloadText: string, currentContent: string) => {
  if (!payloadText) {
    return {
      nextContent: currentContent,
      changed: false,
    };
  }

  if (eventName === 'delta') {
    return {
      nextContent: currentContent + payloadText,
      changed: true,
    };
  }

  if (!currentContent) {
    return {
      nextContent: payloadText,
      changed: true,
    };
  }

  if (payloadText.startsWith(currentContent)) {
    return {
      nextContent: payloadText,
      changed: payloadText !== currentContent,
    };
  }

  return {
    nextContent: currentContent + payloadText,
    changed: true,
  };
};

const applyStreamUpdate = (
  currentContent: string,
  eventName: string,
  rawData: string,
  onDelta?: (deltaText: string) => void,
) => {
  const payload = parseEventPayload(rawData);
  const resolved = resolveStreamText(eventName, payload.text || rawData, currentContent);

  if (resolved.changed) {
    onDelta?.(resolved.nextContent);
  }

  return {
    nextContent: resolved.nextContent,
    changed: resolved.changed,
    meta: payload.meta,
    isError: payload.isError,
    text: payload.text || rawData,
  };
};

const buildListPageQuery = (pageNum = 1, pageSize = PAGE_SIZE): API.PageQuery => ({
  pageNum,
  pageSize,
});

export const chatPageApi = {
  async loadModels(): Promise<ModelOption[]> {
    const response = await selectModel();
    return (response.data ?? []).map(mapModelOption).filter(Boolean) as ModelOption[];
  },

  async loadConversations(
    params: ChatRuntimeContext & {
      defaultModel: string;
    },
  ): Promise<ConversationItem[]> {
    const response = await chatConversationList({
      bo: {
        tenantId: params.tenantId,
        userId: params.userId,
        appId: '',
        title: '',
        modelId: '',
        metaJson: '',
        lastMessageAt: '',
        createTime: '',
        updateTime: '',
      },
      pageQuery: buildListPageQuery(),
    });

    return (response.rows ?? [])
      .map((item) => mapConversationItem(item, params.defaultModel))
      .sort((left, right) => dayjs(right.updatedAt).valueOf() - dayjs(left.updatedAt).valueOf());
  },

  async loadMessages(params: LoadChatMessagesParams): Promise<LoadChatMessagesResult> {
    const pageNum = params.pageNum ?? 1;
    const pageSize = params.pageSize ?? MESSAGE_PAGE_SIZE;
    const response = await chatMessageList({
      bo: {
        tenantId: params.tenantId,
        conversationId: params.conversationId,
        userId: params.userId,
        role: '',
        content: '',
        contentFormat: '',
        status: '',
        modelId: '',
        createTime: '',
        updateTime: '',
      },
      pageQuery: {
        ...buildListPageQuery(pageNum, pageSize),
        orderByColumn: 'create_time',
        isAsc: 'desc',
      },
    });

    const messages = (response.rows ?? [])
      .map(mapMessageItem)
      .filter(isChatMessage)
      .sort((left, right) => dayjs(left.createdAt).valueOf() - dayjs(right.createdAt).valueOf());

    const total = Number(response.total ?? messages.length);

    return {
      messages,
      total,
      pageNum,
      pageSize,
      hasMore: pageNum * pageSize < total,
    };
  },

  async renameConversation(
    params: ChatRuntimeContext & {
      conversationId: string;
      title: string;
    },
  ) {
    const detail = await chatConversationGetInfo({ id: params.conversationId });
    const current = detail.data;

    if (!current) {
      throw new Error('未找到会话详情');
    }

    await chatConversationEdit({
      id: params.conversationId,
      tenantId: current.tenantId || params.tenantId,
      userId: current.userId || params.userId,
      appId: current.appId,
      title: params.title,
      modelId: current.modelId,
      metaJson: current.metaJson,
      lastMessageAt: current.lastMessageAt
    });
  },

  async deleteConversation(conversationId: string) {
    await chatConversationRemove({
      ids: [conversationId],
    });
  },

  async sendMessage(params: SendChatMessageParams): Promise<SendChatMessageResult> {
    const traceId = `trace_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    const body: API.ChatRequest = {
      tenantId: params.tenantId,
      userId: params.userId,
      traceId,
      conversationId: params.conversationId,
      modelId: params.model,
      autoSelectModel: !params.model,
      stream: true,
      persistChatMessage: true,
      messages: params.messages.map((item) => ({
        role: item.role,
        content: item.content,
      })),
      prompt: params.content,
    };

    const response = await fetch(CHAT_STREAM_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream',
        'Cache-Control': 'no-cache',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok || !response.body) {
      throw new Error(`聊天请求失败：${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    const contentType = response.headers.get('content-type') ?? '';
    const isEventStream = contentType.includes('text/event-stream');
    let assistantContent = '';
    let lastMessage = '';
    let started = false;
    let meta: StreamMeta = {};
    let lineBuffer = '';
    let currentEventName = 'message';
    let currentDataLines: string[] = [];
    let currentEventAppliedOptimistically = false;

    const finalizeCurrentEvent = () => {
      if (!currentDataLines.length) {
        currentEventName = 'message';
        currentDataLines = [];
        currentEventAppliedOptimistically = false;
        return;
      }

      const rawData = currentDataLines.join('\n');
      const payload = parseEventPayload(rawData);
      meta = { ...meta, ...buildMetaFromNamedEvent(currentEventName, rawData), ...payload.meta };

      if (currentEventName === 'error' || payload.isError) {
        throw new Error(payload.text || rawData || '聊天接口返回错误');
      }

      if (currentEventName === 'done') {
        if (!assistantContent && lastMessage) {
          assistantContent = lastMessage;
        }
      } else if (
        isContentEvent(currentEventName) &&
        !(currentEventAppliedOptimistically && currentDataLines.length === 1)
      ) {
        const resolved = resolveStreamText(
          currentEventName,
          payload.text || rawData,
          assistantContent,
        );
        if (resolved.changed) {
          started = true;
          assistantContent = resolved.nextContent;
          lastMessage = assistantContent;
          params.onDelta?.(assistantContent);
        }
      }

      currentEventName = 'message';
      currentDataLines = [];
      currentEventAppliedOptimistically = false;
    };

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      const chunkText = decoder.decode(value, { stream: true });

      if (!isEventStream) {
        const resolved = resolveStreamText('delta', chunkText, assistantContent);
        if (resolved.changed) {
          started = true;
          assistantContent = resolved.nextContent;
          lastMessage = assistantContent;
          params.onDelta?.(assistantContent);
        }
        continue;
      }

      const normalizedChunk = normalizeLineEndings(chunkText);
      lineBuffer += normalizedChunk;
      const lines = lineBuffer.split('\n');
      lineBuffer = lines.pop() ?? '';

      for (const line of lines) {
        if (!line) {
          finalizeCurrentEvent();
          continue;
        }

        if (line.startsWith(':')) {
          continue;
        }

        if (line.startsWith('event:')) {
          currentEventName = line.slice(6).trim() || 'message';
          continue;
        }

        if (line.startsWith('data:')) {
          const rawData = line.slice(5).trimStart();
          currentDataLines.push(rawData);

          if (
            currentDataLines.length === 1 &&
            currentEventName !== 'done' &&
            currentEventName !== 'error' &&
            isContentEvent(currentEventName)
          ) {
            const optimistic = applyStreamUpdate(
              assistantContent,
              currentEventName,
              rawData,
              params.onDelta,
            );
            meta = {
              ...meta,
              ...buildMetaFromNamedEvent(currentEventName, rawData),
              ...optimistic.meta,
            };
            if (optimistic.isError) {
              throw new Error(optimistic.text || '聊天接口返回错误');
            }
            if (optimistic.changed) {
              started = true;
              assistantContent = optimistic.nextContent;
              lastMessage = assistantContent;
              currentEventAppliedOptimistically = true;
            }
          }
          continue;
        }

        const resolved = resolveStreamText('delta', line, assistantContent);
        if (resolved.changed) {
          started = true;
          assistantContent = resolved.nextContent;
          lastMessage = assistantContent;
          params.onDelta?.(assistantContent);
        }
      }
    }

    if (!isEventStream) {
      if (lineBuffer) {
        const resolved = resolveStreamText('delta', lineBuffer, assistantContent);
        if (resolved.changed) {
          started = true;
          assistantContent = resolved.nextContent;
          lastMessage = assistantContent;
          params.onDelta?.(assistantContent);
        }
      }
    } else {
      if (lineBuffer) {
        const remaining = parseSse(lineBuffer);
        for (const event of remaining.events) {
          const payload = parseEventPayload(event.data);
          meta = { ...meta, ...buildMetaFromNamedEvent(event.event, event.data), ...payload.meta };
          if (event.event === 'error' || payload.isError) {
            throw new Error(payload.text || event.data || '聊天接口返回错误');
          }
          if (isContentEvent(event.event)) {
            const resolved = resolveStreamText(event.event, payload.text || event.data, assistantContent);
            if (resolved.changed) {
              started = true;
              assistantContent = resolved.nextContent;
              lastMessage = assistantContent;
              params.onDelta?.(assistantContent);
            }
          }
        }
      }
      finalizeCurrentEvent();
      const tailEvent = parseSseBlock(lineBuffer);
      if (tailEvent) {
        const payload = parseEventPayload(tailEvent.data);
        meta = { ...meta, ...buildMetaFromNamedEvent(tailEvent.event, tailEvent.data), ...payload.meta };
        if (tailEvent.event === 'error' || payload.isError) {
          throw new Error(payload.text || tailEvent.data || '聊天接口返回错误');
        }
        if (isContentEvent(tailEvent.event)) {
          const resolved = resolveStreamText(
            tailEvent.event,
            payload.text || tailEvent.data,
            assistantContent,
          );
          if (resolved.changed) {
            started = true;
            assistantContent = resolved.nextContent;
            lastMessage = assistantContent;
            params.onDelta?.(assistantContent);
          }
        }
      }
    }

    const finalContent = assistantContent || lastMessage;
    if (!started && !finalContent) {
      throw new Error('聊天接口未返回内容');
    }

    return {
      conversationId: meta.conversationId,
      title: meta.title,
      preview: meta.preview ?? getPreview(finalContent),
      assistantMessage: {
        id: `assistant_${Date.now()}`,
        role: 'assistant',
        content: finalContent,
        status: 'done',
        createdAt: dayjs().toISOString(),
      },
    };
  },
};
