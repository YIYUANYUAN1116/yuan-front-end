import { DeleteOutlined, OpenAIOutlined, SyncOutlined } from '@ant-design/icons';
import {
  Actions,
  Bubble,
  BubbleListProps,
  Conversations,
  Sender,
  SenderProps,
  XProvider,
} from '@ant-design/x';
import XMarkdown from '@ant-design/x-markdown';
import { Flex, GetRef, message as antdMessage, Select, Space, Tag } from 'antd';
import { createStyles } from 'antd-style';
import { clsx } from 'clsx';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import '@ant-design/x-markdown/themes/light.css';
import '@ant-design/x-markdown/themes/dark.css';
import { BubbleListRef } from '@ant-design/x/es/bubble';
import { useMarkdownTheme } from './utils';
import locale from './locat';

// ===== 实际接口 =====
import { selectProvider } from '@/services/yuan/llmProviderController';
import { selectEndpoint } from '@/services/yuan/llmEndpointController';


// ✅ 你的后端 SSE URL（POST）
const CHAT_URL = '/api/ai/chat';

type Role = 'user' | 'assistant' | 'system';
type MsgStatus = 'loading' | 'updating' | 'success' | 'error';

type Msg = {
  id: string;
  message: {
    role: Role;
    content: string;
    extraInfo?: any;
  };
  status: MsgStatus;
};

type OptionItem = {
  label: string;
  value: string;
  raw?: any;
};

const uid = (p = 'm') => `${p}_${Math.random().toString(16).slice(2)}_${Date.now()}`;

// =============== styles ===============
const useStyle = createStyles(({ token, css }) => {
  return {
    layout: css`
      width: 100%;
      height: 100vh;
      display: flex;
      background: ${token.colorBgContainer};
      overflow: hidden;
    `,
    side: css`
      background: ${token.colorBgLayout};
      width: 280px;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0 12px;
      box-sizing: border-box;
    `,
    logo: css`
      display: flex;
      align-items: center;
      justify-content: start;
      padding: 0 24px;
      box-sizing: border-box;
      gap: 8px;
      margin: 24px 0;

      span {
        font-weight: bold;
        color: ${token.colorText};
        font-size: 16px;
      }
    `,
    conversations: css`
      overflow-y: auto;
      margin-top: 12px;
      padding: 0;
      flex: 1;
      .ant-conversations-list {
        padding-inline-start: 0;
      }
    `,
    chat: css`
      height: 100%;
      width: calc(100% - 240px);
      overflow: auto;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding-block: ${token.paddingLG}px;
      padding-inline: ${token.paddingLG}px;
      gap: 16px;
      .ant-bubble-content-updating {
        background-image: linear-gradient(90deg, #ff6b23 0%, #af3cb8 31%, #53b6ff 89%);
        background-size: 100% 2px;
        background-repeat: no-repeat;
        background-position: bottom;
      }
    `,
    startPage: css`
      display: flex;
      width: 100%;
      max-width: 840px;
      flex-direction: column;
      align-items: center;
      height: 100%;
    `,
    agentName: css`
      margin-block-start: 25%;
      font-size: 32px;
      margin-block-end: 38px;
      font-weight: 600;
    `,
    chatList: css`
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      flex-direction: column;
      justify-content: space-between;
    `,
  };
});

const DEFAULT_CONVERSATIONS_ITEMS = [
  { key: 'default-0', label: locale.whatIsAntDesignX, group: locale.today },
];

type Conv = { key: string; label: string; group?: string };
const groupBy = (items: Conv[]) => items;

const slotConfig: SenderProps['slotConfig'] = [
  { type: 'text', value: locale.slotTextStart },
  {
    type: 'select',
    key: 'destination',
    props: {
      defaultValue: 'Chat',
      options: ['Chat'],
    },
  },
  { type: 'text', value: locale.slotTextEnd },
];

const ChatContext = React.createContext<{ onRetry?: (assistantId: string) => void }>({});

const Footer: React.FC<{ id?: string; content: string; status?: string }> = ({
  id,
  content,
  status,
}) => {
  const context = React.useContext(ChatContext);
  const items = [
    {
      key: 'retry',
      label: locale.retry,
      icon: <SyncOutlined />,
      onItemClick: () => id && context?.onRetry?.(id),
    },
    { key: 'copy', actionRender: <Actions.Copy text={content} /> },
  ];
  return status !== 'updating' && status !== 'loading' ? (
    <div style={{ display: 'flex' }}>{id && <Actions items={items} />}</div>
  ) : null;
};

const getRole = (className: string): BubbleListProps['role'] => ({
  assistant: {
    placement: 'start',
    footer: (content, { status, key }) => <Footer content={content} status={status} id={key as string} />,
    contentRender: (content: any, { status }) => {
      const newContent = String(content ?? '').replace(/\n\n/g, '<br/><br/>');
      return (
        <XMarkdown
          paragraphTag="div"
          className={className}
          streaming={{
            hasNextChunk: status === 'updating',
            enableAnimation: true,
          }}
        >
          {newContent}
        </XMarkdown>
      );
    },
  },
  user: { placement: 'end' },
});

// ==================== SSE(POST) 解析 ====================
type SseEvent = { event: string; data: string };

function parseSse(buffer: string): { events: SseEvent[]; rest: string } {
  const parts = buffer.split('\n\n');
  const rest = parts.pop() ?? '';
  const events: SseEvent[] = [];

  for (const block of parts) {
    const lines = block.split('\n').map((l) => l.trimEnd());
    let eventName = 'message';
    const dataLines: string[] = [];
    for (const line of lines) {
      if (line.startsWith('event:')) eventName = line.slice(6).trim();
      if (line.startsWith('data:')) dataLines.push(line.slice(5).trimStart());
    }
    events.push({ event: eventName, data: dataLines.join('\n') });
  }
  return { events, rest };
}

// ==================== 请求体 ====================
function buildChatBody(args: {
  tenantId: string;
  traceId: string;
  stream: boolean;
  enableThinking: boolean;

  providerCode?: string;
  endpointKey?: string;
  modelId?: string;

  conversationId: string;
  assistantMsgId: string;

  systemPrompt?: string;
  history: { role: Role; content: string }[];
  prompt: string;
}) {
  return {
    tenantId: args.tenantId,
    traceId: args.traceId,
    stream: args.stream,
    enableThinking: args.enableThinking,

    providerCode: args.providerCode,
    endpointKey: args.endpointKey,
    modelId: args.modelId,

    conversationId: args.conversationId,
    assistantMsgId: args.assistantMsgId,

    systemPrompt: args.systemPrompt ?? '',
    messages: args.history,
    prompt: args.prompt,
  };
}

const App = () => {
  const [className] = useMarkdownTheme();
  const senderRef = useRef<GetRef<typeof Sender>>(null);
  const listRef = useRef<BubbleListRef>(null);
  const { styles } = useStyle();
  const [messageApi, contextHolder] = antdMessage.useMessage();

  // ===== 真实 provider / endpoint / model =====
  const [providerOptions, setProviderOptions] = useState<OptionItem[]>([]);
  const [endpointOptions, setEndpointOptions] = useState<OptionItem[]>([]);
  const [modelOptions, setModelOptions] = useState<OptionItem[]>([]);

  const [providerCode, setProviderCode] = useState<string>();
  const [endpointKey, setEndpointKey] = useState<string>();
  const [modelId, setModelId] = useState<string>();

  const [providerLoading, setProviderLoading] = useState(false);
  const [endpointLoading, setEndpointLoading] = useState(false);
  const [modelLoading, setModelLoading] = useState(false);

  // ===== 会话 =====
  const [conversations, setConversations] = useState<Conv[]>(DEFAULT_CONVERSATIONS_ITEMS);
  const [curConversation, setCurConversation] = useState<string>(DEFAULT_CONVERSATIONS_ITEMS[0].key);

  const [messagesMap, setMessagesMap] = useState<Record<string, Msg[]>>({
    [DEFAULT_CONVERSATIONS_ITEMS[0].key]: [],
  });

  const messages = messagesMap[curConversation] ?? [];
  const retryMapRef = useRef<Record<string, { prompt: string; snapshot: Msg[] }>>({});
  const abortRef = useRef<AbortController | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [deepThink, setDeepThink] = useState<boolean>(false);

  useEffect(() => {
    senderRef.current?.focus?.({ cursor: 'end' });
  }, []);

  // ===== 初始化加载 provider =====
  useEffect(() => {
    loadProviders();
  }, []);

  const loadProviders = async () => {
    try {
      setProviderLoading(true);
      const res = await selectProvider();
      const list = (res?.data ?? []).map((item: any) => ({
        label: item.label ?? item.providerName ?? item.name,
        value: item.value ?? item.providerCode ?? item.code,
        raw: item,
      }));
      setProviderOptions(list);

      if (list.length > 0) {
        const firstProvider = list[0].value;
        setProviderCode(firstProvider);
      }
    } catch (e) {
      messageApi.error('加载供应商失败');
    } finally {
      setProviderLoading(false);
    }
  };

  // ===== provider 切换 -> 加载 endpoint =====
  useEffect(() => {
    if (!providerCode) {
      setEndpointOptions([]);
      setEndpointKey(undefined);
      setModelOptions([]);
      setModelId(undefined);
      return;
    }
    loadEndpoints(providerCode);
  }, [providerCode]);

  const loadEndpoints = async (providerCodeValue: string) => {
    try {
      setEndpointLoading(true);
      setEndpointKey(undefined);
      setEndpointOptions([]);
      setModelOptions([]);
      setModelId(undefined);

      const res = await selectEndpoint({providerCode:providerCodeValue});
      const list = (res?.data ?? []).map((item: any) => ({
        label: item.label ?? item.endpointName ?? item.name,
        value: item.value ?? item.endpointKey ?? item.key,
        raw: item,
      }));
      setEndpointOptions(list);

      if (list.length > 0) {
        setEndpointKey(list[0].value);
      }
    } catch (e) {
      messageApi.error('加载接入点失败');
    } finally {
      setEndpointLoading(false);
    }
  };

  // ===== endpoint 切换 -> 加载 model =====
  useEffect(() => {
    if (!endpointKey) {
      setModelOptions([]);
      setModelId(undefined);
      return;
    }
    loadModels(endpointKey);
  }, [endpointKey]);

  const loadModels = async (endpointKeyValue: string) => {
    try {
      setModelLoading(true);
      setModelId(undefined);
      setModelOptions([]);

      const res = await selectModelByEndpointKey(endpointKeyValue);
      const list = (res?.data ?? []).map((item: any) => ({
        label: item.label ?? item.displayName ?? item.modelName,
        value: item.value ?? String(item.id ?? item.modelId ?? item.modelName),
        raw: item,
      }));
      setModelOptions(list);

      if (list.length > 0) {
        setModelId(list[0].value);
      }
    } catch (e) {
      messageApi.error('加载模型失败');
    } finally {
      setModelLoading(false);
    }
  };

  const setCurMessages = (updater: (prev: Msg[]) => Msg[]) => {
    setMessagesMap((prev) => {
      const list = prev[curConversation] ?? [];
      return { ...prev, [curConversation]: updater(list) };
    });
  };

  const abort = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsRequesting(false);
  };

  const scrollToBottom = () => listRef.current?.scrollTo?.({ top: 'bottom' });

  const runChat = async (prompt: string, baseHistory?: Msg[]) => {
    if (isRequesting) return;
    if (!prompt?.trim()) return;

    if (!providerCode) {
      messageApi.warning('请先选择供应商');
      return;
    }
    if (!endpointKey) {
      messageApi.warning('请先选择接入点');
      return;
    }
    if (!modelId) {
      messageApi.warning('请先选择模型');
      return;
    }

    setIsRequesting(true);

    const userId = uid('u');
    const asstId = uid('a');
    const historyMsgs = baseHistory ?? messages;

    const nextList: Msg[] = [
      ...historyMsgs,
      { id: userId, message: { role: 'user', content: prompt }, status: 'success' },
      { id: asstId, message: { role: 'assistant', content: '' }, status: 'loading' },
    ];
    setMessagesMap((prev) => ({ ...prev, [curConversation]: nextList }));
    retryMapRef.current[asstId] = { prompt, snapshot: historyMsgs };

    const ac = new AbortController();
    abortRef.current = ac;

    try {
      const body = buildChatBody({
        tenantId: 'T1',
        traceId: uid('trace'),
        stream: true,
        enableThinking: deepThink,

        providerCode,
        endpointKey,
        modelId,

        conversationId: curConversation,
        assistantMsgId: asstId,

        systemPrompt: '',
        history: historyMsgs.map((m) => ({
          role: m.message.role,
          content: m.message.content,
        })),
        prompt,
      });

      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: ac.signal,
      });

      if (!resp.ok || !resp.body) {
        throw new Error(`HTTP ${resp.status} ${resp.statusText}`);
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';
      let started = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const parsed = parseSse(buffer);
        buffer = parsed.rest;

        for (const ev of parsed.events) {
          if (ev.event === 'delta') {
            started = true;
            const delta = ev.data ?? '';
            if (!delta) continue;

            setCurMessages((prev) =>
              prev.map((m) =>
                m.id === asstId
                  ? {
                      ...m,
                      status: 'updating',
                      message: { ...m.message, content: (m.message.content ?? '') + delta },
                    }
                  : m,
              ),
            );
            scrollToBottom();
          } else if (ev.event === 'message') {
            started = true;
            setCurMessages((prev) =>
              prev.map((m) =>
                m.id === asstId
                  ? {
                      ...m,
                      status: 'success',
                      message: { ...m.message, content: ev.data ?? '' },
                    }
                  : m,
              ),
            );
            scrollToBottom();
          } else if (ev.event === 'error') {
            setCurMessages((prev) =>
              prev.map((m) =>
                m.id === asstId
                  ? {
                      ...m,
                      status: 'error',
                      message: { ...m.message, content: ev.data || 'error' },
                    }
                  : m,
              ),
            );
          } else if (ev.event === 'done') {
            setCurMessages((prev) =>
              prev.map((m) => (m.id === asstId ? { ...m, status: 'success' } : m)),
            );
          }
        }
      }

      if (started) {
        setCurMessages((prev) =>
          prev.map((m) =>
            m.id === asstId && m.status === 'updating' ? { ...m, status: 'success' } : m,
          ),
        );
      } else {
        setCurMessages((prev) =>
          prev.map((m) =>
            m.id === asstId
              ? {
                  ...m,
                  status: 'error',
                  message: { ...m.message, content: locale.noData },
                }
              : m,
          ),
        );
      }
    } catch (e: any) {
      if (e?.name === 'AbortError') {
        setCurMessages((prev) =>
          prev.map((m) => (m.id === asstId ? { ...m, status: 'success' } : m)),
        );
      } else {
        setCurMessages((prev) =>
          prev.map((m) =>
            m.id === asstId
              ? {
                  ...m,
                  status: 'error',
                  message: { ...m.message, content: e?.message ?? locale.requestFailed },
                }
              : m,
          ),
        );
      }
    } finally {
      abortRef.current = null;
      setIsRequesting(false);
    }
  };

  const onRetry = async (assistantId: string) => {
    const info = retryMapRef.current[assistantId];
    if (!info) {
      messageApi.warning('找不到可重试的信息');
      return;
    }
    abort();
    await runChat(info.prompt, info.snapshot);
  };

  const createConversation = () => {
    if ((messagesMap[curConversation] ?? []).length === 0) {
      messageApi.error(locale.itIsNowANewConversation);
      return;
    }
    const nowKey = dayjs().valueOf().toString();
    const newConv: Conv = {
      key: nowKey,
      label: `新会话 ${conversations.length + 1}`,
      group: locale.today,
    };
    setConversations((prev) => [newConv, ...prev]);
    setMessagesMap((prev) => ({ ...prev, [nowKey]: [] }));
    setCurConversation(nowKey);
  };

  return (
    <XProvider locale={locale}>
      {contextHolder}
      <ChatContext.Provider value={{ onRetry }}>
        <div className={styles.layout}>
          <div className={styles.side}>
            <div className={styles.logo}>
              <img
                src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*eco6RrQhxbMAAAAAAAAAAAAADgCCAQ/original"
                draggable={false}
                alt="logo"
                width={24}
                height={24}
              />
              <span>AI Chat</span>
            </div>

            <Conversations
              creation={{ onClick: createConversation }}
              items={groupBy(conversations)}
              className={styles.conversations}
              activeKey={curConversation}
              onActiveChange={(val) => setCurConversation(val)}
              groupable
              styles={{ item: { padding: '0 8px' } }}
              menu={(conversation) => ({
                items: [
                  {
                    label: locale.delete,
                    key: 'delete',
                    icon: <DeleteOutlined />,
                    danger: true,
                    onClick: () => {
                      const newList = conversations.filter((item) => item.key !== conversation.key);
                      const newKey = newList?.[0]?.key;
                      setConversations(newList);
                      setMessagesMap((prev) => {
                        const copy = { ...prev };
                        delete copy[conversation.key];
                        return copy;
                      });
                      if (conversation.key === curConversation && newKey) {
                        setCurConversation(newKey);
                      }
                    },
                  },
                ],
              })}
            />
          </div>

          <div className={styles.chat}>
            <div className={styles.chatList}>
              <Flex style={{ width: '100%', maxWidth: 1120 }} justify="space-between" align="center">
                <Space wrap>
                  <Tag color="blue">Provider</Tag>
                  <Select
                    style={{ width: 180 }}
                    value={providerCode}
                    options={providerOptions}
                    loading={providerLoading}
                    placeholder="请选择供应商"
                    onChange={(val) => setProviderCode(val)}
                  />

                  <Tag color="geekblue">Endpoint</Tag>
                  <Select
                    style={{ width: 220 }}
                    value={endpointKey}
                    options={endpointOptions}
                    loading={endpointLoading}
                    placeholder="请选择接入点"
                    disabled={!providerCode}
                    onChange={(val) => setEndpointKey(val)}
                  />

                  <Tag color="purple">Model</Tag>
                  <Select
                    style={{ width: 240 }}
                    value={modelId}
                    options={modelOptions}
                    loading={modelLoading}
                    placeholder="请选择模型"
                    disabled={!endpointKey}
                    onChange={(val) => setModelId(val)}
                  />
                </Space>

                <Space>
                  <Sender.Switch
                    value={deepThink}
                    onChange={(checked: boolean) => setDeepThink(checked)}
                    icon={<OpenAIOutlined />}
                  >
                    深度思考
                  </Sender.Switch>
                </Space>
              </Flex>

              {messages.length !== 0 && (
                <Bubble.List
                  ref={listRef}
                  styles={{
                    root: {
                      maxWidth: 940,
                      height: 'calc(100% - 220px)',
                      marginBlockEnd: 24,
                    },
                  }}
                  items={messages.map((i) => ({
                    ...i.message,
                    key: i.id,
                    status:
                      i.status === 'success'
                        ? 'success'
                        : i.status === 'error'
                        ? 'error'
                        : i.status,
                    loading: i.status === 'loading',
                    extraInfo: i.message.extraInfo,
                  }))}
                  role={getRole(className)}
                />
              )}

              <div
                style={{ width: '100%', maxWidth: 840 }}
                className={clsx({ [styles.startPage]: messages.length === 0 })}
              >
                {messages.length === 0 && <div className={styles.agentName}>{locale.agentName}</div>}

                <Sender
                  suffix={false}
                  ref={senderRef}
                  key={curConversation}
                  slotConfig={slotConfig}
                  loading={isRequesting}
                  onSubmit={(val) => {
                    if (!val) return;
                    runChat(val);
                    scrollToBottom();
                    senderRef.current?.clear?.();
                  }}
                  onCancel={() => abort()}
                  placeholder={locale.placeholder}
                  autoSize={{ minRows: 3, maxRows: 6 }}
                />
              </div>
            </div>
          </div>
        </div>
      </ChatContext.Provider>
    </XProvider>
  );
};

export default App;