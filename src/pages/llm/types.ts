export type ProviderType =
  | 'OPENAI'
  | 'GEMINI'
  | 'QWEN'
  | 'OLLAMA'
  | 'DIFY'
  | 'OPENAI_COMPAT';

export interface LlmProvider {
  id: string;
  code: ProviderType;
  name: string;
  category: 'OpenAI-Compatible' | 'Native' | 'Workflow';
  enabled: boolean;
  remark?: string;
  createdAt: string;
}

export interface LlmEndpoint {
  id: string;
  providerCode: ProviderType;
  name: string;

  baseUrl: string;
  apiKeyMasked: string; // mock：只存脱敏
  enabled: boolean;

  // path config
  chatCompletionsPath: string;
  embeddingsPath: string;

  // auth header
  authHeaderName: string;
  authHeaderPrefix: string;

  // extra config
  extraHeadersJson?: string; // mock：string
  extraParamsJson?: string;

  streamSupported: boolean;
  remark?: string;

  createdAt: string;
  updatedAt: string;
}

export interface LlmModel {
  id: string;
  endpointId: string;
  providerCode: ProviderType;

  modelName: string; // 实际调用名称
  displayName: string; // 前端展示
  enabled: boolean;

  streamSupported: boolean;
  toolSupported: boolean;

  temperature: number;
  maxTokens: number;

  isDefault: boolean;

  createdAt: string;
  updatedAt: string;
}
