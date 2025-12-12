// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改角色菜单 PUT /system/sysRoleMenu */
export async function sysRoleMenuEdit(
  body: API.SysRoleMenuBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/sysRoleMenu", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增角色菜单 POST /system/sysRoleMenu */
export async function sysRoleMenuAdd(
  body: API.SysRoleMenuBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/sysRoleMenu", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取角色菜单详细信息 GET /system/sysRoleMenu/${param0} */
export async function sysRoleMenuGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysRoleMenuGetInfoParams,
  options?: { [key: string]: any }
) {
  const { menuId: param0, ...queryParams } = params;
  return request<API.RSysRoleMenuVo>(`/system/sysRoleMenu/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除角色菜单 DELETE /system/sysRoleMenu/${param0} */
export async function sysRoleMenuRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysRoleMenuRemoveParams,
  options?: { [key: string]: any }
) {
  const { menuIds: param0, ...queryParams } = params;
  return request<API.RVoid>(`/system/sysRoleMenu/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出角色菜单列表 POST /system/sysRoleMenu/export */
export async function sysRoleMenuExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysRoleMenuExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/system/sysRoleMenu/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询角色菜单列表 GET /system/sysRoleMenu/list */
export async function sysRoleMenuList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysRoleMenuListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoSysRoleMenuVo>("/system/sysRoleMenu/list", {
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
