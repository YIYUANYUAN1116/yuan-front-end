// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改chat_message_chunk 修改chat_message_chunk PUT /ai/chatMessageChunk */
export async function chatMessageChunkEdit(
  body: API.ChatMessageChunkBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/chatMessageChunk", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增chat_message_chunk 新增chat_message_chunk POST /ai/chatMessageChunk */
export async function chatMessageChunkAdd(
  body: API.ChatMessageChunkBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/chatMessageChunk", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取chat_message_chunk详细信息 获取chat_message_chunk详细信息 GET /ai/chatMessageChunk/${param0} */
export async function chatMessageChunkGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ChatMessageChunkGetInfoParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RChatMessageChunkVo>(`/ai/chatMessageChunk/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除chat_message_chunk 删除chat_message_chunk DELETE /ai/chatMessageChunk/${param0} */
export async function chatMessageChunkRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ChatMessageChunkRemoveParams,
  options?: { [key: string]: any }
) {
  const { ids: param0, ...queryParams } = params;
  return request<API.RVoid>(`/ai/chatMessageChunk/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出chat_message_chunk列表 导出chat_message_chunk列表 POST /ai/chatMessageChunk/export */
export async function chatMessageChunkExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ChatMessageChunkExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/ai/chatMessageChunk/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询chat_message_chunk列表 查询chat_message_chunk列表 GET /ai/chatMessageChunk/list */
export async function chatMessageChunkList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ChatMessageChunkListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoChatMessageChunkVo>(
    "/ai/chatMessageChunk/list",
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
