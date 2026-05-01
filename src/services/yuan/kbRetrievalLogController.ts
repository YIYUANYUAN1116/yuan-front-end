// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改知识库检索日志表 修改知识库检索日志表 PUT /ai/kbRetrievalLog */
export async function kbRetrievalLogEdit(
  body: API.KbRetrievalLogBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/kbRetrievalLog", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增知识库检索日志表 新增知识库检索日志表 POST /ai/kbRetrievalLog */
export async function kbRetrievalLogAdd(
  body: API.KbRetrievalLogBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/kbRetrievalLog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取知识库检索日志表详细信息 获取知识库检索日志表详细信息 GET /ai/kbRetrievalLog/${param0} */
export async function kbRetrievalLogGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbRetrievalLogGetInfoParams,
  options?: { [key: string]: any }
) {
  const { logId: param0, ...queryParams } = params;
  return request<API.RKbRetrievalLogVo>(`/ai/kbRetrievalLog/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除知识库检索日志表 删除知识库检索日志表 DELETE /ai/kbRetrievalLog/${param0} */
export async function kbRetrievalLogRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbRetrievalLogRemoveParams,
  options?: { [key: string]: any }
) {
  const { logIds: param0, ...queryParams } = params;
  return request<API.RVoid>(`/ai/kbRetrievalLog/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出知识库检索日志表列表 导出知识库检索日志表列表 POST /ai/kbRetrievalLog/export */
export async function kbRetrievalLogExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbRetrievalLogExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/ai/kbRetrievalLog/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询知识库检索日志表列表 查询知识库检索日志表列表 GET /ai/kbRetrievalLog/list */
export async function kbRetrievalLogList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbRetrievalLogListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoKbRetrievalLogVo>("/ai/kbRetrievalLog/list", {
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
