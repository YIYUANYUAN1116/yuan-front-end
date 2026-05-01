declare namespace API {
  type AiNodeConfig = {
    /** 模式：
 SUGGEST = 建议
 ROUTE = 路由
 后续如要扩 AUTO_APPROVE，再加 */
    aiMode?: string;
    /** 模板编码 */
    templateCode?: string;
    /** 输出变量前缀
 例如 aiReview / aiRoute */
    outputVarPrefix?: string;
    /** 是否要求 JSON 返回 */
    jsonOutput?: boolean;
    /** 超时时间（毫秒） */
    timeoutMs?: number;
    /** 失败策略
 BLOCK / TO_MANUAL */
    failStrategy?: string;
  };

  type ApproveCmd = {
    /** 操作人（当前用户） */
    operatorId?: string;
    operatorName?: string;
    tenantId?: string;
    /** 备注 / 审批意见 */
    comment?: string;
    variables?: Record<string, any>;
    taskId: string;
  };

  type AvatarVo = Record<string, any>;

  type batchGenCodeParams = {
    /** 表名 */
    tableNameStr: string;
  };

  type batchGenFrontendCodeParams = {
    /** 执行命令路径 */
    workPath: string;
    /** 执行生成前端文件命令 */
    previewCode: string;
  };

  type ChatAttachmentBo = {
    id?: string;
    /** tenantId */
    tenantId: string;
    /** messageId */
    messageId: string;
    /** fileName */
    fileName: string;
    /** fileType */
    fileType?: string;
    /** fileSize */
    fileSize?: string;
    /** storage */
    storage: string;
    /** objectKey */
    objectKey: string;
    /** url */
    url?: string;
    /** metaJson */
    metaJson?: string;
    /** createTime */
    createTime: string;
  };

  type ChatAttachmentExportParams = {
    bo: ChatAttachmentBo;
  };

  type ChatAttachmentGetInfoParams = {
    /** 主键 */
    id: string;
  };

  type ChatAttachmentListParams = {
    bo: ChatAttachmentBo;
    pageQuery: PageQuery;
  };

  type ChatAttachmentRemoveParams = {
    /** 主键串 */
    ids: string[];
  };

  type ChatAttachmentVo = {
    id: string;
    /** tenantId */
    tenantId?: string;
    /** messageId */
    messageId?: string;
    /** fileName */
    fileName?: string;
    /** fileType */
    fileType?: string;
    /** fileSize */
    fileSize?: string;
    /** storage */
    storage?: string;
    /** objectKey */
    objectKey?: string;
    /** url */
    url?: string;
    /** metaJson */
    metaJson?: string;
    /** createTime */
    createTime?: string;
  };

  type ChatConversationBo = {
    id?: string;
    /** tenantId */
    tenantId?: string;
    /** userId */
    userId?: string;
    /** appId */
    appId?: string;
    /** title */
    title?: string;
    /** defaultEndpointKey */
    modelId?: string;
    /** metaJson */
    metaJson?: string;
    /** lastMessageAt */
    lastMessageAt?: string;
    /** createTime */
    createTime?: string;
    /** updateTime */
    updateTime?: string;
  };

  type ChatConversationExportParams = {
    bo: ChatConversationBo;
  };

  type ChatConversationGetInfoParams = {
    /** 主键 */
    id: string;
  };

  type ChatConversationListParams = {
    bo: ChatConversationBo;
    pageQuery: PageQuery;
  };

  type ChatConversationRemoveParams = {
    /** 主键串 */
    ids: string[];
  };

  type ChatConversationVo = {
    id: string;
    /** tenantId */
    tenantId?: string;
    /** userId */
    userId?: string;
    /** appId */
    appId?: string;
    /** title */
    title?: string;
    /** defaultEndpointKey */
    modelId?: string;
    /** metaJson */
    metaJson?: string;
    /** lastMessageAt */
    lastMessageAt?: string;
    /** createTime */
    createTime?: string;
    /** updateTime */
    updateTime?: string;
  };

  type ChatMessageBo = {
    id?: string;
    /** tenantId */
    tenantId: string;
    /** conversationId */
    conversationId: string;
    /** userId */
    userId: string;
    /** system/user/assistant/tool */
    role: string;
    /** content */
    content?: string;
    /** contentFormat */
    contentFormat: string;
    /** parentId */
    parentId?: string;
    /** PENDING/STREAMING/DONE/FAILED */
    status: string;
    /** endpointKey */
    modelId?: string;
    /** invocationId */
    invocationId?: string;
    /** tokenIn */
    tokenIn?: number;
    /** tokenOut */
    tokenOut?: number;
    /** costAmount */
    costAmount?: number;
    /** finishReason */
    finishReason?: string;
    /** errorMsg */
    errorMsg?: string;
    /** createTime */
    createTime: string;
    /** updateTime */
    updateTime: string;
  };

  type ChatMessageChunkBo = {
    id?: string;
    /** tenantId */
    tenantId: string;
    /** messageId */
    messageId: string;
    /** seq */
    seq: number;
    /** deltaText */
    deltaText: string;
    /** createTime */
    createTime: string;
  };

  type ChatMessageChunkExportParams = {
    bo: ChatMessageChunkBo;
  };

  type ChatMessageChunkGetInfoParams = {
    /** 主键 */
    id: string;
  };

  type ChatMessageChunkListParams = {
    bo: ChatMessageChunkBo;
    pageQuery: PageQuery;
  };

  type ChatMessageChunkRemoveParams = {
    /** 主键串 */
    ids: string[];
  };

  type ChatMessageChunkVo = {
    id: string;
    /** tenantId */
    tenantId?: string;
    /** messageId */
    messageId?: string;
    /** seq */
    seq?: number;
    /** deltaText */
    deltaText?: string;
    /** createTime */
    createTime?: string;
  };

  type ChatMessageExportParams = {
    bo: ChatMessageBo;
  };

  type ChatMessageGetInfoParams = {
    /** 主键 */
    id: string;
  };

  type ChatMessageListParams = {
    bo: ChatMessageBo;
    pageQuery: PageQuery;
  };

  type ChatMessageRemoveParams = {
    /** 主键串 */
    ids: string[];
  };

  type ChatMessageVo = {
    id: string;
    /** tenantId */
    tenantId?: string;
    /** conversationId */
    conversationId?: string;
    /** userId */
    userId?: string;
    /** system/user/assistant/tool */
    role?: string;
    /** content */
    content?: string;
    /** contentFormat */
    contentFormat?: string;
    /** parentId */
    parentId?: string;
    /** PENDING/STREAMING/DONE/FAILED */
    status?: string;
    /** endpointKey */
    modelId?: string;
    /** invocationId */
    invocationId?: string;
    /** tokenIn */
    tokenIn?: number;
    /** tokenOut */
    tokenOut?: number;
    /** costAmount */
    costAmount?: number;
    /** finishReason */
    finishReason?: string;
    /** errorMsg */
    errorMsg?: string;
    /** createTime */
    createTime?: string;
    /** updateTime */
    updateTime?: string;
  };

  type ChatModelBo = {
    id?: string;
    /** 租户编号 */
    tenantId?: string;
    /** 模型分类 */
    category?: string;
    /** 模型名称 */
    modelName?: string;
    /** 模型供应商 */
    providerName?: string;
    /** 模型描述 */
    modelDescribe?: string;
    /** 模型价格 */
    modelPrice?: number;
    /** 计费类型 */
    modelType?: string;
    /** 是否显示 */
    modelShow?: string;
    /** 系统提示词 */
    systemPrompt?: string;
    /** 请求地址 */
    apiHost?: string;
    /** 密钥 */
    apiKey?: string;
    /** 请求后缀 */
    apiUrl?: string;
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 备注 */
    remark?: string;
    /** 模型优先级(值越大优先级越高) */
    priority?: number;
  };

  type ChatModelVo = {
    id: string;
    /** 租户编号 */
    tenantId?: string;
    /** 模型分类 */
    category?: string;
    /** 模型名称 */
    modelName?: string;
    /** 模型供应商 */
    providerName?: string;
    /** 模型描述 */
    modelDescribe?: string;
    /** 模型价格 */
    modelPrice?: number;
    /** 计费类型 */
    modelType?: string;
    /** 是否显示 */
    modelShow?: string;
    /** 系统提示词 */
    systemPrompt?: string;
    /** 请求地址 */
    apiHost?: string;
    /** 密钥 */
    apiKey?: string;
    /** 请求后缀 */
    apiUrl?: string;
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 备注 */
    remark?: string;
    /** 模型优先级(值越大优先级越高) */
    priority?: number;
  };

  type ChatMsg = {
    role: string;
    content: string;
  };

  type ChatRequest = {
    tenantId: string;
    traceId: string;
    messages?: ChatMsg[];
    /** 前端首选：直接传 endpointKey */
    modelId?: string;
    endpointCode?: string;
    /** 自动选模型：endpointKey 为空时用路由规则 */
    autoSelectModel?: boolean;
    /** 业务侧字段（可选） */
    userId?: string;
    conversationId?: string;
    appId?: string;
    /** 可选提示词 */
    systemPrompt?: string;
    prompt?: string;
    /** 是否流式 */
    stream?: boolean;
    /** thinking 标记（用于路由策略） */
    enableThinking?: boolean;
    token?: string;
    persistChatMessage?: boolean;
    sceneCode?: string;
    bizType?: string;
    bizId?: string;
  };

  type ChatSessionBo = {
    id?: string;
    /** 用户id */
    userId?: string;
    /** 会话标题 */
    sessionTitle?: string;
    /** 会话内容 */
    sessionContent?: string;
    /** 部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 备注 */
    remark?: string;
    /** 会话ID */
    conversationId?: string;
  };

  type ChatSessionVo = {
    id: string;
    /** 用户id */
    userId?: string;
    /** 会话标题 */
    sessionTitle?: string;
    /** 会话内容 */
    sessionContent?: string;
    /** 部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 备注 */
    remark?: string;
    /** 会话ID */
    conversationId?: string;
  };

  type CompleteMultipartReq = {
    sessionId?: string;
    uploadId?: string;
    bucket?: string;
    objectKey?: string;
    parts?: PartEtag[];
    filename?: string;
    contentType?: string;
    sizeBytes?: string;
  };

  type deptAllocatedUserListParams = {
    bo: SysUserBo;
    pageQuery: PageQuery;
  };

  type deptSetLeaderParams = {
    deptId: string;
    userId: string;
  };

  type dictDictTypeParams = {
    /** 字典类型 */
    dictType: string;
  };

  type dictExportParams = {
    bo: SysDictDataBo;
  };

  type dictGetInfoParams = {
    /** 字典code */
    dictCode: string;
  };

  type dictListParams = {
    bo: SysDictDataBo;
    pageQuery: PageQuery;
  };

  type dictRemoveParams = {
    /** 字典code串 */
    dictCodes: string[];
  };

  type dictTypeAllParams = {
    bo: SysDictTypeBo;
    pageQuery: PageQuery;
  };

  type dictTypeExportParams = {
    bo: SysDictTypeBo;
  };

  type dictTypeGetInfoParams = {
    /** 字典ID */
    dictId: string;
  };

  type dictTypeListParams = {
    bo: SysDictTypeBo;
    pageQuery: PageQuery;
  };

  type dictTypeRemoveParams = {
    /** 字典ID串 */
    dictIds: string[];
  };

  type export1Params = {
    bo: ChatModelBo;
  };

  type exportUsingPOSTParams = {
    bo: ChatSessionBo;
  };

  type Expression = {
    /** 变量名，如 amount / leaveType */
    field?: string;
    /** 操作符：EQ / GT / LT / IN ... */
    operator?: "EQ" | "NE" | "GT" | "GE" | "LT" | "LE" | "IN" | "NOT_IN";
    /** 比较值（运行时解析） */
    value?: string;
    /** 预留：number/string/date/enum...（可空） */
    valueType?: string;
  };

  type FileObjectKey = {
    storage?: "S3_COMPATIBLE";
    bucket?: string;
    objectKey?: string;
    etag?: string;
    sizeBytes?: string;
    contentType?: string;
    filename?: string;
    sha256?: string;
  };

  type getByTableNameParams = {
    /** 表名 */
    tableName: string;
  };

  type getInfo1Params = {
    /** 主键 */
    id: number;
  };

  type getInfoParams = {
    /** 主键 */
    id: number;
  };

  type InitMultipartReq = {
    scope: OssScope;
    filename: string;
    contentType: string;
    sizeBytes: string;
  };

  type LfAssignee = {
    kind?: "FIXED" | "RULE";
    type?: "POST" | "ROLE" | "DEPT" | "USER";
    /** 固定审批人 */
    userIds?: string[];
    /** 固定角色 */
    roleIds?: string[];
    /** 固定岗位 */
    postIds?: string[];
    /** 固定部门 */
    deptIds?: string[];
  };

  type LfEdge = {
    id?: string;
    type?: string;
    sourceNodeId?: string;
    targetNodeId?: string;
    text?: LfText;
    properties?: LfProperties;
  };

  type LfGraph = {
    nodes?: LfNode[];
    edges?: LfEdge[];
  };

  type LfNode = {
    id: string;
    x?: string;
    y?: string;
    text?: LfText;
    type?: string;
    properties?: LfProperties;
  };

  type LfProperties = {
    width?: string;
    height?: string;
    wfType?: string;
    assignee?: LfAssignee;
    condition?: Expression;
    aiNodeConfig?: AiNodeConfig;
  };

  type LfText = {
    x?: string;
    y?: string;
    value?: string;
  };

  type list1Params = {
    bo: ChatModelBo;
    pageQuery: PageQuery;
  };

  type listParams = {
    bo: ChatSessionBo;
    pageQuery: PageQuery;
  };

  type LlmEndpointBo = {
    id?: string;
    /** tenantId */
    tenantId?: string;
    /** front-end selection key */
    endpointCode?: string;
    endpointName?: string;
    providerId?: string;
    providerName?: string;
    /** OpenAI-compatible baseUrl like https://api.openai.com or http://localhost:11434/v1 */
    baseUrl: string;
    /** DEMO ONLY; prod should use api_key_ref + secret manager */
    apiKey?: string;
    /** defaultModelId */
    defaultModelId?: string;
    /** enabled */
    status?: string;
    /** priority */
    priority?: number;
    /** {"cheap":true,"think":true} */
    tagsJson?: string;
    /** createTime */
    createTime?: string;
    /** updateTime */
    updateTime?: string;
    chatCompletionsPath?: string;
    embeddingsPath?: string;
    authHeaderName?: string;
    authHeaderPrefix?: string;
    extraHeadersJson?: string;
    extraParamsJson?: string;
  };

  type LlmEndpointExportParams = {
    bo: LlmEndpointBo;
  };

  type LlmEndpointGetInfoParams = {
    /** 主键 */
    id: string;
  };

  type LlmEndpointListParams = {
    bo: LlmEndpointBo;
    pageQuery: PageQuery;
  };

  type LlmEndpointRemoveParams = {
    /** 主键串 */
    ids: string[];
  };

  type LlmEndpointVo = {
    id: string;
    /** tenantId */
    tenantId?: string;
    /** front-end selection key */
    endpointCode?: string;
    endpointName?: string;
    /** providerCode */
    providerName?: string;
    providerId?: string;
    /** OpenAI-compatible baseUrl like https://api.openai.com or http://localhost:11434/v1 */
    baseUrl?: string;
    /** DEMO ONLY; prod should use api_key_ref + secret manager */
    apiKey?: string;
    /** defaultModelId */
    defaultModelId?: string;
    /** enabled */
    status?: string;
    /** priority */
    priority?: number;
    /** {"cheap":true,"think":true} */
    tagsJson?: string;
    /** createTime */
    createTime?: string;
    /** updateTime */
    updateTime?: string;
    chatCompletionsPath?: string;
    embeddingsPath?: string;
    authHeaderName?: string;
    authHeaderPrefix?: string;
    extraHeadersJson?: string;
    extraParamsJson?: string;
  };

  type LlmInvocationBo = {
    id?: string;
    /** tenantId */
    tenantId: string;
    /** traceId */
    traceId: string;
    endpointId?: string;
    providerId?: string;
    /** modelName */
    modelName: string;
    /** conversationId */
    conversationId?: string;
    /** messageId */
    messageId?: string;
    /** requestJson */
    requestJson: string;
    /** responseText */
    responseText?: string;
    /** responseJson */
    responseJson?: string;
    /** tokenIn */
    tokenIn?: number;
    /** tokenOut */
    tokenOut?: number;
    /** costAmount */
    costAmount?: number;
    /** latencyMs */
    latencyMs?: number;
    /** SUCCESS/FAILED */
    status: string;
    /** errorMsg */
    errorMsg?: string;
    /** createTime */
    createTime: string;
  };

  type LlmInvocationExportParams = {
    bo: LlmInvocationBo;
  };

  type LlmInvocationGetInfoParams = {
    /** 主键 */
    id: string;
  };

  type LlmInvocationListParams = {
    bo: LlmInvocationBo;
    pageQuery: PageQuery;
  };

  type LlmInvocationRemoveParams = {
    /** 主键串 */
    ids: string[];
  };

  type LlmInvocationVo = {
    id: string;
    /** tenantId */
    tenantId?: string;
    /** traceId */
    traceId?: string;
    endpointId?: string;
    providerId?: string;
    /** modelName */
    modelName?: string;
    /** conversationId */
    conversationId?: string;
    /** messageId */
    messageId?: string;
    /** requestJson */
    requestJson?: string;
    /** responseText */
    responseText?: string;
    /** responseJson */
    responseJson?: string;
    /** tokenIn */
    tokenIn?: number;
    /** tokenOut */
    tokenOut?: number;
    /** costAmount */
    costAmount?: number;
    /** latencyMs */
    latencyMs?: number;
    /** SUCCESS/FAILED */
    status?: string;
    /** errorMsg */
    errorMsg?: string;
    /** createTime */
    createTime?: string;
  };

  type LlmModelBo = {
    id?: string;
    providerId?: string;
    endpointId?: string;
    /** remote model name, e.g. gpt-4o-mini */
    modelName?: string;
    /** displayName */
    displayName?: string;
    /** {"stream":true,"json":true,"tools":true,"vision":false,"thinking":false} */
    capabilityJson?: string;
    /** contextWindow */
    contextWindow?: number;
    /** enabled */
    status?: string;
    providerName?: string;
    endpointName?: string;
  };

  type LlmModelExportParams = {
    bo: LlmModelBo;
  };

  type LlmModelGetInfoParams = {
    /** 主键 */
    id: string;
  };

  type LlmModelListParams = {
    bo: LlmModelBo;
    pageQuery: PageQuery;
  };

  type LlmModelRemoveParams = {
    /** 主键串 */
    ids: string[];
  };

  type LlmModelVo = {
    id: string;
    endpointName?: string;
    endpointId?: string;
    /** providerCode */
    providerName?: string;
    providerId?: string;
    /** remote model name, e.g. gpt-4o-mini */
    modelName?: string;
    /** displayName */
    displayName?: string;
    /** {"stream":true,"json":true,"tools":true,"vision":false,"thinking":false} */
    capabilityJson?: string;
    /** contextWindow */
    contextWindow?: number;
    /** enabled */
    status?: string;
    createTime?: string;
    /** updateTime */
    updateTime?: string;
  };

  type LlmPolicyBo = {
    id?: string;
    /** tenantId */
    tenantId: string;
    /** TENANT/USER/APP */
    scopeType: string;
    /** scopeId */
    scopeId: string;
    /** dailyCalls */
    dailyCalls: number;
    /** dailyTokens */
    dailyTokens: number;
    /** concurrency */
    concurrency: number;
    /** allowEndpoints */
    allowEndpoints?: string;
    /** enabled */
    enabled: number;
  };

  type LlmPolicyExportParams = {
    bo: LlmPolicyBo;
  };

  type LlmPolicyGetInfoParams = {
    /** 主键 */
    id: string;
  };

  type LlmPolicyListParams = {
    bo: LlmPolicyBo;
    pageQuery: PageQuery;
  };

  type LlmPolicyRemoveParams = {
    /** 主键串 */
    ids: string[];
  };

  type LlmPolicyVo = {
    id: string;
    /** tenantId */
    tenantId?: string;
    /** TENANT/USER/APP */
    scopeType?: string;
    /** scopeId */
    scopeId?: string;
    /** dailyCalls */
    dailyCalls?: number;
    /** dailyTokens */
    dailyTokens?: number;
    /** concurrency */
    concurrency?: number;
    /** allowEndpoints */
    allowEndpoints?: string;
    /** enabled */
    enabled?: number;
  };

  type LlmProviderBo = {
    id?: string;
    /** OPENAI_COMPAT/AZURE/OLLAMA/SELF_HOST */
    providerCode: string;
    /** name */
    providerName: string;
    /** openai_compat/azure/ollama/... */
    protocol?: string;
    remark?: string;
    createTime?: string;
  };

  type LlmProviderExportParams = {
    bo: LlmProviderBo;
  };

  type LlmProviderGetInfoParams = {
    /** 主键 */
    id: string;
  };

  type LlmProviderListParams = {
    bo: LlmProviderBo;
    pageQuery: PageQuery;
  };

  type LlmProviderRemoveParams = {
    /** 主键串 */
    ids: string[];
  };

  type LlmProviderVo = {
    id: string;
    /** OPENAI_COMPAT/AZURE/OLLAMA/SELF_HOST */
    providerCode?: string;
    /** name */
    providerName?: string;
    /** openai_compat/azure/ollama/... */
    protocol?: string;
    /** createTime */
    createTime?: string;
    remark?: string;
    createBy?: string;
    updateBy?: string;
    updateTime?: string;
  };

  type LlmRouteRuleBo = {
    id?: string;
    /** tenantId */
    tenantId: string;
    /** ruleName */
    ruleName: string;
    /** {"enableThinking":true,"stream":true} */
    matchJson: string;
    /** ["tenantA_openai_4o","tenantA_deepseek_r1"] */
    candidateEndpoints: string;
    /** PRIORITY/COST_MIN/LATENCY_MIN */
    strategy: string;
    /** enabled */
    enabled: number;
    /** priority */
    priority: number;
  };

  type LlmRouteRuleExportParams = {
    bo: LlmRouteRuleBo;
  };

  type LlmRouteRuleGetInfoParams = {
    /** 主键 */
    id: string;
  };

  type LlmRouteRuleListParams = {
    bo: LlmRouteRuleBo;
    pageQuery: PageQuery;
  };

  type LlmRouteRuleRemoveParams = {
    /** 主键串 */
    ids: string[];
  };

  type LlmRouteRuleVo = {
    id: string;
    /** tenantId */
    tenantId?: string;
    /** ruleName */
    ruleName?: string;
    /** {"enableThinking":true,"stream":true} */
    matchJson?: string;
    /** ["tenantA_openai_4o","tenantA_deepseek_r1"] */
    candidateEndpoints?: string;
    /** PRIORITY/COST_MIN/LATENCY_MIN */
    strategy?: string;
    /** enabled */
    enabled?: number;
    /** priority */
    priority?: number;
  };

  type LoginBody = {
    /** 租户ID */
    tenantId?: string;
    /** 用户名 */
    username: string;
    /** 用户密码 */
    password: string;
    /** 验证码 */
    code?: string;
    /** 唯一标识 */
    uuid?: string;
  };

  type LoginUser = {
    /** 租户ID */
    tenantId?: string;
    /** 用户ID */
    userId?: string;
    /** 部门ID */
    deptId?: string;
    /** 部门名 */
    deptName?: string;
    /** 用户唯一标识 */
    token?: string;
    /** 用户类型 */
    userType?: string;
    /** 登录时间 */
    loginTime?: string;
    /** 过期时间 */
    expireTime?: string;
    /** 登录IP地址 */
    ipaddr?: string;
    /** 登录地点 */
    loginLocation?: string;
    /** 浏览器类型 */
    browser?: string;
    /** 操作系统 */
    os?: string;
    /** 菜单权限 */
    menuPermission?: string[];
    /** 角色权限 */
    rolePermission?: string[];
    /** 用户名 */
    username?: string;
    /** 用户名 */
    nickName?: string;
    /** 微信头像 */
    avatar?: string;
    /** 角色对象 */
    roles?: RoleDTO[];
    /** 数据权限 当前角色ID */
    roleId?: string;
    /** 关联角色类型 */
    kroleGroupType?: string;
    /** 关联角色id */
    kroleGroupIds?: string;
    /** 获取登录id */
    loginId?: string;
  };

  type LoginVo = {
    token?: string;
    access_token?: string;
    userInfo?: LoginUser;
  };

  type MultipartSession = {
    uploadId?: string;
    bucket?: string;
    objectKey?: string;
    partSizeBytes?: number;
    totalParts?: number;
    currentPartNumber?: number;
    sessionId?: string;
  };

  type OaLeaveApplyBo = {
    id?: string;
    tenantId?: string;
    applyNo?: string;
    applicantId?: string;
    applicantName?: string;
    applicantDept?: string;
    applicantDeptName?: string;
    /** 请假类型 */
    leaveType: string;
    /** 请假原因 */
    reason?: string;
    /** 开始时间 */
    startTime: string;
    /** 结束时间 */
    endTime: string;
    /** 请假天数 */
    leaveDays: number;
    /** 请假小时数（可选） */
    leaveHours?: number;
    /** 状态：DRAFT/APPROVING/APPROVED/REJECTED/CANCELED */
    status?: string;
    /** createDept */
    createDept?: string;
    /** createBy */
    createBy?: string;
    /** createTime */
    createTime?: string;
    /** updateBy */
    updateBy?: string;
    /** updateTime */
    updateTime?: string;
  };

  type OaLeaveApplyExportParams = {
    bo: OaLeaveApplyBo;
  };

  type OaLeaveApplyGetInfoByBizNoParams = {
    bizNo: string;
  };

  type OaLeaveApplyGetInfoParams = {
    /** 主键 */
    id: string;
  };

  type OaLeaveApplyListParams = {
    bo: OaLeaveApplyBo;
    pageQuery: PageQuery;
  };

  type OaLeaveApplyRemoveParams = {
    /** 主键串 */
    ids: string[];
  };

  type OaLeaveApplySubmitParams = {
    bizNo: string;
  };

  type OaLeaveApplyVo = {
    id: string;
    /** 租户ID */
    tenantId?: string;
    /** 请假单号 */
    applyNo: string;
    /** 申请人ID */
    applicantId?: string;
    /** 申请人姓名（冗余） */
    applicantName?: string;
    /** 申请人部门ID */
    applicantDept?: string;
    applicantDeptName?: string;
    /** 请假类型 */
    leaveType?: string;
    /** 请假原因 */
    reason?: string;
    /** 开始时间 */
    startTime?: string;
    /** 结束时间 */
    endTime?: string;
    /** 请假天数 */
    leaveDays?: number;
    /** 请假小时数（可选） */
    leaveHours?: number;
    /** 状态：DRAFT/APPROVING/APPROVED/REJECTED/CANCELED */
    status?: string;
    /** createDept */
    createDept?: string;
    /** createBy */
    createBy?: string;
    /** createTime */
    createTime?: string;
    /** updateBy */
    updateBy?: string;
    /** updateTime */
    updateTime?: string;
  };

  type OpsVO = {
    canApprove?: boolean;
    canReject?: boolean;
    canRollback?: boolean;
    canTransfer?: boolean;
    canWithdraw?: boolean;
    canAddSign?: boolean;
  };

  type OssScope = {
    tenantId?: string;
    namespace?: "TEMP" | "FORMAL" | "PUBLIC";
    prefix?: "OA" | "SYS" | "EXP" | "CON" | "PUR" | "WF";
  };

  type PageQuery = {
    /** 分页大小 */
    pageSize?: number;
    /** 当前页数 */
    pageNum?: number;
    current?: number;
    /** 排序列 */
    orderByColumn?: string;
    /** 排序的方向desc或者asc */
    isAsc?: string;
  };

  type PartEtag = {
    partNumber?: number;
    etag?: string;
  };

  type postAllocatedUserListParams = {
    bo: SysUserBo;
    pageQuery: PageQuery;
  };

  type ProfileVo = {
    /** 用户信息 */
    user?: SysUserVo;
    /** 用户所属角色组 */
    roleGroup?: string;
    /** 用户所属岗位组 */
    postGroup?: string;
  };

  type RAvatarVo = {
    code?: number;
    msg?: string;
    data?: AvatarVo;
  };

  type RChatAttachmentVo = {
    code?: number;
    msg?: string;
    data?: ChatAttachmentVo;
  };

  type RChatConversationVo = {
    code?: number;
    msg?: string;
    data?: ChatConversationVo;
  };

  type RChatMessageChunkVo = {
    code?: number;
    msg?: string;
    data?: ChatMessageChunkVo;
  };

  type RChatMessageVo = {
    code?: number;
    msg?: string;
    data?: ChatMessageVo;
  };

  type RChatModelVo = {
    code?: number;
    msg?: string;
    data?: ChatModelVo;
  };

  type RChatSessionVo = {
    code?: number;
    msg?: string;
    data?: ChatSessionVo;
  };

  type ReactRouterVo = {
    name?: string;
    path?: string;
    icon?: string;
    component?: string;
    layout?: boolean;
    hideInMenu?: boolean;
    access?: string;
  };

  type RejectCmd = {
    /** 操作人（当前用户） */
    operatorId?: string;
    operatorName?: string;
    tenantId?: string;
    /** 备注 / 审批意见 */
    comment?: string;
    variables?: Record<string, any>;
    taskId: string;
  };

  type remove1Params = {
    /** 主键串 */
    ids: number[];
  };

  type removeParams = {
    /** 主键串 */
    ids: number[];
  };

  type RFileObjectKey = {
    code?: number;
    msg?: string;
    data?: FileObjectKey;
  };

  type RListReactRouterVo = {
    code?: number;
    msg?: string;
    data?: ReactRouterVo[];
  };

  type RListSchemaFieldVo = {
    code?: number;
    msg?: string;
    data?: SchemaFieldVo[];
  };

  type RListSchemaGroupVo = {
    code?: number;
    msg?: string;
    data?: SchemaGroupVo[];
  };

  type RListSelectModel = {
    code?: number;
    msg?: string;
    data?: SelectModel[];
  };

  type RListStrSelectModel = {
    code?: number;
    msg?: string;
    data?: StrSelectModel[];
  };

  type RListSysDictDataVo = {
    code?: number;
    msg?: string;
    data?: SysDictDataVo[];
  };

  type RListSysDictTypeVo = {
    code?: number;
    msg?: string;
    data?: SysDictTypeVo[];
  };

  type RListSysPostVo = {
    code?: number;
    msg?: string;
    data?: SysPostVo[];
  };

  type RLlmEndpointVo = {
    code?: number;
    msg?: string;
    data?: LlmEndpointVo;
  };

  type RLlmInvocationVo = {
    code?: number;
    msg?: string;
    data?: LlmInvocationVo;
  };

  type RLlmModelVo = {
    code?: number;
    msg?: string;
    data?: LlmModelVo;
  };

  type RLlmPolicyVo = {
    code?: number;
    msg?: string;
    data?: LlmPolicyVo;
  };

  type RLlmProviderVo = {
    code?: number;
    msg?: string;
    data?: LlmProviderVo;
  };

  type RLlmRouteRuleVo = {
    code?: number;
    msg?: string;
    data?: LlmRouteRuleVo;
  };

  type RLoginVo = {
    code?: number;
    msg?: string;
    data?: LoginVo;
  };

  type RLong = {
    code?: number;
    msg?: string;
    data?: string;
  };

  type RMultipartSession = {
    code?: number;
    msg?: string;
    data?: MultipartSession;
  };

  type ROaLeaveApplyVo = {
    code?: number;
    msg?: string;
    data?: OaLeaveApplyVo;
  };

  type RObject = {
    code?: number;
    msg?: string;
    data?: any;
  };

  type roleAllocatedUserListParams = {
    bo: SysUserBo;
    pageQuery: PageQuery;
  };

  type RoleDTO = {
    /** 角色ID */
    roleId?: string;
    /** 角色名称 */
    roleName?: string;
    /** 角色权限 */
    roleKey?: string;
    /** 数据范围（1：所有数据权限；2：自定义数据权限；3：本部门数据权限；4：本部门及以下数据权限；5：仅本人数据权限） */
    dataScope?: string;
  };

  type RollbackCmd = {
    /** 操作人（当前用户） */
    operatorId?: string;
    operatorName?: string;
    tenantId?: string;
    /** 备注 / 审批意见 */
    comment?: string;
    variables?: Record<string, any>;
    taskId: string;
    targetActivityId: string;
  };

  type RollbackToPreviousCmd = {
    /** 操作人（当前用户） */
    operatorId?: string;
    operatorName?: string;
    tenantId?: string;
    /** 备注 / 审批意见 */
    comment?: string;
    variables?: Record<string, any>;
    taskId: string;
  };

  type RProfileVo = {
    code?: number;
    msg?: string;
    data?: ProfileVo;
  };

  type RSchemaFieldVo = {
    code?: number;
    msg?: string;
    data?: SchemaFieldVo;
  };

  type RSchemaGroupVo = {
    code?: number;
    msg?: string;
    data?: SchemaGroupVo;
  };

  type RSchemaVo = {
    code?: number;
    msg?: string;
    data?: SchemaVo;
  };

  type RSelectRolesVo = {
    code?: number;
    msg?: string;
    data?: SelectRolesVo;
  };

  type RString = {
    code?: number;
    msg?: string;
    data?: string;
  };

  type RSysBizNoSeqVo = {
    code?: number;
    msg?: string;
    data?: SysBizNoSeqVo;
  };

  type RSysDeptVo = {
    code?: number;
    msg?: string;
    data?: SysDeptVo;
  };

  type RSysDictDataVo = {
    code?: number;
    msg?: string;
    data?: SysDictDataVo;
  };

  type RSysDictTypeVo = {
    code?: number;
    msg?: string;
    data?: SysDictTypeVo;
  };

  type RSysLogininforVo = {
    code?: number;
    msg?: string;
    data?: SysLogininforVo;
  };

  type RSysMenuVo = {
    code?: number;
    msg?: string;
    data?: SysMenuVo;
  };

  type RSysOperLogVo = {
    code?: number;
    msg?: string;
    data?: SysOperLogVo;
  };

  type RSysPostVo = {
    code?: number;
    msg?: string;
    data?: SysPostVo;
  };

  type RSysRoleDeptVo = {
    code?: number;
    msg?: string;
    data?: SysRoleDeptVo;
  };

  type RSysRoleMenuVo = {
    code?: number;
    msg?: string;
    data?: SysRoleMenuVo;
  };

  type RSysRolePostVo = {
    code?: number;
    msg?: string;
    data?: SysRolePostVo;
  };

  type RSysRoleVo = {
    code?: number;
    msg?: string;
    data?: SysRoleVo;
  };

  type RSysTenantVo = {
    code?: number;
    msg?: string;
    data?: SysTenantVo;
  };

  type RSysUserInfoVo = {
    code?: number;
    msg?: string;
    data?: SysUserInfoVo;
  };

  type RSysUserPostVo = {
    code?: number;
    msg?: string;
    data?: SysUserPostVo;
  };

  type RTreeSelectVo = {
    code?: number;
    msg?: string;
    data?: TreeSelectVo;
  };

  type RUserInfoVo = {
    code?: number;
    msg?: string;
    data?: UserInfoVo;
  };

  type RVoid = {
    code?: number;
    msg?: string;
    data?: any;
  };

  type RWfApprovalDetailVO = {
    code?: number;
    msg?: string;
    data?: WfApprovalDetailVO;
  };

  type RWfBizRefVo = {
    code?: number;
    msg?: string;
    data?: WfBizRefVo;
  };

  type RWfCcVo = {
    code?: number;
    msg?: string;
    data?: WfCcVo;
  };

  type RWfDefinitionVo = {
    code?: number;
    msg?: string;
    data?: WfDefinitionVo;
  };

  type RWfInstanceVo = {
    code?: number;
    msg?: string;
    data?: WfInstanceVo;
  };

  type RWfNodeInstanceVo = {
    code?: number;
    msg?: string;
    data?: WfNodeInstanceVo;
  };

  type RWfTaskLogVo = {
    code?: number;
    msg?: string;
    data?: WfTaskLogVo;
  };

  type RWfTaskVo = {
    code?: number;
    msg?: string;
    data?: WfTaskVo;
  };

  type SchemaBo = {
    /** 主键 */
    id: string;
    /** 分组ID */
    schemaGroupId?: string;
    /** 模型名称 */
    name: string;
    /** 表名 */
    tableName: string;
    /** 备注 */
    remark?: string;
  };

  type SchemaFieldBo = {
    /** 主键 */
    id: string;
    /** 模型ID */
    schemaId: string;
    /** 模型名称 */
    schemaName?: string;
    /** 字段名称 */
    name: string;
    /** 字段编码 */
    code: string;
    /** 字段类型 */
    type?: string;
    /** 字段注释 */
    comment?: string;
    /** 是否主键 */
    isPk?: string;
    /** 是否必填 */
    isRequired?: string;
    /** 是否唯一 */
    isUnique?: string;
    /** 默认值 */
    defaultValue?: string;
    /** 字段长度 */
    length?: number;
    /** 小数位数 */
    scale?: number;
    /** 排序 */
    sort?: number;
    /** 是否列表显示（0否 1是） */
    isList?: string;
    /** 是否查询字段（0否 1是） */
    isQuery?: string;
    /** 是否插入字段（0否 1是） */
    isInsert?: string;
    /** 是否编辑字段（0否 1是） */
    isEdit?: string;
    /** 查询方式 */
    queryType?: string;
    /** 显示类型 */
    htmlType?: string;
    /** 字典类型 */
    dictType?: string;
    /** 备注 */
    remark?: string;
  };

  type schemaFieldGetInfoParams = {
    /** 主键 */
    id: number;
  };

  type schemaFieldListBySchemaIdParams = {
    /** 模型ID */
    schemaId: number;
  };

  type schemaFieldListParams = {
    bo: SchemaFieldBo;
    pageQuery: PageQuery;
  };

  type schemaFieldRemoveParams = {
    /** 主键串 */
    ids: number[];
  };

  type SchemaFieldVo = {
    /** 主键 */
    id?: string;
    /** 模型ID */
    schemaId?: string;
    /** 模型名称 */
    schemaName?: string;
    /** 字段名称 */
    name?: string;
    /** 字段编码 */
    code?: string;
    /** 字段类型 */
    type?: string;
    /** 字段注释 */
    comment?: string;
    /** 是否主键 */
    isPk?: string;
    /** 是否必填 */
    isRequired?: string;
    /** 是否唯一 */
    isUnique?: string;
    /** 默认值 */
    defaultValue?: string;
    /** 字段长度 */
    length?: number;
    /** 小数位数 */
    scale?: number;
    /** 排序 */
    sort?: number;
    /** 是否列表显示 */
    isList?: string;
    /** 是否查询字段 */
    isQuery?: string;
    /** 是否插入字段 */
    isInsert?: string;
    /** 是否编辑字段 */
    isEdit?: string;
    /** 查询方式 */
    queryType?: string;
    /** 显示类型 */
    htmlType?: string;
    /** 字典类型 */
    dictType?: string;
    /** 备注 */
    remark?: string;
  };

  type schemaGetInfoParams = {
    /** 主键 */
    id: number;
  };

  type SchemaGroupBo = {
    /** 主键 */
    id: string;
    /** 分组名称 */
    name: string;
    /** 分组编码 */
    code: string;
    /** 图标 */
    icon?: string;
    /** 备注 */
    remark?: string;
    sort?: number;
  };

  type schemaGroupGetInfoParams = {
    /** 主键 */
    id: number;
  };

  type schemaGroupListParams = {
    bo: SchemaGroupBo;
    pageQuery: PageQuery;
  };

  type schemaGroupRemoveParams = {
    /** 主键串 */
    ids: number[];
  };

  type SchemaGroupVo = {
    /** 主键 */
    id?: string;
    /** 分组名称 */
    name?: string;
    /** 分组编码 */
    code?: string;
    /** 图标 */
    icon?: string;
    /** 排序 */
    sort?: number;
    /** 备注 */
    remark?: string;
    /** 创建时间 */
    createTime?: string;
  };

  type schemaListParams = {
    bo: SchemaBo;
    pageQuery: PageQuery;
  };

  type schemaRemoveParams = {
    /** 主键串 */
    ids: number[];
  };

  type SchemaVo = {
    /** 主键 */
    id?: string;
    /** 分组ID */
    schemaGroupId?: string;
    moduleName?: string;
    /** 模型名称 */
    name?: string;
    /** 模型编码 */
    code?: string;
    /** 表名 */
    tableName?: string;
    /** 字典 */
    dictType?: string;
    /** 表注释 */
    comment?: string;
    /** 存储引擎 */
    engine?: string;
    /** 列表字段 */
    listKeys?: string;
    /** 搜索表单字段 */
    searchFormKeys?: string;
    /** 表单设计 */
    designer?: string;
    /** 状态 */
    status?: string;
    /** 排序 */
    sort?: number;
    /** 备注 */
    remark?: string;
    /** 创建时间 */
    createTime?: string;
  };

  type selectEndpointByProviderParams = {
    providerId: string;
  };

  type SelectModel = {
    value?: string;
    label?: string;
  };

  type selectModelByEndpointParams = {
    endpointId: string;
  };

  type SelectRolesVo = {
    roles?: SysRoleVo[];
    checkedKeys?: string[];
  };

  type SseEmitter = {
    timeout?: string;
  };

  type StartCmd = {
    /** 操作人（当前用户） */
    operatorId?: string;
    operatorName?: string;
    tenantId?: string;
    /** 备注 / 审批意见 */
    comment?: string;
    variables?: Record<string, any>;
    definitionKey: string;
    bizType: string;
    bizId: string;
    bizNo: string;
    /** 业务发起人（可选，代发场景用） */
    starterId?: string;
    starterName?: string;
    starterDeptId?: string;
    starterDeptName?: string;
    title?: string;
  };

  type StrSelectModel = {
    value?: string;
    label?: string;
  };

  type SysBizNoSeqBo = {
    id?: string;
    /** 租户Id */
    tenantId?: string;
    /** 业务前缀，如 OA / EXP / CON */
    bizPrefix: string;
    /** 业务日期 yyyyMMdd */
    bizDate: string;
    /** 当前序号 */
    currentNo: number;
    /** updateTime */
    updateTime?: string;
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
  };

  type SysBizNoSeqExportParams = {
    bo: SysBizNoSeqBo;
  };

  type SysBizNoSeqGetInfoParams = {
    /** 主键 */
    id: string;
  };

  type SysBizNoSeqListParams = {
    bo: SysBizNoSeqBo;
    pageQuery: PageQuery;
  };

  type SysBizNoSeqRemoveParams = {
    /** 主键串 */
    ids: string[];
  };

  type SysBizNoSeqVo = {
    id: string;
    /** 租户Id */
    tenantId?: string;
    /** 业务前缀，如 OA / EXP / CON */
    bizPrefix?: string;
    /** 业务日期 yyyyMMdd */
    bizDate?: string;
    /** 当前序号 */
    currentNo?: number;
    /** updateTime */
    updateTime?: string;
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
  };

  type SysDeptBo = {
    deptId?: string;
    /** 租户编号 */
    tenantId?: string;
    /** 父部门id */
    parentId?: string;
    /** 祖级列表 */
    ancestors?: string;
    /** 部门名称 */
    deptName?: string;
    /** 显示顺序 */
    orderNum?: number;
    /** 负责人 */
    leaderId?: string;
    /** 联系电话 */
    phone?: string;
    /** 邮箱 */
    email?: string;
    /** 部门状态（0正常 1停用） */
    status?: string;
    /** 删除标志（0代表存在 2代表删除） */
    delFlag?: string;
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
    leader?: string;
  };

  type sysDeptExportParams = {
    bo: SysDeptBo;
  };

  type sysDeptGetInfoParams = {
    /** 主键 */
    deptId: string;
  };

  type sysDeptListParams = {
    bo: SysDeptBo;
    pageQuery: PageQuery;
  };

  type sysDeptListTreeParams = {
    bo: SysDeptBo;
  };

  type sysDeptRemoveParams = {
    /** 主键串 */
    deptIds: string[];
  };

  type sysDeptTreeselectParams = {
    bo: SysDeptBo;
  };

  type SysDeptVo = {
    deptId: string;
    /** 租户编号 */
    tenantId?: string;
    /** 父部门id */
    parentId?: string;
    /** 祖级列表 */
    ancestors?: string;
    /** 部门名称 */
    deptName?: string;
    /** 显示顺序 */
    orderNum?: number;
    /** 负责人 */
    leaderId?: string;
    /** 联系电话 */
    phone?: string;
    /** 邮箱 */
    email?: string;
    /** 部门状态（0正常 1停用） */
    status?: string;
    /** 删除标志（0代表存在 2代表删除） */
    delFlag?: string;
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
    children?: any[];
    leader?: string;
  };

  type SysDictDataBo = {
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 请求参数 */
    params?: Record<string, any>;
    /** 字典编码 */
    dictCode?: string;
    /** 字典排序 */
    dictSort?: number;
    /** 字典标签 */
    dictLabel?: string;
    /** 字典键值 */
    dictValue?: string;
    /** 字典类型 */
    dictType?: string;
    /** 样式属性（其他样式扩展） */
    cssClass?: string;
    /** 表格回显样式 */
    listClass?: string;
    /** 是否默认（Y是 N否） */
    isDefault?: string;
    /** 状态（0正常 1停用） */
    status?: string;
    /** 备注 */
    remark?: string;
  };

  type SysDictDataVo = {
    /** 字典编码 */
    dictCode: string;
    /** 字典排序 */
    dictSort?: number;
    /** 字典标签 */
    dictLabel?: string;
    /** 字典键值 */
    dictValue?: string;
    /** 字典类型 */
    dictType?: string;
    /** 样式属性（其他样式扩展） */
    cssClass?: string;
    /** 表格回显样式 */
    listClass?: string;
    /** 是否默认（Y是 N否） */
    isDefault?: string;
    /** 状态（0正常 1停用） */
    status?: string;
    /** 备注 */
    remark?: string;
    /** 创建时间 */
    createTime?: string;
  };

  type SysDictTypeBo = {
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 请求参数 */
    params?: Record<string, any>;
    /** 字典主键 */
    dictId?: string;
    /** 字典名称 */
    dictName?: string;
    /** 字典类型 */
    dictType?: string;
    /** 状态（0正常 1停用） */
    status?: string;
    /** 备注 */
    remark?: string;
  };

  type SysDictTypeVo = {
    /** 字典主键 */
    dictId: string;
    /** 字典名称 */
    dictName?: string;
    /** 字典类型 */
    dictType?: string;
    /** 状态（0正常 1停用） */
    status?: string;
    /** 备注 */
    remark?: string;
    /** 创建时间 */
    createTime?: string;
  };

  type SysLogininforBo = {
    infoId?: string;
    /** 租户编号 */
    tenantId?: string;
    /** 用户Id */
    userId?: string;
    /** 用户账号 */
    userName?: string;
    /** 登录IP地址 */
    ipaddr?: string;
    /** 登录地点 */
    loginLocation?: string;
    /** 浏览器类型 */
    browser?: string;
    /** 操作系统 */
    os?: string;
    /** 登录状态（0成功 1失败） */
    status?: string;
    /** 提示消息 */
    msg?: string;
    /** 访问时间 */
    loginTime?: string;
    onlySelf?: boolean;
  };

  type SysLogininforExportParams = {
    bo: SysLogininforBo;
  };

  type SysLogininforGetInfoParams = {
    /** 主键 */
    infoId: string;
  };

  type SysLogininforListParams = {
    bo: SysLogininforBo;
    pageQuery: PageQuery;
  };

  type SysLogininforRemoveParams = {
    /** 主键串 */
    infoIds: string[];
  };

  type SysLogininforVo = {
    infoId: string;
    /** 租户编号 */
    tenantId?: string;
    /** 用户账号 */
    userName?: string;
    userId?: string;
    /** 登录IP地址 */
    ipaddr?: string;
    /** 登录地点 */
    loginLocation?: string;
    /** 浏览器类型 */
    browser?: string;
    /** 操作系统 */
    os?: string;
    /** 登录状态（0成功 1失败） */
    status?: string;
    /** 提示消息 */
    msg?: string;
    /** 访问时间 */
    loginTime?: string;
  };

  type SysMenuBo = {
    menuId?: string;
    /** 菜单名称 */
    menuName?: string;
    routeName?: string;
    /** 父菜单ID */
    parentId?: string;
    /** 显示顺序 */
    orderNum?: number;
    /** 路由地址 */
    path?: string;
    /** 组件路径 */
    component?: string;
    /** 路由参数 */
    queryParam?: string;
    /** 是否为外链（0是 1否） */
    isFrame?: number;
    /** 是否缓存（0缓存 1不缓存） */
    isCache?: number;
    /** 菜单类型（M目录 C菜单 F按钮） */
    menuType?: string;
    /** 显示状态（0显示 1隐藏） */
    visible?: string;
    /** 菜单状态（0正常 1停用） */
    status?: string;
    /** 权限标识 */
    perms?: string;
    /** 菜单图标 */
    icon?: string;
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 备注 */
    remark?: string;
    scope?: string;
    menuTypes?: string[];
  };

  type sysMenuExportParams = {
    bo: SysMenuBo;
  };

  type sysMenuGetInfoParams = {
    /** 主键 */
    menuId: string;
  };

  type sysMenuListParams = {
    bo: SysMenuBo;
    pageQuery: PageQuery;
  };

  type sysMenuListTreeParams = {
    bo: SysMenuBo;
  };

  type sysMenuRemoveParams = {
    /** 主键串 */
    menuIds: string[];
  };

  type sysMenuRoleMenuTreeselectParams = {
    roleId: string;
  };

  type sysMenuTreeselectParams = {
    bo: SysMenuBo;
    roleId: string;
  };

  type SysMenuVo = {
    menuId: string;
    /** 菜单名称 */
    menuName?: string;
    /** 菜单名称 */
    routeName?: string;
    /** 父菜单ID */
    parentId?: string;
    /** 显示顺序 */
    orderNum?: number;
    /** 路由地址 */
    path?: string;
    /** 组件路径 */
    component?: string;
    /** 路由参数 */
    queryParam?: string;
    /** 是否为外链（0是 1否） */
    isFrame?: number;
    /** 是否缓存（0缓存 1不缓存） */
    isCache?: number;
    /** 菜单类型（M目录 C菜单 F按钮） */
    menuType?: string;
    /** 显示状态（0显示 1隐藏） */
    visible?: string;
    /** 菜单状态（0正常 1停用） */
    status?: string;
    /** 权限标识 */
    perms?: string;
    /** 菜单图标 */
    icon?: string;
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 备注 */
    remark?: string;
    scope?: string;
    children?: any[];
  };

  type SysOperLogBo = {
    operId?: string;
    /** 租户编号 */
    tenantId?: string;
    /** 模块标题 */
    title?: string;
    /** 业务类型（0其它 1新增 2修改 3删除） */
    businessType?: number;
    /** 方法名称 */
    method?: string;
    /** 请求方式 */
    requestMethod?: string;
    /** 操作类别（0其它 1后台用户 2手机端用户） */
    operatorType?: number;
    operatorId?: string;
    /** 操作人员 */
    operName?: string;
    /** 部门名称 */
    deptName?: string;
    /** 请求URL */
    operUrl?: string;
    /** 主机地址 */
    operIp?: string;
    /** 操作地点 */
    operLocation?: string;
    /** 请求参数 */
    operParam?: string;
    /** 返回参数 */
    jsonResult?: string;
    /** 操作状态（0正常 1异常） */
    status?: number;
    /** 错误消息 */
    errorMsg?: string;
    /** 操作时间 */
    operTime?: string;
    /** 消耗时间 */
    costTime?: string;
  };

  type SysOperLogExportParams = {
    bo: SysOperLogBo;
  };

  type SysOperLogGetInfoParams = {
    /** 主键 */
    operId: string;
  };

  type SysOperLogListParams = {
    bo: SysOperLogBo;
    pageQuery: PageQuery;
  };

  type SysOperLogRemoveParams = {
    /** 主键串 */
    operIds: string[];
  };

  type SysOperLogVo = {
    operId: string;
    /** 租户编号 */
    tenantId?: string;
    /** 模块标题 */
    title?: string;
    /** 业务类型（0其它 1新增 2修改 3删除） */
    businessType?: number;
    /** 方法名称 */
    method?: string;
    /** 请求方式 */
    requestMethod?: string;
    /** 操作类别（0其它 1后台用户 2手机端用户） */
    operatorType?: number;
    operatorId?: string;
    /** 操作人员 */
    operName?: string;
    /** 部门名称 */
    deptName?: string;
    /** 请求URL */
    operUrl?: string;
    /** 主机地址 */
    operIp?: string;
    /** 操作地点 */
    operLocation?: string;
    /** 请求参数 */
    operParam?: string;
    /** 返回参数 */
    jsonResult?: string;
    /** 操作状态（0正常 1异常） */
    status?: number;
    /** 错误消息 */
    errorMsg?: string;
    /** 操作时间 */
    operTime?: string;
    /** 消耗时间 */
    costTime?: string;
  };

  type SysPostBo = {
    postId?: string;
    /** 租户编号 */
    tenantId?: string;
    /** 岗位编码 */
    postCode: string;
    /** 岗位名称 */
    postName: string;
    /** 显示顺序 */
    postSort: number;
    /** 状态（0正常 1停用） */
    status: string;
    deptId: string;
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 备注 */
    remark?: string;
    delFlag?: string;
  };

  type SysPostExportParams = {
    bo: SysPostBo;
  };

  type SysPostGetByDeptIdParams = {
    deptId: string;
  };

  type SysPostGetByUserIdParams = {
    userId: string;
  };

  type SysPostGetInfoParams = {
    /** 主键 */
    postId: string;
  };

  type sysPostInsertPostRoleParams = {
    /** 用户Id */
    postId: string;
    /** 角色ID串 */
    roleIds: string[];
  };

  type SysPostListParams = {
    bo: SysPostBo;
    pageQuery: PageQuery;
  };

  type SysPostRemoveParams = {
    /** 主键串 */
    postIds: string[];
  };

  type SysPostVo = {
    postId: string;
    /** 租户编号 */
    tenantId?: string;
    /** 岗位编码 */
    postCode?: string;
    /** 岗位名称 */
    postName?: string;
    /** 显示顺序 */
    postSort?: number;
    /** 状态（0正常 1停用） */
    status?: string;
    deptId?: string;
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 备注 */
    remark?: string;
    deptName?: string;
    delFlag?: string;
    primaryPostId?: string;
    isPrimary?: boolean;
  };

  type SysRoleBo = {
    roleId?: string;
    /** 租户编号 */
    tenantId?: string;
    /** 角色名称 */
    roleName: string;
    /** 角色权限字符串 */
    roleKey: string;
    /** 显示顺序 */
    roleSort: number;
    /** 数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限） */
    dataScope?: string;
    /** 菜单树选择项是否关联显示 */
    menuCheckStrictly?: boolean;
    /** 部门树选择项是否关联显示 */
    deptCheckStrictly?: boolean;
    /** 角色状态（0正常 1停用） */
    status: string;
    /** 删除标志（0代表存在 2代表删除） */
    delFlag?: string;
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 备注 */
    remark?: string;
    /** 菜单组 */
    menuIds?: string[];
    menuIdList?: string[];
    menuNames?: string[];
    amount?: number;
    superAdmin?: boolean;
  };

  type SysRoleDeptBo = {
    roleId?: string;
    deptId?: string;
  };

  type sysRoleDeptExportParams = {
    bo: SysRoleDeptBo;
  };

  type sysRoleDeptGetInfoParams = {
    /** 主键 */
    deptId: string;
  };

  type sysRoleDeptListParams = {
    bo: SysRoleDeptBo;
    pageQuery: PageQuery;
  };

  type sysRoleDeptRemoveParams = {
    /** 主键串 */
    deptIds: string[];
  };

  type SysRoleDeptVo = {
    roleId: string;
    deptId: string;
  };

  type sysRoleExportParams = {
    bo: SysRoleBo;
  };

  type sysRoleGetInfoParams = {
    /** 主键 */
    roleId: string;
  };

  type sysRoleListParams = {
    bo: SysRoleBo;
    pageQuery: PageQuery;
  };

  type SysRoleMenuBo = {
    roleId?: string;
    menuId?: string;
  };

  type sysRoleMenuExportParams = {
    bo: SysRoleMenuBo;
  };

  type sysRoleMenuGetInfoParams = {
    /** 主键 */
    menuId: string;
  };

  type sysRoleMenuListParams = {
    bo: SysRoleMenuBo;
    pageQuery: PageQuery;
  };

  type sysRoleMenuRemoveParams = {
    /** 主键串 */
    menuIds: string[];
  };

  type SysRoleMenuVo = {
    roleId: string;
    menuId: string;
  };

  type SysRolePostBo = {
    postId?: string;
    roleId?: string;
  };

  type SysRolePostExportParams = {
    bo: SysRolePostBo;
  };

  type SysRolePostGetInfoParams = {
    /** 主键 */
    roleId: string;
  };

  type SysRolePostListParams = {
    bo: SysRolePostBo;
    pageQuery: PageQuery;
  };

  type SysRolePostRemoveParams = {
    /** 主键串 */
    roleIds: string[];
  };

  type sysRolePostSelectParams = {
    postId: string;
  };

  type SysRolePostVo = {
    postId?: string;
    roleId?: string;
  };

  type sysRoleRemoveParams = {
    /** 主键串 */
    roleIds: string[];
  };

  type SysRoleVo = {
    roleId: string;
    /** 租户编号 */
    tenantId?: string;
    /** 角色名称 */
    roleName?: string;
    /** 角色权限字符串 */
    roleKey?: string;
    /** 显示顺序 */
    roleSort?: number;
    /** 数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限） */
    dataScope?: string;
    /** 菜单树选择项是否关联显示 */
    menuCheckStrictly?: boolean;
    /** 部门树选择项是否关联显示 */
    deptCheckStrictly?: boolean;
    /** 角色状态（0正常 1停用） */
    status?: string;
    /** 删除标志（0代表存在 2代表删除） */
    delFlag?: string;
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 备注 */
    remark?: string;
    checkedKeys?: string[];
    superAdmin?: boolean;
  };

  type SysTenantBo = {
    id?: string;
    /** 租户编号 */
    tenantId?: string;
    /** 联系人 */
    contactUserName?: string;
    /** 联系电话 */
    contactPhone?: string;
    /** 企业名称 */
    companyName?: string;
    /** 统一社会信用代码 */
    licenseNumber?: string;
    /** 地址 */
    address?: string;
    /** 企业简介 */
    intro?: string;
    /** 域名 */
    domain?: string;
    /** 备注 */
    remark?: string;
    /** 租户套餐编号 */
    packageId?: string;
    /** 过期时间 */
    expireTime?: string;
    /** 用户数量（-1不限制） */
    accountCount?: number;
    /** 租户状态（0正常 1停用） */
    status?: string;
    /** 删除标志（0代表存在 2代表删除） */
    delFlag?: string;
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
  };

  type sysTenantExportParams = {
    bo: SysTenantBo;
  };

  type sysTenantGetInfoParams = {
    /** 主键 */
    id: string;
  };

  type sysTenantListParams = {
    bo: SysTenantBo;
    pageQuery: PageQuery;
  };

  type sysTenantRemoveParams = {
    /** 主键串 */
    ids: string[];
  };

  type SysTenantVo = {
    id: string;
    /** 租户编号 */
    tenantId?: string;
    /** 联系人 */
    contactUserName?: string;
    /** 联系电话 */
    contactPhone?: string;
    /** 企业名称 */
    companyName?: string;
    /** 统一社会信用代码 */
    licenseNumber?: string;
    /** 地址 */
    address?: string;
    /** 企业简介 */
    intro?: string;
    /** 域名 */
    domain?: string;
    /** 备注 */
    remark?: string;
    /** 租户套餐编号 */
    packageId?: string;
    /** 过期时间 */
    expireTime?: string;
    /** 用户数量（-1不限制） */
    accountCount?: number;
    /** 租户状态（0正常 1停用） */
    status?: string;
    /** 删除标志（0代表存在 2代表删除） */
    delFlag?: string;
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
  };

  type SysUserBo = {
    userId?: string;
    /** 微信用户标识 */
    openId?: string;
    /** 用户等级 */
    userGrade?: string;
    /** 账户余额 */
    userBalance?: number;
    /** 租户编号 */
    tenantId?: string;
    /** 部门ID */
    deptId?: string;
    /** 用户账号 */
    userName?: string;
    /** 用户昵称 */
    nickName: string;
    /** 用户类型（sys_user系统用户） */
    userType?: string;
    /** 用户套餐 */
    userPlan?: string;
    /** 用户邮箱 */
    email: string;
    /** 手机号码 */
    phonenumber?: string;
    /** 用户性别（0男 1女 2未知） */
    sex?: string;
    /** 头像地址 */
    avatar?: string;
    /** 微信头像地址 */
    wxAvatar?: string;
    /** 密码 */
    password?: string;
    /** 帐号状态（0正常 1停用） */
    status?: string;
    /** 删除标志（0代表存在 2代表删除） */
    delFlag?: string;
    /** 最后登录IP */
    loginIp?: string;
    /** 最后登录时间 */
    loginDate?: string;
    /** 注册域名 */
    domainName?: string;
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 备注 */
    remark?: string;
    /** 关联知识库角色/角色组 */
    kroleGroupType?: string;
    /** 关联知识库角色/角色组id */
    kroleGroupIds?: string;
    roleId?: string;
    postId?: string;
    postName?: string;
    deptName?: string;
    roleName?: string;
    primaryPostId?: string;
  };

  type SysUserDTO = {
    userId?: string;
    openId?: string;
    userGrade?: string;
    userBalance?: number;
    tenantId?: string;
    deptId?: string;
    userName?: string;
    nickName?: string;
    userType?: string;
    email?: string;
    phonenumber?: string;
    sex?: string;
    avatar?: string;
    wxAvatar?: string;
  };

  type sysUserExportParams = {
    bo: SysUserBo;
  };

  type sysUserGetAuthRoleParams = {
    /** 用户ID */
    userId: string;
  };

  type sysUserGetInfoParams = {
    /** 主键 */
    userId: string;
  };

  type SysUserInfoVo = {
    /** 用户信息 */
    user?: SysUserVo;
    /** 角色ID列表 */
    roleIds?: string[];
    /** 角色列表 */
    roles?: SysRoleVo[];
    /** 岗位ID列表 */
    postIds?: string[];
  };

  type sysUserListParams = {
    bo: SysUserBo;
    pageQuery: PageQuery;
  };

  type SysUserPasswordBo = {
    /** 旧密码 */
    oldPassword: string;
    /** 新密码 */
    newPassword: string;
  };

  type SysUserPostBo = {
    userId?: string;
    postId?: string;
    isPrimary?: boolean;
  };

  type SysUserPostExportParams = {
    bo: SysUserPostBo;
  };

  type SysUserPostGetInfoParams = {
    /** 主键 */
    postId: string;
  };

  type SysUserPostListParams = {
    bo: SysUserPostBo;
    pageQuery: PageQuery;
  };

  type SysUserPostRemoveParams = {
    /** 主键串 */
    postIds: string;
  };

  type SysUserPostVo = {
    userId: string;
    postId: string;
  };

  type SysUserProfileBo = {
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 请求参数 */
    params?: Record<string, any>;
    /** 用户ID */
    userId?: string;
    /** 用户昵称 */
    nickName?: string;
    /** 用户邮箱 */
    email?: string;
    /** 手机号码 */
    phonenumber?: string;
    /** 用户性别（0男 1女 2未知） */
    sex?: string;
  };

  type sysUserRemoveParams = {
    /** 主键串 */
    userIds: string[];
  };

  type SysUserVo = {
    userId: string;
    /** 微信用户标识 */
    openId?: string;
    /** 用户等级 */
    userGrade?: string;
    /** 账户余额 */
    userBalance?: number;
    /** 租户编号 */
    tenantId?: string;
    /** 部门ID */
    deptId?: string;
    /** 用户账号 */
    userName?: string;
    /** 用户昵称 */
    nickName?: string;
    /** 用户类型（sys_user系统用户） */
    userType?: string;
    /** 用户套餐 */
    userPlan?: string;
    /** 用户邮箱 */
    email?: string;
    /** 手机号码 */
    phonenumber?: string;
    /** 用户性别（0男 1女 2未知） */
    sex?: string;
    /** 头像地址 */
    avatar?: string;
    /** 微信头像地址 */
    wxAvatar?: string;
    /** 密码 */
    password?: string;
    /** 帐号状态（0正常 1停用） */
    status?: string;
    /** 删除标志（0代表存在 2代表删除） */
    delFlag?: string;
    /** 最后登录IP */
    loginIp?: string;
    /** 最后登录时间 */
    loginDate?: string;
    /** 注册域名 */
    domainName?: string;
    /** 创建部门 */
    createDept?: string;
    /** 创建者 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 备注 */
    remark?: string;
    /** 关联知识库角色/角色组 */
    kroleGroupType?: string;
    /** 关联知识库角色/角色组id */
    kroleGroupIds?: string;
    /** 角色对象 */
    roles?: SysRoleVo[];
    /** 部门对象 */
    dept?: SysDeptVo;
    deptName?: string;
    postName?: string;
    isPrimaryPost?: boolean;
    primaryPostId?: string;
  };

  type TableDataInfoChatAttachmentVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: ChatAttachmentVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoChatConversationVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: ChatConversationVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoChatMessageChunkVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: ChatMessageChunkVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoChatMessageVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: ChatMessageVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoChatModelVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: ChatModelVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoChatSessionVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: ChatSessionVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoLlmEndpointVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: LlmEndpointVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoLlmInvocationVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: LlmInvocationVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoLlmModelVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: LlmModelVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoLlmPolicyVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: LlmPolicyVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoLlmProviderVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: LlmProviderVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoLlmRouteRuleVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: LlmRouteRuleVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoOaLeaveApplyVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: OaLeaveApplyVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoSchemaFieldVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: SchemaFieldVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoSchemaGroupVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: SchemaGroupVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoSchemaVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: SchemaVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoSysBizNoSeqVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: SysBizNoSeqVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoSysDeptVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: {
      deptId: number;
      tenantId?: string;
      parentId?: number;
      ancestors?: string;
      deptName?: string;
      orderNum?: number;
      leaderId?: number;
      phone?: string;
      email?: string;
      status?: string;
      delFlag?: string;
      createDept?: number;
      createBy?: number;
      createTime?: string;
      updateBy?: number;
      updateTime?: string;
      children?: any[];
      leader?: string;
    }[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoSysDictDataVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: SysDictDataVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoSysDictTypeVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: SysDictTypeVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoSysLogininforVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: SysLogininforVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoSysMenuVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: {
      menuId: number;
      menuName?: string;
      routeName?: string;
      parentId?: number;
      orderNum?: number;
      path?: string;
      component?: string;
      queryParam?: string;
      isFrame?: number;
      isCache?: number;
      menuType?: string;
      visible?: string;
      status?: string;
      perms?: string;
      icon?: string;
      createDept?: number;
      createBy?: number;
      createTime?: string;
      updateBy?: number;
      updateTime?: string;
      remark?: string;
      scope?: string;
      children?: any[];
    }[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoSysOperLogVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: SysOperLogVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoSysPostVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: SysPostVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoSysRoleDeptVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: SysRoleDeptVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoSysRoleMenuVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: SysRoleMenuVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoSysRolePostVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: SysRolePostVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoSysRoleVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: SysRoleVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoSysTenantVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: SysTenantVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoSysUserPostVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: SysUserPostVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoSysUserVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: SysUserVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoWfBizRefVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: WfBizRefVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoWfCcVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: WfCcVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoWfDefinitionVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: WfDefinitionVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoWfInstanceVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: WfInstanceVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoWfNodeInstanceVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: WfNodeInstanceVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoWfTaskLogVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: WfTaskLogVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoWfTaskVo = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: WfTaskVo[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type TableDataInfoWorkItemRowVO = {
    /** 总记录数 */
    total?: string;
    /** 列表数据 */
    rows?: WorkItemRowVO[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type tempUploadParams = {
    bizPrefix: string;
  };

  type TransferTaskCmd = {
    /** 操作人（当前用户） */
    operatorId?: string;
    operatorName?: string;
    tenantId?: string;
    /** 备注 / 审批意见 */
    comment?: string;
    variables?: Record<string, any>;
    taskId: string;
    toUserId: string;
    reason?: string;
  };

  type TreeLong = {
    name?: { empty?: boolean };
    id?: string;
    config?: TreeNodeConfig;
    parentId?: string;
    weight?: any;
    empty?: boolean;
  };

  type TreeNodeConfig = {
    idKey?: string;
    parentIdKey?: string;
    weightKey?: string;
    nameKey?: string;
    childrenKey?: string;
    deep?: number;
  };

  type TreeSelectVo = {
    /** 选中菜单列表 */
    checkedKeys?: string[];
    /** 菜单下拉树结构列表 */
    treeList?: TreeLong[];
  };

  type UserInfoVo = {
    /** 用户基本信息 */
    user?: SysUserVo;
    /** 菜单权限 */
    permissions?: string[];
    /** 角色权限 */
    roles?: string[];
  };

  type WfApprovalDetailVO = {
    /** 实例基础信息 */
    instance?: WfInstanceVo;
    /** 业务引用（wf_biz_ref） */
    biz?: WfBizRefVo;
    /** 当前操作上下文（待办页会有；申请详情页可能为空） */
    current?: WfTaskVo;
    /** 审批进度：节点轨迹（按 orderNo 升序） */
    timeline?: WfTimelineEventVo[];
    stepNodes?: WfNodeInstanceVo[];
    lfGraph?: LfGraph;
    layers?: LfNode[][];
    /** 前端按钮权限 */
    ops?: OpsVO;
  };

  type WfBizRefBo = {
    id?: string;
    tenantId?: string;
    /** 业务类型，如 LEAVE/REIMBURSE */
    bizType: string;
    /** 业务主键 */
    bizId: string;
    bizNo: string;
    /** 流程实例ID */
    instanceId: string;
    /** RUNNING/APPROVED/REJECTED/CANCELED */
    status: string;
    /** createBy */
    createBy?: string;
    /** createdTime */
    createTime: string;
    /** updatedTime */
    updateTime: string;
    ref_type?: string;
  };

  type WfBizRefExportParams = {
    bo: WfBizRefBo;
  };

  type WfBizRefGetInfoParams = {
    /** 主键 */
    id: string;
  };

  type WfBizRefListParams = {
    bo: WfBizRefBo;
    pageQuery: PageQuery;
  };

  type WfBizRefRemoveParams = {
    /** 主键串 */
    ids: string[];
  };

  type WfBizRefVo = {
    id: string;
    /** 业务类型，如 LEAVE/REIMBURSE */
    bizType?: string;
    /** 业务主键 */
    bizId?: string;
    bizNo?: string;
    tenantId?: string;
    /** 流程实例ID */
    instanceId?: string;
    /** RUNNING/APPROVED/REJECTED/CANCELED */
    status?: string;
    /** createBy */
    createBy?: string;
    /** createdTime */
    createTime?: string;
    /** updatedTime */
    updateTime?: string;
  };

  type WfCcBo = {
    id?: string;
    /** 租户ID */
    tenantId: string;
    /** 流程实例ID */
    instanceId: string;
    /** 被抄送人 */
    userId: string;
    /** 是否已读(0未读 1已读) */
    readFlag?: string;
    /** createTime */
    createTime?: string;
  };

  type WfCcExportParams = {
    bo: WfCcBo;
  };

  type WfCcGetInfoParams = {
    /** 主键 */
    id: string;
  };

  type WfCcListParams = {
    bo: WfCcBo;
    pageQuery: PageQuery;
  };

  type WfCcRemoveParams = {
    /** 主键串 */
    ids: string[];
  };

  type WfCcVo = {
    id: string;
    /** 租户ID */
    tenantId?: string;
    /** 流程实例ID */
    instanceId?: string;
    /** 被抄送人 */
    userId?: string;
    /** 是否已读(0未读 1已读) */
    readFlag?: string;
    /** createTime */
    createTime?: string;
  };

  type WfDefinitionBo = {
    id?: string;
    /** 租户ID */
    tenantId?: string;
    /** 流程业务标识(leave, expense) */
    definitionKey: string;
    /** 流程名称 */
    definitionName: string;
    /** 版本号(递增) */
    version?: number;
    /** 状态(DRAFT/PUBLISHED) */
    status?: string;
    /** 表单定义(JSON Schema) */
    formSchema?: string;
    /** 流程定义JSON */
    flowJson?: string;
    /** 备注 */
    remark?: string;
    /** createBy */
    createBy?: string;
    /** createTime */
    createTime?: string;
    /** updateTime */
    updateTime?: string;
  };

  type WfDefinitionChangeStatusParams = {
    id: string;
    action: string;
  };

  type WfDefinitionDto = {
    id?: string;
    formSchema?: string;
    flowJson?: string;
  };

  type WfDefinitionExportParams = {
    bo: WfDefinitionBo;
  };

  type WfDefinitionGetInfoParams = {
    /** 主键 */
    id: string;
  };

  type WfDefinitionListParams = {
    bo: WfDefinitionBo;
    pageQuery: PageQuery;
  };

  type WfDefinitionRemoveParams = {
    /** 主键串 */
    ids: string[];
  };

  type WfDefinitionVo = {
    id: string;
    /** 租户ID */
    tenantId?: string;
    /** 流程业务标识(leave, expense) */
    definitionKey?: string;
    /** 流程名称 */
    definitionName?: string;
    /** 版本号(递增) */
    version?: number;
    /** 状态(DRAFT/PUBLISHED) */
    status?: string;
    /** 表单定义(JSON Schema) */
    formSchema?: string;
    /** 流程定义JSON */
    flowJson?: string;
    /** 备注 */
    remark?: string;
    /** createBy */
    createBy?: string;
    /** createTime */
    createTime?: string;
    /** updateTime */
    updateTime?: string;
  };

  type WfInstanceBo = {
    id?: string;
    /** 租户ID */
    tenantId?: string;
    /** 流程定义ID */
    definitionId: string;
    /** 流程业务标识 */
    definitionKey?: string;
    definitionName?: string;
    /** 流程版本 */
    definitionVersion?: number;
    /** 状态(RUNNING/APPROVED/REJECTED/CANCELED) */
    status?: string;
    /** startTime */
    startTime?: string;
    /** 结束时间 */
    endTime?: string;
    variables?: string;
    starterId?: string;
    starterName?: string;
    starterDeptId?: string;
    starterDeptName?: string;
    lastOperatorId?: string;
    lastOperatorName?: string;
    endReason?: string;
    endComment?: string;
    endBy?: string;
    /** 非数据库字段 */
    bizType?: string;
    bizNo?: string;
  };

  type WfInstanceDetailParams = {
    bizNo: string;
  };

  type WfInstanceExportParams = {
    bo: WfInstanceBo;
  };

  type WfInstanceGetInfoParams = {
    /** 主键 */
    id: string;
  };

  type WfInstanceListParams = {
    bo: WfInstanceBo;
    pageQuery: PageQuery;
  };

  type WfInstanceRemoveParams = {
    /** 主键串 */
    ids: string[];
  };

  type WfInstanceVo = {
    id: string;
    /** 租户ID */
    tenantId?: string;
    /** 流程定义ID */
    definitionId?: string;
    /** 流程业务标识 */
    definitionKey?: string;
    /** 流程版本 */
    definitionVersion?: number;
    /** 状态(RUNNING/APPROVED/REJECTED/CANCELED) */
    status?: "RUNNING" | "APPROVED" | "REJECTED" | "CANCELED";
    /** 发起人 */
    starterId?: string;
    starterName?: string;
    starterDeptId?: string;
    starterDeptName?: string;
    lastOperatorId?: string;
    lastOperatorName?: string;
    /** startTime */
    startTime?: string;
    /** 结束时间 */
    endTime?: string;
    endReason?: "APPROVED" | "REJECTED" | "WITHDRAWN" | "TERMINATED";
    endComment?: string;
    endBy?: string;
    /** 非数据库字段 */
    bizType?: string;
    definitionName?: string;
    bizNo?: string;
    variables?: string;
  };

  type WfNodeInstanceBo = {
    id?: string;
    /** 流程实例ID */
    instanceId: string;
    /** 节点标识(start/approve_1) */
    nodeKey: string;
    nodeName?: string;
    /** 节点类型(START/APPROVAL/GATEWAY/END) */
    nodeType: string;
    /** 审批人类型(USER/ROLE/DEPT) */
    assigneeType?: string;
    /** 审批人值 */
    assigneeValue?: string;
    operatorId?: string;
    /** 状态(WAIT/DONE) */
    status: string;
    /** 执行顺序 */
    orderNo: number;
    /** createTime */
    createTime?: string;
    finishedTime?: string;
  };

  type WfNodeInstanceExportParams = {
    bo: WfNodeInstanceBo;
  };

  type WfNodeInstanceGetInfoParams = {
    /** 主键 */
    id: string;
  };

  type WfNodeInstanceListParams = {
    bo: WfNodeInstanceBo;
    pageQuery: PageQuery;
  };

  type WfNodeInstanceRemoveParams = {
    /** 主键串 */
    ids: string[];
  };

  type WfNodeInstanceVo = {
    id: string;
    /** 流程实例ID */
    instanceId?: string;
    /** 节点标识(start/approve_1) */
    nodeKey?: string;
    nodeName?: string;
    /** 节点类型(START/APPROVAL/GATEWAY/END) */
    nodeType?:
      | "START"
      | "USER_TASK"
      | "SYSTEM_TASK"
      | "AI_TASK"
      | "GATEWAY"
      | "END";
    /** 审批人类型(USER/ROLE/DEPT) */
    assigneeType?: string;
    /** 审批人值 */
    assigneeValue?: string;
    operatorId?: string;
    /** 状态(WAIT/DONE) */
    status?: "WAIT" | "DONE" | "CANCELED" | "NOT_REACHED";
    /** 执行顺序 */
    orderNo?: number;
    /** createTime */
    createTime?: string;
    finishedTime?: string;
    /** 非数据库字段 */
    operatorName?: string;
    tasks?: WfTaskVo[];
    selectNodeKey?: string;
  };

  type WfTaskBo = {
    id?: string;
    /** 租户ID */
    tenantId: string;
    /** 流程实例ID */
    instanceId: string;
    /** 节点实例ID */
    nodeInstanceId: string;
    /** 审批人ID */
    assigneeId: string;
    operatorId?: string;
    transferFrom?: string;
    transferTime?: string;
    /** 状态(TODO/DONE/TRANSFERRED) */
    status: string;
    /** 操作(APPROVE/REJECT/TRANSFER) */
    action?: string;
    /** 审批意见 */
    comment?: string;
    /** createTime */
    createTime?: string;
    /** 完成时间 */
    finishTime?: string;
    bizType?: string;
    instanceStatus?: string;
  };

  type WfTaskExportParams = {
    bo: WfTaskBo;
  };

  type WfTaskGetInfoParams = {
    /** 主键 */
    id: string;
  };

  type WfTaskListParams = {
    bo: WfTaskBo;
    pageQuery: PageQuery;
  };

  type WfTaskLogBo = {
    id?: string;
    /** 任务ID */
    taskId: string;
    /** 流程实例ID */
    instanceId: string;
    /** 操作(APPROVE/REJECT/TRANSFER) */
    action: string;
    /** 操作人 */
    operatorId: string;
    /** 操作意见 */
    comment?: string;
    /** operateTime */
    operateTime?: string;
  };

  type WfTaskLogExportParams = {
    bo: WfTaskLogBo;
  };

  type WfTaskLogGetInfoParams = {
    /** 主键 */
    id: string;
  };

  type WfTaskLogListParams = {
    bo: WfTaskLogBo;
    pageQuery: PageQuery;
  };

  type WfTaskLogRemoveParams = {
    /** 主键串 */
    ids: string[];
  };

  type WfTaskLogVo = {
    id: string;
    /** 任务ID */
    taskId?: string;
    /** 流程实例ID */
    instanceId?: string;
    nodeInstanceId?: string;
    /** 操作(APPROVE/REJECT/TRANSFER) */
    action?: string;
    /** 操作人 */
    operatorId?: string;
    /** 操作意见 */
    comment?: string;
    /** operateTime */
    operateTime?: string;
  };

  type WfTaskRemoveParams = {
    /** 主键串 */
    ids: string[];
  };

  type WfTaskRollbackNodesParams = {
    taskId: string;
  };

  type WfTaskTransferCandidatesParams = {
    taskId: string;
    userDTO: SysUserDTO;
    pageQuery: PageQuery;
  };

  type WfTaskVo = {
    id: string;
    /** 租户ID */
    tenantId?: string;
    /** 流程实例ID */
    instanceId?: string;
    /** 节点实例ID */
    nodeInstanceId?: string;
    /** 审批人ID */
    assigneeId?: string;
    operatorId?: string;
    transferFrom?: string;
    transferTime?: string;
    status?: "TODO" | "DONE" | "CANCELED";
    /** 操作(APPROVE/REJECT/TRANSFER) */
    action?:
      | "ANY_APPROVE"
      | "REJECT"
      | "ROLLBACK"
      | "TRANSFER"
      | "ADD_SIGN"
      | "ALL_APPROVE"
      | "WITHDRAW"
      | "SYSTEM_PROCESS";
    /** 审批意见 */
    comment?: string;
    /** createTime */
    createTime?: string;
    /** 完成时间 */
    finishTime?: string;
    /** 非数据库字段 */
    operatorName?: string;
    logs?: WfTaskLogVo[];
  };

  type WfTimelineEventVo = {
    id: string;
    time?: string;
    /** START / APPROVE / ROLLBACK / TRANSFER / GATEWAY / END ... */
    action?:
      | "START"
      | "END"
      | "GATEWAY"
      | "APPROVE"
      | "REJECT"
      | "ROLLBACK"
      | "WITHDRAW"
      | "TRANSFER"
      | "ADD_SIGN"
      | "AI_SUGGEST";
    operatorType?: "SYSTEM" | "USER";
    operatorId?: string;
    operatorName?: string;
    /** 节点信息 */
    fromNodeKey?: string;
    fromNodeName?: string;
    toNodeKey?: string;
    toNodeName?: string;
    /** 审批意见 / 转交说明 / 退回原因 */
    comment?: string;
    /** 网关命中条件 */
    conditionExpr?: string;
    /** SUCCESS / FAIL */
    result?: "SUCCESS" | "FAIL";
  };

  type WfWorklistQueryBo = {
    bizType?: string;
    bizNo?: string;
    instanceStatus?: string;
    taskStatus?: string;
    instanceStartTime?: string;
    instanceEndTime?: string;
    starterName?: string;
    taskAction?: string;
    endReason?: string;
  };

  type WithdrawCmd = {
    /** 操作人（当前用户） */
    operatorId?: string;
    operatorName?: string;
    tenantId?: string;
    /** 备注 / 审批意见 */
    comment?: string;
    variables?: Record<string, any>;
    instanceId: string;
  };

  type WorkItemRowVO = {
    taskId?: string;
    instanceId?: string;
    nodeInstanceId?: string;
    taskStatus?: "TODO" | "DONE" | "CANCELED";
    taskAction?:
      | "ANY_APPROVE"
      | "REJECT"
      | "ROLLBACK"
      | "TRANSFER"
      | "ADD_SIGN"
      | "ALL_APPROVE"
      | "WITHDRAW"
      | "SYSTEM_PROCESS";
    taskComment?: string;
    taskCreateTime?: string;
    taskFinishTime?: string;
    instanceStatus?: "RUNNING" | "APPROVED" | "REJECTED" | "CANCELED";
    instanceStartTime?: string;
    instanceEndTime?: string;
    instanceEndReason?: "APPROVED" | "REJECTED" | "WITHDRAWN" | "TERMINATED";
    instanceEndComment?: string;
    nodeKey?: string;
    nodeName?: string;
    bizType?: string;
    bizId?: string;
    bizNo?: string;
    starterId?: string;
    starterName?: string;
    assigneeId?: string;
    assigneeName?: string;
  };

  type workPlaceApprovalsParams = {
    bo: WfWorklistQueryBo;
    pageQuery: PageQuery;
  };

  type workPlaceMyApplyParams = {
    bo: WfWorklistQueryBo;
    pageQuery: PageQuery;
  };

  type workPlaceMyTaskParams = {
    bo: WfWorklistQueryBo;
    pageQuery: PageQuery;
  };
}
