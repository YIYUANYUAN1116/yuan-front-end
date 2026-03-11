// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改chat_conversation 修改chat_conversation PUT /ai/chatConversation */
export async function chatConversationEdit(
  body: API.ChatConversationBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/chatConversation", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增chat_conversation 新增chat_conversation POST /ai/chatConversation */
export async function chatConversationAdd(
  body: API.ChatConversationBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/chatConversation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取chat_conversation详细信息 获取chat_conversation详细信息 GET /ai/chatConversation/${param0} */
export async function chatConversationGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ChatConversationGetInfoParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RChatConversationVo>(`/ai/chatConversation/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除chat_conversation 删除chat_conversation DELETE /ai/chatConversation/${param0} */
export async function chatConversationRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ChatConversationRemoveParams,
  options?: { [key: string]: any }
) {
  const { ids: param0, ...queryParams } = params;
  return request<API.RVoid>(`/ai/chatConversation/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出chat_conversation列表 导出chat_conversation列表 POST /ai/chatConversation/export */
export async function chatConversationExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ChatConversationExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/ai/chatConversation/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询chat_conversation列表 查询chat_conversation列表 GET /ai/chatConversation/list */
export async function chatConversationList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ChatConversationListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoChatConversationVo>(
    "/ai/chatConversation/list",
    {
      method: "GET",
      params: {
        ...params,
        bo: undefined,
        ...params["bo"],
        pageQuery: undefined,
        ...params["pageQuery"],
      },
      ...(options || {}),
    }
  );
}
