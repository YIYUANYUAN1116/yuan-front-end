// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改用户 修改用户 PUT /system/sysUser */
export async function sysUserEdit(
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

/** 新增用户 新增用户 POST /system/sysUser */
export async function sysUserAdd(
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

/** 获取用户详细信息 获取用户详细信息 GET /system/sysUser/${param0} */
export async function sysUserGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysUserGetInfoParams,
  options?: { [key: string]: any }
) {
  const { userId: param0, ...queryParams } = params;
  return request<API.RSysUserInfoVo>(`/system/sysUser/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除用户 删除用户 DELETE /system/sysUser/${param0} */
export async function sysUserRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysUserRemoveParams,
  options?: { [key: string]: any }
) {
  const { userIds: param0, ...queryParams } = params;
  return request<API.RVoid>(`/system/sysUser/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 用户授权角色 用户授权角色 PUT /system/sysUser/authRole */
export async function sysUserInsertAuthRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysUserInsertAuthRoleParams,
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

/** 根据用户编号获取授权角色 根据用户编号获取授权角色 GET /system/sysUser/authRole/${param0} */
export async function sysUserGetAuthRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysUserGetAuthRoleParams,
  options?: { [key: string]: any }
) {
  const { userId: param0, ...queryParams } = params;
  return request<API.RSysUserInfoVo>(`/system/sysUser/authRole/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出用户列表 导出用户列表 POST /system/sysUser/export */
export async function sysUserExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysUserExportParams,
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

/** 获取用户详细信息 获取用户详细信息 GET /system/sysUser/getInfo */
export async function sysUserGetCurrentInfo(options?: { [key: string]: any }) {
  return request<API.RUserInfoVo>("/system/sysUser/getInfo", {
    method: "GET",
    ...(options || {}),
  });
}

/** 查询用户列表 查询用户列表 GET /system/sysUser/list */
export async function sysUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysUserListParams,
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
