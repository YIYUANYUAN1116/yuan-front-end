// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改llm_route_rule 修改llm_route_rule PUT /ai/llmRouteRule */
export async function llmRouteRuleEdit(
  body: API.LlmRouteRuleBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/llmRouteRule", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增llm_route_rule 新增llm_route_rule POST /ai/llmRouteRule */
export async function llmRouteRuleAdd(
  body: API.LlmRouteRuleBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/llmRouteRule", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取llm_route_rule详细信息 获取llm_route_rule详细信息 GET /ai/llmRouteRule/${param0} */
export async function llmRouteRuleGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LlmRouteRuleGetInfoParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RLlmRouteRuleVo>(`/ai/llmRouteRule/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除llm_route_rule 删除llm_route_rule DELETE /ai/llmRouteRule/${param0} */
export async function llmRouteRuleRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LlmRouteRuleRemoveParams,
  options?: { [key: string]: any }
) {
  const { ids: param0, ...queryParams } = params;
  return request<API.RVoid>(`/ai/llmRouteRule/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出llm_route_rule列表 导出llm_route_rule列表 POST /ai/llmRouteRule/export */
export async function llmRouteRuleExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LlmRouteRuleExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/ai/llmRouteRule/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询llm_route_rule列表 查询llm_route_rule列表 GET /ai/llmRouteRule/list */
export async function llmRouteRuleList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LlmRouteRuleListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoLlmRouteRuleVo>("/ai/llmRouteRule/list", {
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
