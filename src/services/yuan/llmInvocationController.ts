// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改llm_invocation 修改llm_invocation PUT /ai/llmInvocation */
export async function llmInvocationEdit(
  body: API.LlmInvocationBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/llmInvocation", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增llm_invocation 新增llm_invocation POST /ai/llmInvocation */
export async function llmInvocationAdd(
  body: API.LlmInvocationBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/llmInvocation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取llm_invocation详细信息 获取llm_invocation详细信息 GET /ai/llmInvocation/${param0} */
export async function llmInvocationGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LlmInvocationGetInfoParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RLlmInvocationVo>(`/ai/llmInvocation/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除llm_invocation 删除llm_invocation DELETE /ai/llmInvocation/${param0} */
export async function llmInvocationRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LlmInvocationRemoveParams,
  options?: { [key: string]: any }
) {
  const { ids: param0, ...queryParams } = params;
  return request<API.RVoid>(`/ai/llmInvocation/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出llm_invocation列表 导出llm_invocation列表 POST /ai/llmInvocation/export */
export async function llmInvocationExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LlmInvocationExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/ai/llmInvocation/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询llm_invocation列表 查询llm_invocation列表 GET /ai/llmInvocation/list */
export async function llmInvocationList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LlmInvocationListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoLlmInvocationVo>("/ai/llmInvocation/list", {
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
