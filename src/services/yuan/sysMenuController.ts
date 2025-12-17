// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改菜单 PUT /system/sysMenu */
export async function sysMenuEdit(
  body: API.SysMenuBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/sysMenu", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增菜单 POST /system/sysMenu */
export async function sysMenuAdd(
  body: API.SysMenuBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/sysMenu", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取菜单详细信息 GET /system/sysMenu/${param0} */
export async function sysMenuGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysMenuGetInfoParams,
  options?: { [key: string]: any }
) {
  const { menuId: param0, ...queryParams } = params;
  return request<API.RSysMenuVo>(`/system/sysMenu/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除菜单 DELETE /system/sysMenu/${param0} */
export async function sysMenuRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysMenuRemoveParams,
  options?: { [key: string]: any }
) {
  const { menuIds: param0, ...queryParams } = params;
  return request<API.RVoid>(`/system/sysMenu/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出菜单列表 POST /system/sysMenu/export */
export async function sysMenuExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysMenuExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/system/sysMenu/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询菜单列表 GET /system/sysMenu/list */
export async function sysMenuList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysMenuListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoSysMenuVo>("/system/sysMenu/list", {
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

/** 查询树型菜单列表 GET /system/sysMenu/listTree */
export async function sysMenuListTree(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysMenuListTreeParams,
  options?: { [key: string]: any }
) {
  return request<API.RListSysMenuVo>("/system/sysMenu/listTree", {
    method: "GET",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 获取角色菜单树 GET /system/sysMenu/roleMenuTreeselect/${param0} */
export async function sysMenuRoleMenuTreeselect(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysMenuRoleMenuTreeselectParams,
  options?: { [key: string]: any }
) {
  const { roleId: param0, ...queryParams } = params;
  return request<API.RMenuTreeSelectVo>(
    `/system/sysMenu/roleMenuTreeselect/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 获取菜单下拉树列表 GET /system/sysMenu/treeselect */
export async function sysMenuTreeselect(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysMenuTreeselectParams,
  options?: { [key: string]: any }
) {
  return request<API.RMenuTreeSelectVo>("/system/sysMenu/treeselect", {
    method: "GET",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}
