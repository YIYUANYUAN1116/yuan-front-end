import type { LlmEndpoint, LlmModel, LlmProvider, ProviderType } from './types';

export const now = () => new Date().toISOString();

export const uid = (p = 'id') =>
  `${p}_${Math.random().toString(16).slice(2)}_${Date.now()}`;

export const prettyProviderName: Record<ProviderType, string> = {
  OPENAI: 'OpenAI',
  OPENAI_COMPAT: 'OpenAI兼容',
  GEMINI: 'Gemini',
  QWEN: '通义千问',
  OLLAMA: 'Ollama',
  DIFY: 'Dify',
};

export const defaultPathsByProvider: Record<
  ProviderType,
  { chat: string; emb: string }
> = {
  OPENAI: { chat: '/v1/chat/completions', emb: '/v1/embeddings' },
  OPENAI_COMPAT: {
    chat: '/api/v3/chat/completions',
    emb: '/api/v3/embeddings',
  },
  GEMINI: {
    chat: '/v1beta/models:generateContent',
    emb: '/v1beta/models:embedContent',
  }, // mock
  QWEN: { chat: '/v1/chat/completions', emb: '/v1/embeddings' }, // 若走 openai compat
  OLLAMA: { chat: '/api/chat', emb: '/api/embeddings' }, // mock
  DIFY: { chat: '/v1/chat-messages', emb: '/v1/embeddings' }, // mock
};

export const defaultAuthByProvider: Record<
  ProviderType,
  { name: string; prefix: string }
> = {
  OPENAI: { name: 'Authorization', prefix: 'Bearer ' },
  OPENAI_COMPAT: { name: 'Authorization', prefix: 'Bearer ' },
  GEMINI: { name: 'Authorization', prefix: 'Bearer ' }, // mock
  QWEN: { name: 'Authorization', prefix: 'Bearer ' }, // 若 openai compat
  OLLAMA: { name: 'Authorization', prefix: 'Bearer ' }, // 本地可能无需
  DIFY: { name: 'Authorization', prefix: 'Bearer ' },
};

export const initialProviders: LlmProvider[] = [
  {
    id: 'p_openai',
    code: 'OPENAI',
    name: 'OpenAI 官方',
    category: 'OpenAI-Compatible',
    enabled: true,
    remark: '官方 API',
    createdAt: now(),
  },
  {
    id: 'p_gemini',
    code: 'GEMINI',
    name: 'Google Gemini',
    category: 'Native',
    enabled: true,
    remark: 'Google/VertexAI',
    createdAt: now(),
  },
  {
    id: 'p_qwen',
    code: 'QWEN',
    name: '通义千问',
    category: 'Native',
    enabled: true,
    createdAt: now(),
  },
  {
    id: 'p_ollama',
    code: 'OLLAMA',
    name: 'Ollama 本地',
    category: 'Native',
    enabled: true,
    createdAt: now(),
  },
  {
    id: 'p_dify',
    code: 'DIFY',
    name: 'Dify 工作流',
    category: 'Workflow',
    enabled: true,
    createdAt: now(),
  },
];

export const initialEndpoints: LlmEndpoint[] = [
  {
    id: 'e_openai_official',
    providerCode: 'OPENAI',
    name: 'OpenAI 官方',
    baseUrl: 'https://api.openai.com',
    apiKeyMasked: 'sk-****',
    enabled: true,
    chatCompletionsPath: '/v1/chat/completions',
    embeddingsPath: '/v1/embeddings',
    authHeaderName: 'Authorization',
    authHeaderPrefix: 'Bearer ',
    extraHeadersJson: '',
    extraParamsJson: '',
    streamSupported: true,
    remark: '默认官方接入点',
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: 'e_ark',
    providerCode: 'OPENAI_COMPAT',
    name: '火山 Ark（示例）',
    baseUrl: 'https://ark.cn-beijing.volces.com',
    apiKeyMasked: '7ea9****',
    enabled: true,
    chatCompletionsPath: '/api/v3/chat/completions',
    embeddingsPath: '/api/v3/embeddings',
    authHeaderName: 'Authorization',
    authHeaderPrefix: 'Bearer ',
    extraHeadersJson: '',
    extraParamsJson: '',
    streamSupported: true,
    remark: '兼容 OpenAI 协议',
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: 'e_dify',
    providerCode: 'DIFY',
    name: 'Dify SaaS（示例）',
    baseUrl: 'https://api.dify.ai',
    apiKeyMasked: 'app-****',
    enabled: true,
    chatCompletionsPath: '/v1/chat-messages',
    embeddingsPath: '/v1/embeddings',
    authHeaderName: 'Authorization',
    authHeaderPrefix: 'Bearer ',
    extraHeadersJson: '',
    extraParamsJson: '',
    streamSupported: true,
    remark: '工作流应用',
    createdAt: now(),
    updatedAt: now(),
  },
];

export const initialModels: LlmModel[] = [
  {
    id: 'm_gpt4o',
    endpointId: 'e_openai_official',
    providerCode: 'OPENAI',
    modelName: 'gpt-4o-mini',
    displayName: 'GPT-4o mini',
    enabled: true,
    streamSupported: true,
    toolSupported: true,
    temperature: 0.7,
    maxTokens: 2048,
    isDefault: true,
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: 'm_deepseek_v3',
    endpointId: 'e_ark',
    providerCode: 'OPENAI_COMPAT',
    modelName: 'deepseek-v3-2-251201',
    displayName: 'DeepSeek V3（Ark）',
    enabled: true,
    streamSupported: true,
    toolSupported: false,
    temperature: 0.7,
    maxTokens: 2048,
    isDefault: true,
    createdAt: now(),
    updatedAt: now(),
  },
];

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
