// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改sys_role_post 修改sys_role_post PUT /system/sysRolePost */
export async function sysRolePostEdit(
  body: API.SysRolePostBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/sysRolePost", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增sys_role_post 新增sys_role_post POST /system/sysRolePost */
export async function sysRolePostAdd(
  body: API.SysRolePostBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/sysRolePost", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取sys_role_post详细信息 获取sys_role_post详细信息 GET /system/sysRolePost/${param0} */
export async function sysRolePostGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SysRolePostGetInfoParams,
  options?: { [key: string]: any }
) {
  const { roleId: param0, ...queryParams } = params;
  return request<API.RSysRolePostVo>(`/system/sysRolePost/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除sys_role_post 删除sys_role_post DELETE /system/sysRolePost/${param0} */
export async function sysRolePostRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SysRolePostRemoveParams,
  options?: { [key: string]: any }
) {
  const { roleIds: param0, ...queryParams } = params;
  return request<API.RVoid>(`/system/sysRolePost/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出sys_role_post列表 导出sys_role_post列表 POST /system/sysRolePost/export */
export async function sysRolePostExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SysRolePostExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/system/sysRolePost/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询sys_role_post列表 查询sys_role_post列表 GET /system/sysRolePost/list */
export async function sysRolePostList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SysRolePostListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoSysRolePostVo>("/system/sysRolePost/list", {
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
