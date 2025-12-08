// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 此处后端没有提供注释 PUT /system/sysUser */
export async function edit(
  body: API.SysUserBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/sysUser", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /system/sysUser */
export async function add(
  body: API.SysUserBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/sysUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /system/sysUser/${param0} */
export async function getInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInfoParams,
  options?: { [key: string]: any }
) {
  const { userId: param0, ...queryParams } = params;
  return request<API.RSysUserInfoVo>(`/system/sysUser/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /system/sysUser/${param0} */
export async function remove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.removeParams,
  options?: { [key: string]: any }
) {
  const { userIds: param0, ...queryParams } = params;
  return request<API.RVoid>(`/system/sysUser/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /system/sysUser/authRole */
export async function insertAuthRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.insertAuthRoleParams,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/sysUser/authRole", {
    method: "PUT",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /system/sysUser/export */
export async function exportUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.exportUsingPOSTParams,
  options?: { [key: string]: any }
) {
  return request<any>("/system/sysUser/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /system/sysUser/getInfo */
export async function getCurrentInfo(options?: { [key: string]: any }) {
  return request<API.RUserInfoVo>("/system/sysUser/getInfo", {
    method: "GET",
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /system/sysUser/list */
export async function list(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoSysUserVo>("/system/sysUser/list", {
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
