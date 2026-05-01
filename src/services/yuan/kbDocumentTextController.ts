// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改知识库文档解析文本表 修改知识库文档解析文本表 PUT /ai/kbDocumentText */
export async function kbDocumentTextEdit(
  body: API.KbDocumentTextBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/kbDocumentText", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增知识库文档解析文本表 新增知识库文档解析文本表 POST /ai/kbDocumentText */
export async function kbDocumentTextAdd(
  body: API.KbDocumentTextBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/kbDocumentText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取知识库文档解析文本表详细信息 获取知识库文档解析文本表详细信息 GET /ai/kbDocumentText/${param0} */
export async function kbDocumentTextGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbDocumentTextGetInfoParams,
  options?: { [key: string]: any }
) {
  const { textId: param0, ...queryParams } = params;
  return request<API.RKbDocumentTextVo>(`/ai/kbDocumentText/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除知识库文档解析文本表 删除知识库文档解析文本表 DELETE /ai/kbDocumentText/${param0} */
export async function kbDocumentTextRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbDocumentTextRemoveParams,
  options?: { [key: string]: any }
) {
  const { textIds: param0, ...queryParams } = params;
  return request<API.RVoid>(`/ai/kbDocumentText/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出知识库文档解析文本表列表 导出知识库文档解析文本表列表 POST /ai/kbDocumentText/export */
export async function kbDocumentTextExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbDocumentTextExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/ai/kbDocumentText/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询知识库文档解析文本表列表 查询知识库文档解析文本表列表 GET /ai/kbDocumentText/list */
export async function kbDocumentTextList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbDocumentTextListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoKbDocumentTextVo>("/ai/kbDocumentText/list", {
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
