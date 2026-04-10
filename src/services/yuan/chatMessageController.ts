// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改chat_message 修改chat_message PUT /ai/chatMessage */
export async function chatMessageEdit(
  body: API.ChatMessageBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/chatMessage", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增chat_message 新增chat_message POST /ai/chatMessage */
export async function chatMessageAdd(
  body: API.ChatMessageBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/chatMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取chat_message详细信息 获取chat_message详细信息 GET /ai/chatMessage/${param0} */
export async function chatMessageGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ChatMessageGetInfoParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RChatMessageVo>(`/ai/chatMessage/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除chat_message 删除chat_message DELETE /ai/chatMessage/${param0} */
export async function chatMessageRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ChatMessageRemoveParams,
  options?: { [key: string]: any }
) {
  const { ids: param0, ...queryParams } = params;
  return request<API.RVoid>(`/ai/chatMessage/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出chat_message列表 导出chat_message列表 POST /ai/chatMessage/export */
export async function chatMessageExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ChatMessageExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/ai/chatMessage/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询chat_message列表 查询chat_message列表 GET /ai/chatMessage/list */
export async function chatMessageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ChatMessageListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoChatMessageVo>("/ai/chatMessage/list", {
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
