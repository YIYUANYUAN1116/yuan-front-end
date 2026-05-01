// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改知识库授权表 修改知识库授权表 PUT /ai/kbBaseAuth */
export async function kbBaseAuthEdit(
  body: API.KbBaseAuthBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/kbBaseAuth", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增知识库授权表 新增知识库授权表 POST /ai/kbBaseAuth */
export async function kbBaseAuthAdd(
  body: API.KbBaseAuthBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/kbBaseAuth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取知识库授权表详细信息 获取知识库授权表详细信息 GET /ai/kbBaseAuth/${param0} */
export async function kbBaseAuthGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbBaseAuthGetInfoParams,
  options?: { [key: string]: any }
) {
  const { authId: param0, ...queryParams } = params;
  return request<API.RKbBaseAuthVo>(`/ai/kbBaseAuth/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除知识库授权表 删除知识库授权表 DELETE /ai/kbBaseAuth/${param0} */
export async function kbBaseAuthRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbBaseAuthRemoveParams,
  options?: { [key: string]: any }
) {
  const { authIds: param0, ...queryParams } = params;
  return request<API.RVoid>(`/ai/kbBaseAuth/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出知识库授权表列表 导出知识库授权表列表 POST /ai/kbBaseAuth/export */
export async function kbBaseAuthExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbBaseAuthExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/ai/kbBaseAuth/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询知识库授权表列表 查询知识库授权表列表 GET /ai/kbBaseAuth/list */
export async function kbBaseAuthList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbBaseAuthListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoKbBaseAuthVo>("/ai/kbBaseAuth/list", {
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
