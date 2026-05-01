// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改知识库文档表 修改知识库文档表 PUT /ai/kbDocument */
export async function kbDocumentEdit(
  body: API.KbDocumentBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/kbDocument", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增知识库文档表 新增知识库文档表 POST /ai/kbDocument */
export async function kbDocumentAdd(
  body: API.KbDocumentBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/kbDocument", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取知识库文档表详细信息 获取知识库文档表详细信息 GET /ai/kbDocument/${param0} */
export async function kbDocumentGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbDocumentGetInfoParams,
  options?: { [key: string]: any }
) {
  const { docId: param0, ...queryParams } = params;
  return request<API.RKbDocumentVo>(`/ai/kbDocument/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除知识库文档表 删除知识库文档表 DELETE /ai/kbDocument/${param0} */
export async function kbDocumentRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbDocumentRemoveParams,
  options?: { [key: string]: any }
) {
  const { docIds: param0, ...queryParams } = params;
  return request<API.RVoid>(`/ai/kbDocument/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出知识库文档表列表 导出知识库文档表列表 POST /ai/kbDocument/export */
export async function kbDocumentExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbDocumentExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/ai/kbDocument/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询知识库文档表列表 查询知识库文档表列表 GET /ai/kbDocument/list */
export async function kbDocumentList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbDocumentListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoKbDocumentVo>("/ai/kbDocument/list", {
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

/** Upload and index knowledge base document POST /ai/kbDocument/upload */
export async function kbDocumentUpload(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbDocumentUploadParams,
  body: {},
  options?: { [key: string]: any }
) {
  return request<API.RKbDocumentVo>("/ai/kbDocument/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}
