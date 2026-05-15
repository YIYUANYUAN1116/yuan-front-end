// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改知识库主表 修改知识库主表 PUT /ai/kbBase */
export async function kbBaseEdit(
  body: API.KbBaseBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/kbBase", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增知识库主表 新增知识库主表 POST /ai/kbBase */
export async function kbBaseAdd(
  body: API.KbBaseBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/kbBase", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取知识库主表详细信息 获取知识库主表详细信息 GET /ai/kbBase/${param0} */
export async function kbBaseGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbBaseGetInfoParams,
  options?: { [key: string]: any }
) {
  const { kbId: param0, ...queryParams } = params;
  return request<API.RKbBaseVo>(`/ai/kbBase/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除知识库主表 删除知识库主表 DELETE /ai/kbBase/${param0} */
export async function kbBaseRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbBaseRemoveParams,
  options?: { [key: string]: any }
) {
  const { kbIds: param0, ...queryParams } = params;
  return request<API.RVoid>(`/ai/kbBase/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Rebuild knowledge base index POST /ai/kbBase/${param0}/rebuildIndex */
export async function kbBaseRebuildIndex(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbBaseRebuildIndexParams,
  options?: { [key: string]: any }
) {
  const { kbId: param0, ...queryParams } = params;
  return request<API.RInteger>(`/ai/kbBase/${param0}/rebuildIndex`, {
    method: "POST",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出知识库主表列表 导出知识库主表列表 POST /ai/kbBase/export */
export async function kbBaseExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbBaseExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/ai/kbBase/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询知识库主表列表 查询知识库主表列表 GET /ai/kbBase/list */
export async function kbBaseList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbBaseListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoKbBaseVo>("/ai/kbBase/list", {
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

/** 知识库下拉选择 GET /ai/kbBase/select */
export async function kbBaseSelect(options?: { [key: string]: any }) {
  return request<API.RListSelectModel>("/ai/kbBase/select", {
    method: "GET",
    ...(options || {}),
  });
}
