// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改chat-session 修改chat-session PUT /ai/chatSession */
export async function edit(
  body: API.ChatSessionBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/chatSession", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增chat-session 新增chat-session POST /ai/chatSession */
export async function add(
  body: API.ChatSessionBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/chatSession", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取chat-session详细信息 获取chat-session详细信息 GET /ai/chatSession/${param0} */
export async function getInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInfoParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RChatSessionVo>(`/ai/chatSession/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除chat-session 删除chat-session DELETE /ai/chatSession/${param0} */
export async function remove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.removeParams,
  options?: { [key: string]: any }
) {
  const { ids: param0, ...queryParams } = params;
  return request<API.RVoid>(`/ai/chatSession/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出chat-session列表 导出chat-session列表 POST /ai/chatSession/export */
export async function exportUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.exportUsingPOSTParams,
  options?: { [key: string]: any }
) {
  return request<any>("/ai/chatSession/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询chat-session列表 查询chat-session列表 GET /ai/chatSession/list */
export async function list(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoChatSessionVo>("/ai/chatSession/list", {
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
