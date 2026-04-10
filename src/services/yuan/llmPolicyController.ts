// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改llm_policy 修改llm_policy PUT /ai/llmPolicy */
export async function llmPolicyEdit(
  body: API.LlmPolicyBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/llmPolicy", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增llm_policy 新增llm_policy POST /ai/llmPolicy */
export async function llmPolicyAdd(
  body: API.LlmPolicyBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/llmPolicy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取llm_policy详细信息 获取llm_policy详细信息 GET /ai/llmPolicy/${param0} */
export async function llmPolicyGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LlmPolicyGetInfoParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RLlmPolicyVo>(`/ai/llmPolicy/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除llm_policy 删除llm_policy DELETE /ai/llmPolicy/${param0} */
export async function llmPolicyRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LlmPolicyRemoveParams,
  options?: { [key: string]: any }
) {
  const { ids: param0, ...queryParams } = params;
  return request<API.RVoid>(`/ai/llmPolicy/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出llm_policy列表 导出llm_policy列表 POST /ai/llmPolicy/export */
export async function llmPolicyExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LlmPolicyExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/ai/llmPolicy/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询llm_policy列表 查询llm_policy列表 GET /ai/llmPolicy/list */
export async function llmPolicyList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LlmPolicyListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoLlmPolicyVo>("/ai/llmPolicy/list", {
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
