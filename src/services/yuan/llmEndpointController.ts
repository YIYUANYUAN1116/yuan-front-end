// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改llm_endpoint 修改llm_endpoint PUT /ai/llmEndpoint */
export async function llmEndpointEdit(
  body: API.LlmEndpointBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/llmEndpoint", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增llm_endpoint 新增llm_endpoint POST /ai/llmEndpoint */
export async function llmEndpointAdd(
  body: API.LlmEndpointBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/llmEndpoint", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取llm_endpoint详细信息 获取llm_endpoint详细信息 GET /ai/llmEndpoint/${param0} */
export async function llmEndpointGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LlmEndpointGetInfoParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RLlmEndpointVo>(`/ai/llmEndpoint/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除llm_endpoint 删除llm_endpoint DELETE /ai/llmEndpoint/${param0} */
export async function llmEndpointRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LlmEndpointRemoveParams,
  options?: { [key: string]: any }
) {
  const { ids: param0, ...queryParams } = params;
  return request<API.RVoid>(`/ai/llmEndpoint/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出llm_endpoint列表 导出llm_endpoint列表 POST /ai/llmEndpoint/export */
export async function llmEndpointExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LlmEndpointExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/ai/llmEndpoint/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询llm_endpoint列表 查询llm_endpoint列表 GET /ai/llmEndpoint/list */
export async function llmEndpointList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LlmEndpointListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoLlmEndpointVo>("/ai/llmEndpoint/list", {
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

/** 获取供应商选择框列表 GET /ai/llmEndpoint/selectEndpointByProvider */
export async function selectEndpointByProvider(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.selectEndpointByProviderParams,
  options?: { [key: string]: any }
) {
  return request<API.RListSelectModel>(
    "/ai/llmEndpoint/selectEndpointByProvider",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}
