// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改post-user 修改post-user PUT /system/sysUserPost */
export async function sysUserPostEdit(
  body: API.SysUserPostBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/sysUserPost", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增post-user 新增post-user POST /system/sysUserPost */
export async function sysUserPostAdd(
  body: API.SysUserPostBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/sysUserPost", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取post-user详细信息 获取post-user详细信息 GET /system/sysUserPost/${param0} */
export async function sysUserPostGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SysUserPostGetInfoParams,
  options?: { [key: string]: any }
) {
  const { postId: param0, ...queryParams } = params;
  return request<API.RSysUserPostVo>(`/system/sysUserPost/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除post-user 删除post-user DELETE /system/sysUserPost/${param0} */
export async function sysUserPostRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SysUserPostRemoveParams,
  options?: { [key: string]: any }
) {
  const { postIds: param0, ...queryParams } = params;
  return request<API.RVoid>(`/system/sysUserPost/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出post-user列表 导出post-user列表 POST /system/sysUserPost/export */
export async function sysUserPostExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SysUserPostExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/system/sysUserPost/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询post-user列表 查询post-user列表 GET /system/sysUserPost/list */
export async function sysUserPostList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SysUserPostListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoSysUserPostVo>("/system/sysUserPost/list", {
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
