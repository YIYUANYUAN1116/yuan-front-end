import {
  CopyOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
  RobotOutlined,
  SendOutlined,
} from '@ant-design/icons';
import XMarkdown from '@ant-design/x-markdown';
import { useModel } from '@umijs/max';
import { Button, Input, Popconfirm, Popover, Select, Space, Tooltip, Typography, message } from 'antd';
import { createStyles } from 'antd-style';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import '@ant-design/x-markdown/themes/dark.css';
import '@ant-design/x-markdown/themes/light.css';
import {
  chatPageApi,
  type ChatMessage,
  type ConversationItem,
  type LoadChatMessagesResult,
  type ModelOption,
  type SendChatMessageResult,
} from './api';
import { useActionRequest } from '@/hooks/action/useActionRequest';
import { useMarkdownTheme } from './utils';

const uid = (prefix = 'id') => `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;

const makeConversationTitle = (input: string) => {
  const trimmed = input.trim().replace(/\s+/g, ' ');
  if (!trimmed) {
    return '新对话';
  }
  return trimmed.length > 18 ? `${trimmed.slice(0, 18)}...` : trimmed;
};

const getPreview = (content: string) => {
  const trimmed = content.trim().replace(/\s+/g, ' ');
  return trimmed.length > 32 ? `${trimmed.slice(0, 32)}...` : trimmed;
};

const formatRelativeGroup = (value: string) => {
  const date = dayjs(value);
  if (date.isSame(dayjs(), 'day')) {
    return '今天';
  }
  if (dayjs().diff(date, 'day') < 7) {
    return '最近 7 天';
  }
  return '更早';
};

const createDraftConversation = (model = '', kbIds: string[] = []): ConversationItem => ({
  id: uid('conv'),
  title: '新对话',
  preview: '开始一段新的对话',
  model,
  kbIds,
  updatedAt: dayjs().toISOString(),
  messages: [],
  isDraft: true,
});

const isLastAssistantMessage = (item: ChatMessage, index: number, messages: ChatMessage[]) =>
  index === messages.length - 1 && item.role === 'assistant';

const findLastUserIndex = (messages: ChatMessage[]) => {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    if (messages[index].role === 'user') {
      return index;
    }
  }
  return -1;
};

const isPersistedConversationId = (value?: string) => Boolean(value && /^\d+$/.test(value));

type ConversationPaging = {
  pageNum: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
};

const useStyle = createStyles(({ token, css }) => ({
  page: css`
    display: flex;
    height: calc(100vh - 112px);
    min-height: 720px;
    overflow: hidden;
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: 24px;
    background:
      radial-gradient(circle at top left, rgba(24, 144, 255, 0.08), transparent 24%),
      linear-gradient(180deg, #fafafa 0%, #f3f5f7 100%);
    box-shadow: 0 20px 80px rgba(15, 23, 42, 0.08);
  `,
  sidebar: css`
    width: 280px;
    padding: 18px 14px;
    border-right: 1px solid ${token.colorBorderSecondary};
    background: rgba(255, 255, 255, 0.78);
    backdrop-filter: blur(14px);
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  brand: css`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 8px 0;
  `,
  brandIcon: css`
    width: 36px;
    height: 36px;
    border-radius: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #111827 0%, #374151 100%);
    color: #fff;
    font-size: 18px;
  `,
  sidebarBody: css`
    flex: 1;
    overflow: auto;
    padding-right: 2px;
  `,
  groupTitle: css`
    margin: 16px 8px 8px;
    color: ${token.colorTextDescription};
    font-size: 12px;
  `,
  conversationList: css`
    display: flex;
    flex-direction: column;
    gap: 6px;
  `,
  conversationItem: css`
    width: 100%;
    border: none;
    text-align: left;
    padding: 12px;
    border-radius: 16px;
    cursor: pointer;
    background: transparent;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(15, 23, 42, 0.05);
    }

    &[data-active='true'] {
      background: #ffffff;
      box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.06);
    }
  `,
  conversationTitle: css`
    color: ${token.colorText};
    font-size: 14px;
    font-weight: 600;
    line-height: 1.4;
    margin-bottom: 4px;
  `,
  conversationPreview: css`
    color: ${token.colorTextDescription};
    font-size: 12px;
    line-height: 1.4;
  `,
  conversationMain: css`
    flex: 1;
    min-width: 0;
  `,
  conversationAction: css`
    flex-shrink: 0;
    opacity: 0;
    transition: opacity 0.2s ease;

    button {
      color: ${token.colorTextDescription};
    }

    [data-active='true'] &,
    button:hover & {
      opacity: 1;
    }
  `,
  main: css`
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    background: rgba(248, 250, 252, 0.76);
    backdrop-filter: blur(10px);
  `,
  header: css`
    padding: 18px 24px;
    border-bottom: 1px solid ${token.colorBorderSecondary};
    display: flex;
    justify-content: space-between;
    gap: 16px;
    align-items: center;
    background: rgba(255, 255, 255, 0.72);
  `,
  headerMeta: css`
    min-width: 0;
  `,
  conversationEditRow: css`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  messageScroll: css`
    flex: 1;
    overflow: auto;
    padding: 0 24px;
  `,
  messageInner: css`
    width: min(100%, 880px);
    margin: 0 auto;
    padding: 24px 0 16px;
  `,
  welcome: css`
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 20px;
    padding: 24px 0 48px;
  `,
  welcomeTitle: css`
    font-size: clamp(28px, 3vw, 40px);
    font-weight: 700;
    color: #111827;
    line-height: 1.15;
    letter-spacing: -0.02em;
  `,
  welcomeDesc: css`
    max-width: 640px;
    color: ${token.colorTextDescription};
    font-size: 15px;
    line-height: 1.7;
  `,
  loadMoreWrap: css`
    display: flex;
    justify-content: center;
    padding-bottom: 18px;
  `,
  messageRow: css`
    display: flex;
    margin-bottom: 14px;

    &[data-role='user'] {
      justify-content: flex-end;
    }
  `,
  assistantShell: css`
    width: 100%;
    display: flex;
    align-items: flex-start;
  `,
  userShell: css`
    max-width: min(100%, 720px);
    display: flex;
    justify-content: flex-end;
  `,
  assistantContent: css`
    flex: 1;
    min-width: 0;
  `,
  userBubble: css`
    padding: 14px 16px;
    border-radius: 22px;
    background: #ffffff;
    color: ${token.colorText};
    border: 1px solid rgba(15, 23, 42, 0.08);
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
    line-height: 1.75;
    white-space: pre-wrap;
  `,
  assistantBubble: css`
    padding: 2px 2px 0;
    color: ${token.colorText};
    line-height: 1.75;
  `,
  assistantToolbar: css`
    margin-top: 10px;
  `,
  userToolbar: css`
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
  `,
  userMessageWrap: css`
    &:hover .user-toolbar {
      opacity: 1;
      pointer-events: auto;
    }
  `,
  markdown: css`
    color: inherit;

    p {
      margin: 0 0 10px;
    }

    p:last-child {
      margin-bottom: 0;
    }

    pre {
      border-radius: 14px;
    }
  `,
  thinking: css`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: ${token.colorTextDescription};
    font-size: 13px;

    span {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
      animation: pulse 1.2s infinite ease-in-out;
    }

    span:nth-child(2) {
      animation-delay: 0.2s;
    }

    span:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes pulse {
      0%,
      80%,
      100% {
        transform: scale(0.7);
        opacity: 0.55;
      }

      40% {
        transform: scale(1);
        opacity: 1;
      }
    }
  `,
  composerOuter: css`
    padding: 18px 24px 24px;
    border-top: 1px solid ${token.colorBorderSecondary};
    background:
      linear-gradient(180deg, rgba(248, 250, 252, 0.4) 0%, rgba(255, 255, 255, 0.92) 100%);
  `,
  composerInner: css`
    width: min(100%, 880px);
    margin: 0 auto;
  `,
  composerPanel: css`
    border-radius: 24px;
    padding: 14px;
    background: #ffffff;
    border: 1px solid rgba(15, 23, 42, 0.08);
    box-shadow: 0 16px 44px rgba(15, 23, 42, 0.08);
  `,
  composerFooter: css`
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;

    @media (max-width: 900px) {
      flex-direction: column;
      align-items: flex-start;
    }
  `,
  composerHint: css`
    color: ${token.colorTextDescription};
    font-size: 12px;
  `,
  composerControls: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  `,
  composerControlRow: css`
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  `,
}));

const ChatPage: React.FC = () => {
  const { styles } = useStyle();
  const initialDraftRef = useRef<ConversationItem>(createDraftConversation());
  const { initialState } = useModel('@@initialState');
  const [markdownClassName] = useMarkdownTheme();
  const [modelOptions, setModelOptions] = useState<ModelOption[]>([]);
  const [knowledgeBaseOptions, setKnowledgeBaseOptions] = useState<ModelOption[]>([]);
  const [conversations, setConversations] = useState<ConversationItem[]>([initialDraftRef.current]);
  const [activeConversationId, setActiveConversationId] = useState(initialDraftRef.current.id);
  const [inputValue, setInputValue] = useState('');
  const [pendingAssistantId, setPendingAssistantId] = useState<string>();
  const [loadingModels, setLoadingModels] = useState(true);
  const [loadingKnowledgeBases, setLoadingKnowledgeBases] = useState(true);
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [loadingMoreMessages, setLoadingMoreMessages] = useState(false);
  const [editingConversationId, setEditingConversationId] = useState<string>();
  const [titleInputValue, setTitleInputValue] = useState('');
  const [openConversationMenuId, setOpenConversationMenuId] = useState<string>();
  const [conversationPagingMap, setConversationPagingMap] = useState<Record<string, ConversationPaging>>({});
  const bottomRef = useRef<HTMLDivElement>(null);

  const runtimeContext = useMemo(
    () => ({
      tenantId: initialState?.currentUser?.user?.tenantId ?? '',
      userId: initialState?.currentUser?.user?.userId ?? '',
    }),
    [initialState?.currentUser?.user?.tenantId, initialState?.currentUser?.user?.userId],
  );

  const defaultModel = modelOptions[0]?.value ?? '';

  const sortedConversations = useMemo(() => {
    return [...conversations].sort((a, b) => dayjs(b.updatedAt).valueOf() - dayjs(a.updatedAt).valueOf());
  }, [conversations]);

  const groupedConversations = useMemo(() => {
    return sortedConversations.reduce<Record<string, ConversationItem[]>>((acc, item) => {
      const group = formatRelativeGroup(item.updatedAt);
      acc[group] = acc[group] ?? [];
      acc[group].push(item);
      return acc;
    }, {});
  }, [sortedConversations]);

  const activeConversation = useMemo(() => {
    return conversations.find((item) => item.id === activeConversationId) ?? conversations[0];
  }, [activeConversationId, conversations]);

  const currentMessages = activeConversation?.messages ?? [];
  const currentPaging = activeConversation ? conversationPagingMap[activeConversation.id] : undefined;
  const isResponding = currentMessages.some(
    (item) => item.id === pendingAssistantId && item.status === 'streaming',
  );
  const { runAsync: renameConversationRun, loading: renameConversationLoading } = useActionRequest(
    chatPageApi.renameConversation,
    undefined
  );
  const { runAsync: deleteConversationRun, loading: deleteConversationLoading } = useActionRequest(
    chatPageApi.deleteConversation,
    undefined
  );

  const mergeConversationState = (
    nextItems: ConversationItem[],
    previousItems: ConversationItem[],
  ) => {
    return nextItems.map((item) => {
      const previous = previousItems.find((candidate) => candidate.id === item.id);
      return previous
        ? {
            ...item,
            model: previous.model || item.model,
            kbIds: previous.kbIds?.length ? previous.kbIds : item.kbIds,
            preview: item.preview || previous.preview,
            messages: previous.messages.length ? previous.messages : item.messages,
          }
        : item;
    });
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [activeConversationId, currentMessages]);

  useEffect(() => {
    setEditingConversationId(undefined);
    setTitleInputValue(activeConversation?.title ?? '');
  }, [activeConversation?.id, activeConversation?.title]);

  useEffect(() => {
    let cancelled = false;

    const initializePage = async () => {
      if (!runtimeContext.tenantId || !runtimeContext.userId) {
        return;
      }

      setLoadingModels(true);
      setLoadingKnowledgeBases(true);
      setLoadingConversations(true);

      try {
        const [remoteModels, remoteKnowledgeBases] = await Promise.all([
          chatPageApi.loadModels(),
          chatPageApi.loadKnowledgeBases(),
        ]);
        if (cancelled) {
          return;
        }

        setModelOptions(remoteModels);
        setKnowledgeBaseOptions(remoteKnowledgeBases);
        const resolvedDefaultModel = remoteModels[0]?.value ?? '';
        setConversations((prev) =>
          prev.map((item) => ({
            ...item,
            model: item.model || resolvedDefaultModel,
          })),
        );

        const remoteConversations = await chatPageApi.loadConversations({
          ...runtimeContext,
          defaultModel: resolvedDefaultModel,
        });
        if (cancelled) {
          return;
        }

        if (remoteConversations.length > 0) {
          setConversations((prev) => mergeConversationState(remoteConversations, prev));
          setActiveConversationId((prev) =>
            remoteConversations.some((item) => item.id === prev)
              ? prev
              : remoteConversations[0]?.id,
          );
          return;
        }

        const draftConversation = createDraftConversation(resolvedDefaultModel);
        setConversations([draftConversation]);
        setActiveConversationId(draftConversation.id);
      } catch (_error) {
        if (cancelled) {
          return;
        }
        message.error('聊天页面初始化失败');
      } finally {
        if (!cancelled) {
          setLoadingModels(false);
          setLoadingKnowledgeBases(false);
          setLoadingConversations(false);
        }
      }
    };

    void initializePage();

    return () => {
      cancelled = true;
    };
  }, [runtimeContext.tenantId, runtimeContext.userId]);

  const updateConversation = (conversationId: string, updater: (item: ConversationItem) => ConversationItem) => {
    setConversations((prev) =>
      prev.map((item) => (item.id === conversationId ? updater(item) : item)),
    );
  };

  const updateConversationPaging = (conversationId: string, paging: ConversationPaging) => {
    setConversationPagingMap((prev) => ({
      ...prev,
      [conversationId]: paging,
    }));
  };

  const mergeMessagesById = (messages: ChatMessage[]) => {
    const map = new Map<string, ChatMessage>();
    for (const item of messages) {
      map.set(item.id, item);
    }
    return [...map.values()].sort((left, right) => dayjs(left.createdAt).valueOf() - dayjs(right.createdAt).valueOf());
  };

  const applyLoadedMessages = (
    conversationId: string,
    result: LoadChatMessagesResult,
    mode: 'replace' | 'prepend' = 'replace',
  ) => {
    updateConversation(conversationId, (item) => ({
      ...item,
      messages:
        mode === 'replace'
          ? result.messages
          : mergeMessagesById([...result.messages, ...item.messages]),
      preview: getPreview(
        (mode === 'replace'
          ? result.messages[result.messages.length - 1]?.content
          : item.messages[item.messages.length - 1]?.content) || item.preview,
      ) || item.preview,
    }));

    updateConversationPaging(conversationId, {
      pageNum: result.pageNum,
      pageSize: result.pageSize,
      total: result.total,
      hasMore: result.hasMore,
    });
  };

  useEffect(() => {
    let cancelled = false;

    const loadActiveMessages = async () => {
      if (!activeConversation || activeConversation.isDraft) {
        return;
      }
      if (!isPersistedConversationId(activeConversation.id)) {
        return;
      }
      if (!runtimeContext.tenantId || !runtimeContext.userId) {
        return;
      }

      setLoadingMessages(true);
      try {
        const remoteMessages = await chatPageApi.loadMessages({
          ...runtimeContext,
          conversationId: activeConversation.id,
        });
        if (cancelled) {
          return;
        }

        applyLoadedMessages(activeConversation.id, remoteMessages);
      } catch (_error) {
        if (!cancelled) {
          message.error('消息列表加载失败');
        }
      } finally {
        if (!cancelled) {
          setLoadingMessages(false);
        }
      }
    };

    void loadActiveMessages();

    return () => {
      cancelled = true;
    };
  }, [activeConversation?.id, activeConversation?.isDraft, runtimeContext.tenantId, runtimeContext.userId]);

  const createConversation = () => {
    const nextConversation = createDraftConversation(
      activeConversation?.model ?? defaultModel,
      activeConversation?.kbIds ?? [],
    );
    setConversations((prev) => [nextConversation, ...prev]);
    setActiveConversationId(nextConversation.id);
    setInputValue('');
    setPendingAssistantId(undefined);
  };

  const appendAssistantPlaceholder = (conversationId: string, regenerate = false) => {
    const assistantId = uid('assistant');

    updateConversation(conversationId, (item) => {
      const nextMessages = regenerate
        ? item.messages.filter((messageItem, index, messages) => !isLastAssistantMessage(messageItem, index, messages))
        : item.messages;

      return {
        ...item,
        updatedAt: dayjs().toISOString(),
        preview: '等待回复...',
        messages: [
          ...nextMessages,
          {
            id: assistantId,
            role: 'assistant',
            content: '',
            status: 'streaming',
            createdAt: dayjs().toISOString(),
          },
        ],
      };
    });

    setPendingAssistantId(assistantId);
    return assistantId;
  };

  const updateAssistantPlaceholder = (conversationId: string, assistantId: string, content: string) => {
    updateConversation(conversationId, (item) => ({
      ...item,
      updatedAt: dayjs().toISOString(),
      preview: getPreview(content) || item.preview,
      messages: item.messages.map((messageItem) =>
        messageItem.id === assistantId
          ? {
              ...messageItem,
              content,
              status: 'streaming',
            }
          : messageItem,
      ),
    }));
  };

  const applyAssistantResult = (
    sourceConversationId: string,
    assistantId: string,
    result: SendChatMessageResult,
  ) => {
    const persistedConversationId = isPersistedConversationId(result.conversationId)
      ? result.conversationId
      : undefined;
    const nextConversationId = persistedConversationId ?? sourceConversationId;

    setConversations((prev) =>
      prev.map((item) => {
        if (item.id !== sourceConversationId) {
          return item;
        }

        const assistantMessage = {
          ...result.assistantMessage,
          status: 'done' as const,
        };

        return {
          ...item,
          id: nextConversationId,
          isDraft: !!(!persistedConversationId && item.isDraft),
          title: result.title ?? item.title,
          preview: result.preview ?? getPreview(assistantMessage.content),
          updatedAt: assistantMessage.createdAt || dayjs().toISOString(),
          messages: item.messages.map((messageItem) =>
            messageItem.id === assistantId ? assistantMessage : messageItem,
          ),
        };
      }),
    );

    if (persistedConversationId || !conversations.find((item) => item.id === sourceConversationId)?.isDraft) {
      setActiveConversationId(nextConversationId);
    }
    setPendingAssistantId(undefined);
  };

  const refreshConversationData = async (
    preferredConversationId?: string,
    preferredModel?: string,
    preferredKbIds: string[] = [],
  ) => {
    if (!runtimeContext.tenantId || !runtimeContext.userId) {
      return;
    }

    const remoteConversations = await chatPageApi.loadConversations({
      ...runtimeContext,
      defaultModel: preferredModel ?? defaultModel,
    });

    if (remoteConversations.length === 0) {
      const draftConversation = createDraftConversation(preferredModel ?? defaultModel, preferredKbIds);
      setConversations([draftConversation]);
      setActiveConversationId(draftConversation.id);
      return;
    }

    const nextActiveId =
      preferredConversationId && remoteConversations.some((item) => item.id === preferredConversationId)
        ? preferredConversationId
        : remoteConversations[0].id;

    setConversations((prev) => mergeConversationState(remoteConversations, prev));
    setActiveConversationId(nextActiveId);

    const remoteMessages = await chatPageApi.loadMessages({
      ...runtimeContext,
      conversationId: nextActiveId,
    });

    setConversations((prev) =>
      prev.map((item) =>
        item.id === nextActiveId
          ? {
              ...item,
              model: item.model || preferredModel || defaultModel,
              kbIds: item.kbIds?.length ? item.kbIds : preferredKbIds,
            }
          : item,
      ),
    );
    applyLoadedMessages(nextActiveId, remoteMessages);
  };

  const removeAssistantPlaceholder = (conversationId: string, assistantId: string) => {
    updateConversation(conversationId, (item) => ({
      ...item,
      preview:
        getPreview(
          item.messages.filter((messageItem) => messageItem.id !== assistantId).slice(-1)[0]?.content,
        ) || item.preview,
      messages: item.messages.filter((messageItem) => messageItem.id !== assistantId),
    }));
    setPendingAssistantId(undefined);
  };

  const handleSend = async (rawValue?: string) => {
    const content = (rawValue ?? inputValue).trim();
    if (!content || !activeConversation) {
      return;
    }

    if (isResponding) {
      message.warning('上一条回复还未完成');
      return;
    }
    if (!runtimeContext.tenantId || !runtimeContext.userId) {
      message.warning('当前用户信息未加载完成');
      return;
    }
    if (!activeConversation.model) {
      message.warning('请先选择模型');
      return;
    }

    const nextUserMessage: ChatMessage = {
      id: uid('user'),
      role: 'user',
      content,
      createdAt: dayjs().toISOString(),
    };

    updateConversation(activeConversation.id, (item) => {
      const isNewConversation = item.messages.length === 0;
      return {
        ...item,
        title: isNewConversation ? makeConversationTitle(content) : item.title,
        preview: getPreview(content),
        updatedAt: dayjs().toISOString(),
        messages: [...item.messages, nextUserMessage],
      };
    });

    setInputValue('');
    const assistantId = appendAssistantPlaceholder(activeConversation.id);

    try {
      const result = await chatPageApi.sendMessage({
        ...runtimeContext,
        conversationId: activeConversation.isDraft ? undefined : activeConversation.id,
        model: activeConversation.model,
        kbIds: activeConversation.kbIds,
        content,
        messages: currentMessages,
        onDelta: (deltaText) => {
          updateAssistantPlaceholder(activeConversation.id, assistantId, deltaText);
        },
      });
      applyAssistantResult(activeConversation.id, assistantId, result);
      await refreshConversationData(
        result.conversationId ?? (activeConversation.isDraft ? undefined : activeConversation.id),
        activeConversation.model,
        activeConversation.kbIds ?? [],
      );
    } catch (_error) {
      removeAssistantPlaceholder(activeConversation.id, assistantId);
      message.error('发送失败，请检查聊天接口或服务状态');
    }
  };

  const handleRegenerate = async () => {
    if (!activeConversation || isResponding) {
      return;
    }

    const lastUserMessage = [...activeConversation.messages].reverse().find((item) => item.role === 'user');
    if (!lastUserMessage) {
      message.info('当前没有可重试的消息');
      return;
    }
    if (!runtimeContext.tenantId || !runtimeContext.userId) {
      message.warning('当前用户信息未加载完成');
      return;
    }

    const assistantId = appendAssistantPlaceholder(activeConversation.id, true);
    const lastUserIndex = findLastUserIndex(activeConversation.messages);
    const requestMessages =
      lastUserIndex >= 0 ? activeConversation.messages.slice(0, lastUserIndex) : activeConversation.messages;

    try {
      const result = await chatPageApi.sendMessage({
        ...runtimeContext,
        conversationId: activeConversation.isDraft ? undefined : activeConversation.id,
        model: activeConversation.model,
        kbIds: activeConversation.kbIds,
        content: lastUserMessage.content,
        messages: requestMessages,
        regenerate: true,
        onDelta: (deltaText) => {
          updateAssistantPlaceholder(activeConversation.id, assistantId, deltaText);
        },
      });
      applyAssistantResult(activeConversation.id, assistantId, result);
      await refreshConversationData(
        result.conversationId ?? (activeConversation.isDraft ? undefined : activeConversation.id),
        activeConversation.model,
        activeConversation.kbIds ?? [],
      );
    } catch (_error) {
      removeAssistantPlaceholder(activeConversation.id, assistantId);
      message.error('重新生成失败，请检查聊天接口或服务状态');
    }
  };

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      message.success('已复制消息内容');
    } catch (_error) {
      message.error('复制失败，请手动复制');
    }
  };

  const handleStartConversationRename = (conversation: ConversationItem) => {
    setOpenConversationMenuId(undefined);
    setTitleInputValue(conversation.title);
    setEditingConversationId(conversation.id);
  };

  const handleSaveRename = async () => {
    const targetConversation = conversations.find((item) => item.id === editingConversationId);
    if (!targetConversation) {
      return;
    }

    const nextTitle = titleInputValue.trim();
    if (!nextTitle) {
      message.warning('标题不能为空');
      return;
    }

    if (targetConversation.isDraft) {
      updateConversation(targetConversation.id, (item) => ({
        ...item,
        title: nextTitle,
      }));
      setEditingConversationId(undefined);
      return;
    }

    try {
      await renameConversationRun({
        ...runtimeContext,
        conversationId: targetConversation.id,
        title: nextTitle,
      });
      updateConversation(targetConversation.id, (item) => ({
        ...item,
        title: nextTitle,
      }));
      setEditingConversationId(undefined);
    } catch (_error) {
      return;
    }
  };

  const removeConversationLocally = (conversationId: string) => {
    const remaining = conversations.filter((item) => item.id !== conversationId);
    setConversations(remaining.length ? remaining : [createDraftConversation(defaultModel)]);
    setConversationPagingMap((prev) => {
      const next = { ...prev };
      delete next[conversationId];
      return next;
    });

    if (activeConversationId === conversationId) {
      const nextActiveId = remaining[0]?.id;
      if (nextActiveId) {
        setActiveConversationId(nextActiveId);
      } else {
        const draftConversation = createDraftConversation(defaultModel);
        setConversations([draftConversation]);
        setActiveConversationId(draftConversation.id);
      }
    }
  };

  const handleDeleteConversation = async (conversation: ConversationItem) => {
    if (conversation.isDraft) {
      removeConversationLocally(conversation.id);
      return;
    }

    try {
      await deleteConversationRun(conversation.id);
      removeConversationLocally(conversation.id);
    } catch (_error) {
      return;
    }
  };

  const handleLoadMoreMessages = async () => {
    if (!activeConversation || activeConversation.isDraft || !isPersistedConversationId(activeConversation.id)) {
      return;
    }
    if (!currentPaging?.hasMore || loadingMoreMessages) {
      return;
    }

    setLoadingMoreMessages(true);
    try {
      const result = await chatPageApi.loadMessages({
        ...runtimeContext,
        conversationId: activeConversation.id,
        pageNum: currentPaging.pageNum + 1,
        pageSize: currentPaging.pageSize,
      });
      applyLoadedMessages(activeConversation.id, result, 'prepend');
    } catch (_error) {
      message.error('加载更多消息失败');
    } finally {
      setLoadingMoreMessages(false);
    }
  };

  const shouldShowWelcome = currentMessages.length === 0;

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>
            <RobotOutlined />
          </div>
          <div>
            <Typography.Text strong>AI Chat</Typography.Text>
            <div style={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: 12 }}>Assistant Workspace</div>
          </div>
        </div>

        <Button block type="primary" icon={<PlusOutlined />} size="large" onClick={createConversation}>
          新建聊天
        </Button>

        <div className={styles.sidebarBody}>
          {Object.entries(groupedConversations).map(([group, items]) => (
            <div key={group}>
              <div className={styles.groupTitle}>{group}</div>
              <div className={styles.conversationList}>
                {items.map((item) => (
                  <button
                    key={item.id}
                    className={styles.conversationItem}
                    data-active={item.id === activeConversationId}
                    onClick={() => setActiveConversationId(item.id)}
                    type="button"
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <div className={styles.conversationMain}>
                        {editingConversationId === item.id ? (
                          <div
                            className={styles.conversationEditRow}
                            onClick={(event) => event.stopPropagation()}
                          >
                            <Input
                              size="small"
                              value={titleInputValue}
                              onChange={(event) => setTitleInputValue(event.target.value)}
                              onPressEnter={() => void handleSaveRename()}
                              disabled={renameConversationLoading}
                            />
                            <Tooltip title="保存">
                              <Button
                                type="text"
                                size="small"
                                icon={<EditOutlined />}
                                loading={renameConversationLoading}
                                onClick={() => void handleSaveRename()}
                              />
                            </Tooltip>
                            <Tooltip title="取消">
                              <Button
                                type="text"
                                size="small"
                                icon={<DeleteOutlined rotate={45} />}
                                disabled={renameConversationLoading}
                                onClick={() => {
                                  setEditingConversationId(undefined);
                                  setTitleInputValue(activeConversation?.title ?? '');
                                }}
                              />
                            </Tooltip>
                          </div>
                        ) : (
                          <>
                            <div className={styles.conversationTitle}>{item.title}</div>
                            <div className={styles.conversationPreview}>{item.preview || '暂无内容'}</div>
                          </>
                        )}
                      </div>
                      <div className={styles.conversationAction} data-active={item.id === activeConversationId}>
                        <Popover
                          trigger="click"
                          open={openConversationMenuId === item.id}
                          onOpenChange={(open) => {
                            setOpenConversationMenuId(open ? item.id : undefined);
                          }}
                          content={
                            <Space size={4}>
                              <Tooltip title="编辑">
                                <Button
                                  type="text"
                                  size="small"
                                  icon={<EditOutlined />}
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    handleStartConversationRename(item);
                                  }}
                                />
                              </Tooltip>
                              <Popconfirm
                                title="删除这个会话？"
                                okText="删除"
                                cancelText="取消"
                                onConfirm={() => void handleDeleteConversation(item)}
                              >
                                <Button
                                  type="text"
                                  size="small"
                                  icon={<DeleteOutlined />}
                                  loading={deleteConversationLoading && activeConversationId === item.id}
                                  onClick={(event) => event.stopPropagation()}
                                />
                              </Popconfirm>
                            </Space>
                          }
                        >
                          <Button
                            type="text"
                            size="small"
                            icon={<EllipsisOutlined />}
                            onClick={(event) => event.stopPropagation()}
                          />
                        </Popover>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerMeta}>
            <Typography.Title level={4} style={{ margin: 0 }}>
              {activeConversation?.title ?? '新对话'}
            </Typography.Title>
          </div>

          <Space wrap />
        </header>

        <div className={styles.messageScroll}>
          <div className={styles.messageInner}>
            {shouldShowWelcome ? (
              <div className={styles.welcome}>
                <div className={styles.welcomeTitle}>今天想聊点什么？</div>
                {loadingConversations ? (
                  <div className={styles.welcomeDesc}>正在加载会话列表...</div>
                ) : !runtimeContext.tenantId || !runtimeContext.userId ? (
                  <div className={styles.welcomeDesc}>正在加载用户信息...</div>
                ) : loadingModels ? (
                  <div className={styles.welcomeDesc}>正在加载模型列表...</div>
                ) : null}
              </div>
            ) : (
              <>
                {currentPaging?.hasMore ? (
                  <div className={styles.loadMoreWrap}>
                    <Button loading={loadingMoreMessages} onClick={() => void handleLoadMoreMessages()}>
                      加载更多消息
                    </Button>
                  </div>
                ) : null}
                {currentMessages.map((item) => (
                  <div key={item.id} className={styles.messageRow} data-role={item.role}>
                  {item.role === 'assistant' ? (
                    <div className={styles.assistantShell}>
                      <div className={styles.assistantContent}>
                        <div className={styles.assistantBubble}>
                          {item.content ? (
                              <XMarkdown className={`${markdownClassName} ${styles.markdown}`} paragraphTag="div">
                                {item.content}
                              </XMarkdown>
                            ) : (
                              <div className={styles.thinking}>
                                <span />
                                <span />
                                <span />
                                正在等待回复
                              </div>
                            )}
                          </div>

                          {item.status !== 'streaming' && item.content ? (
                          <Space className={styles.assistantToolbar} size={4}>
                              <Tooltip title="复制">
                                <Button
                                  type="text"
                                  size="small"
                                  icon={<CopyOutlined />}
                                  onClick={() => handleCopy(item.content)}
                                />
                              </Tooltip>
                              {item.id === currentMessages[currentMessages.length - 1]?.id ? (
                                <Tooltip title="重新生成">
                                  <Button
                                    type="text"
                                    size="small"
                                    icon={<ReloadOutlined />}
                                    onClick={() => void handleRegenerate()}
                                  />
                                </Tooltip>
                              ) : null}
                            </Space>
                          ) : null}
                        </div>
                      </div>
                  ) : (
                    <div className={styles.userShell}>
                      <div className={styles.userMessageWrap}>
                        <div className={styles.userBubble}>{item.content}</div>
                        <div className={`${styles.userToolbar} user-toolbar`}>
                          <Tooltip title="复制">
                            <Button
                              type="text"
                              size="small"
                              icon={<CopyOutlined />}
                              onClick={() => handleCopy(item.content)}
                            />
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  )}
                  </div>
                ))}
              </>
            )}

            <div ref={bottomRef} />
          </div>
        </div>

        <div className={styles.composerOuter}>
          <div className={styles.composerInner}>
            <div className={styles.composerPanel}>
              <Input.TextArea
                autoSize={{ minRows: 1, maxRows: 8 }}
                bordered={false}
                placeholder="输入消息，Enter 发送，Shift + Enter 换行"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onPressEnter={(event) => {
                  if (event.shiftKey) {
                    return;
                  }
                  event.preventDefault();
                  void handleSend();
                }}
              />

              <div className={styles.composerFooter}>
                <div className={styles.composerControls}>
                  <div className={styles.composerControlRow}>
                    <div className={styles.composerHint}>当前模型：</div>
                    <Select
                      options={modelOptions}
                      style={{ width: 200 }}
                      value={activeConversation?.model}
                      loading={loadingModels}
                      disabled={!modelOptions.length}
                      placeholder="选择模型"
                      onChange={(value) => {
                        if (!activeConversation) {
                          return;
                        }
                        updateConversation(activeConversation.id, (item) => ({ ...item, model: value }));
                      }}
                    />
                    {loadingMessages ? <div className={styles.composerHint}>正在加载消息</div> : null}
                  </div>
                  <div className={styles.composerControlRow}>
                    <div className={styles.composerHint}>知识库：</div>
                    <Select
                      mode="multiple"
                      allowClear
                      maxTagCount="responsive"
                      options={knowledgeBaseOptions}
                      style={{ minWidth: 240, maxWidth: 360 }}
                      value={activeConversation?.kbIds ?? []}
                      loading={loadingKnowledgeBases}
                      disabled={!knowledgeBaseOptions.length}
                      placeholder="选择知识库"
                      onChange={(value) => {
                        if (!activeConversation) {
                          return;
                        }
                        updateConversation(activeConversation.id, (item) => ({ ...item, kbIds: value }));
                      }}
                    />
                  </div>
                </div>
                <Space>
                  <Button onClick={() => void handleRegenerate()} disabled={!currentMessages.length || isResponding}>
                    重新生成
                  </Button>
                  <Button
                    type="primary"
                    icon={<SendOutlined />}
                    onClick={() => void handleSend()}
                    disabled={!inputValue.trim() || isResponding || !activeConversation?.model}
                  >
                    发送
                  </Button>
                </Space>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
