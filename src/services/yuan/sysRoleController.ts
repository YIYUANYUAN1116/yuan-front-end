// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改角色 修改角色 PUT /system/sysRole */
export async function sysRoleEdit(
  body: API.SysRoleBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/sysRole", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增角色 新增角色 POST /system/sysRole */
export async function sysRoleAdd(
  body: API.SysRoleBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/sysRole", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取角色详细信息 获取角色详细信息 GET /system/sysRole/${param0} */
export async function sysRoleGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysRoleGetInfoParams,
  options?: { [key: string]: any }
) {
  const { roleId: param0, ...queryParams } = params;
  return request<API.RSysRoleVo>(`/system/sysRole/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除角色 删除角色 DELETE /system/sysRole/${param0} */
export async function sysRoleRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysRoleRemoveParams,
  options?: { [key: string]: any }
) {
  const { roleIds: param0, ...queryParams } = params;
  return request<API.RVoid>(`/system/sysRole/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取角色已分配用户列表 查询已分配用户角色列表 GET /system/sysRole/allocatedList */
export async function roleAllocatedUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.roleAllocatedUserListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoSysUserVo>("/system/sysRole/allocatedList", {
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

/** 批量取消授权用户 批量取消授权用户 PUT /system/sysRole/cancelAll */
export async function roleCancelUserAll(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.roleCancelUserAllParams,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/sysRole/cancelAll", {
    method: "PUT",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导出角色列表 导出角色列表 POST /system/sysRole/export */
export async function sysRoleExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysRoleExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/system/sysRole/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询角色列表 查询角色列表 GET /system/sysRole/list */
export async function sysRoleList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysRoleListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoSysRoleVo>("/system/sysRole/list", {
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

/** 获取角色选择框列表 获取角色选择框列表 GET /system/sysRole/optionselect */
export async function sysRoleOptionselect(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysRoleOptionselectParams,
  options?: { [key: string]: any }
) {
  return request<API.RSelectRolesVo>("/system/sysRole/optionselect", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 批量选择用户授权 批量选择用户授权 PUT /system/sysRole/selectAll */
export async function roleSelectUserAll(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.roleSelectUserAllParams,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/sysRole/selectAll", {
    method: "PUT",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取角色未分配用户列表 查询未分配用户角色列表 GET /system/sysRole/unallocatedList */
export async function roleUnallocatedUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.roleUnallocatedUserListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoSysUserVo>(
    "/system/sysRole/unallocatedList",
    {
      method: "GET",
      params: {
        ...params,
        bo: undefined,
        ...params["bo"],
        pageQuery: undefined,
        ...params["pageQuery"],
      },
      ...(options || {}),
    }
  );
}
