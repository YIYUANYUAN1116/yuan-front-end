// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改llm_model 修改llm_model PUT /ai/llmModel */
export async function llmModelEdit(
  body: API.LlmModelBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/llmModel", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增llm_model 新增llm_model POST /ai/llmModel */
export async function llmModelAdd(
  body: API.LlmModelBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/llmModel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取llm_model详细信息 获取llm_model详细信息 GET /ai/llmModel/${param0} */
export async function llmModelGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LlmModelGetInfoParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RLlmModelVo>(`/ai/llmModel/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除llm_model 删除llm_model DELETE /ai/llmModel/${param0} */
export async function llmModelRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LlmModelRemoveParams,
  options?: { [key: string]: any }
) {
  const { ids: param0, ...queryParams } = params;
  return request<API.RVoid>(`/ai/llmModel/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出llm_model列表 导出llm_model列表 POST /ai/llmModel/export */
export async function llmModelExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LlmModelExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/ai/llmModel/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询llm_model列表 查询llm_model列表 GET /ai/llmModel/list */
export async function llmModelList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LlmModelListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoLlmModelVo>("/ai/llmModel/list", {
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
