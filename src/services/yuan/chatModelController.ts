// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改chat_model 修改chat_model PUT /ai/chatModel */
export async function edit1(
  body: API.ChatModelBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/chatModel", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增chat_model 新增chat_model POST /ai/chatModel */
export async function add1(
  body: API.ChatModelBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/chatModel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取chat_model详细信息 获取chat_model详细信息 GET /ai/chatModel/${param0} */
export async function getInfo1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInfo1Params,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RChatModelVo>(`/ai/chatModel/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除chat_model 删除chat_model DELETE /ai/chatModel/${param0} */
export async function remove1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.remove1Params,
  options?: { [key: string]: any }
) {
  const { ids: param0, ...queryParams } = params;
  return request<API.RVoid>(`/ai/chatModel/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出chat_model列表 导出chat_model列表 POST /ai/chatModel/export */
export async function export1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.export1Params,
  options?: { [key: string]: any }
) {
  return request<any>("/ai/chatModel/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询chat_model列表 查询chat_model列表 GET /ai/chatModel/list */
export async function list1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.list1Params,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoChatModelVo>("/ai/chatModel/list", {
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
