// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改知识库检索命中明细表 修改知识库检索命中明细表 PUT /ai/kbRetrievalHit */
export async function kbRetrievalHitEdit(
  body: API.KbRetrievalHitBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/kbRetrievalHit", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增知识库检索命中明细表 新增知识库检索命中明细表 POST /ai/kbRetrievalHit */
export async function kbRetrievalHitAdd(
  body: API.KbRetrievalHitBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/kbRetrievalHit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取知识库检索命中明细表详细信息 获取知识库检索命中明细表详细信息 GET /ai/kbRetrievalHit/${param0} */
export async function kbRetrievalHitGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbRetrievalHitGetInfoParams,
  options?: { [key: string]: any }
) {
  const { hitId: param0, ...queryParams } = params;
  return request<API.RKbRetrievalHitVo>(`/ai/kbRetrievalHit/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除知识库检索命中明细表 删除知识库检索命中明细表 DELETE /ai/kbRetrievalHit/${param0} */
export async function kbRetrievalHitRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbRetrievalHitRemoveParams,
  options?: { [key: string]: any }
) {
  const { hitIds: param0, ...queryParams } = params;
  return request<API.RVoid>(`/ai/kbRetrievalHit/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出知识库检索命中明细表列表 导出知识库检索命中明细表列表 POST /ai/kbRetrievalHit/export */
export async function kbRetrievalHitExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbRetrievalHitExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/ai/kbRetrievalHit/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询知识库检索命中明细表列表 查询知识库检索命中明细表列表 GET /ai/kbRetrievalHit/list */
export async function kbRetrievalHitList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbRetrievalHitListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoKbRetrievalHitVo>("/ai/kbRetrievalHit/list", {
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
