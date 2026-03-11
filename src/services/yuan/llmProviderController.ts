// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改llm_provider 修改llm_provider PUT /ai/llmProvider */
export async function llmProviderEdit(
  body: API.LlmProviderBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/llmProvider", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增llm_provider 新增llm_provider POST /ai/llmProvider */
export async function llmProviderAdd(
  body: API.LlmProviderBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/llmProvider", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取llm_provider详细信息 获取llm_provider详细信息 GET /ai/llmProvider/${param0} */
export async function llmProviderGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LlmProviderGetInfoParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RLlmProviderVo>(`/ai/llmProvider/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除llm_provider 删除llm_provider DELETE /ai/llmProvider/${param0} */
export async function llmProviderRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LlmProviderRemoveParams,
  options?: { [key: string]: any }
) {
  const { ids: param0, ...queryParams } = params;
  return request<API.RVoid>(`/ai/llmProvider/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出llm_provider列表 导出llm_provider列表 POST /ai/llmProvider/export */
export async function llmProviderExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LlmProviderExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/ai/llmProvider/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询llm_provider列表 查询llm_provider列表 GET /ai/llmProvider/list */
export async function llmProviderList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LlmProviderListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoLlmProviderVo>("/ai/llmProvider/list", {
    method: "GET",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
      pageQuery: undefined,
      ...params["pageQuery"],
    },
    ...(options || {}),
  });
}

/** 获取供应商选择框列表 GET /ai/llmProvider/selectProvider */
export async function selectProvider(options?: { [key: string]: any }) {
  return request<API.RListStrSelectModel>("/ai/llmProvider/selectProvider", {
    method: "GET",
    ...(options || {}),
  });
}
