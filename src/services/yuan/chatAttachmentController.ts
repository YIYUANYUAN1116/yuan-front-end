// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改chat_attachment 修改chat_attachment PUT /ai/chatAttachment */
export async function chatAttachmentEdit(
  body: API.ChatAttachmentBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/chatAttachment", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增chat_attachment 新增chat_attachment POST /ai/chatAttachment */
export async function chatAttachmentAdd(
  body: API.ChatAttachmentBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/chatAttachment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取chat_attachment详细信息 获取chat_attachment详细信息 GET /ai/chatAttachment/${param0} */
export async function chatAttachmentGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ChatAttachmentGetInfoParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RChatAttachmentVo>(`/ai/chatAttachment/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除chat_attachment 删除chat_attachment DELETE /ai/chatAttachment/${param0} */
export async function chatAttachmentRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ChatAttachmentRemoveParams,
  options?: { [key: string]: any }
) {
  const { ids: param0, ...queryParams } = params;
  return request<API.RVoid>(`/ai/chatAttachment/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出chat_attachment列表 导出chat_attachment列表 POST /ai/chatAttachment/export */
export async function chatAttachmentExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ChatAttachmentExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/ai/chatAttachment/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询chat_attachment列表 查询chat_attachment列表 GET /ai/chatAttachment/list */
export async function chatAttachmentList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ChatAttachmentListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoChatAttachmentVo>("/ai/chatAttachment/list", {
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
