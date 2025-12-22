// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改post PUT /system/sysPost */
export async function sysPostEdit(
  body: API.SysPostBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/sysPost", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增post POST /system/sysPost */
export async function sysPostAdd(
  body: API.SysPostBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/sysPost", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取post详细信息 GET /system/sysPost/${param0} */
export async function sysPostGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SysPostGetInfoParams,
  options?: { [key: string]: any }
) {
  const { postId: param0, ...queryParams } = params;
  return request<API.RSysPostVo>(`/system/sysPost/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除post DELETE /system/sysPost/${param0} */
export async function sysPostRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SysPostRemoveParams,
  options?: { [key: string]: any }
) {
  const { postIds: param0, ...queryParams } = params;
  return request<API.RVoid>(`/system/sysPost/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出post列表 POST /system/sysPost/export */
export async function sysPostExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SysPostExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/system/sysPost/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询post列表 GET /system/sysPost/list */
export async function sysPostList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SysPostListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoSysPostVo>("/system/sysPost/list", {
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
