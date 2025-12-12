// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改部门角色 PUT /system/sysRoleDept */
export async function sysRoleDeptEdit(
  body: API.SysRoleDeptBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/sysRoleDept", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增部门角色 POST /system/sysRoleDept */
export async function sysRoleDeptAdd(
  body: API.SysRoleDeptBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/sysRoleDept", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取部门角色详细信息 GET /system/sysRoleDept/${param0} */
export async function sysRoleDeptGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysRoleDeptGetInfoParams,
  options?: { [key: string]: any }
) {
  const { deptId: param0, ...queryParams } = params;
  return request<API.RSysRoleDeptVo>(`/system/sysRoleDept/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除部门角色 DELETE /system/sysRoleDept/${param0} */
export async function sysRoleDeptRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysRoleDeptRemoveParams,
  options?: { [key: string]: any }
) {
  const { deptIds: param0, ...queryParams } = params;
  return request<API.RVoid>(`/system/sysRoleDept/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出部门角色列表 POST /system/sysRoleDept/export */
export async function sysRoleDeptExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysRoleDeptExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/system/sysRoleDept/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询部门角色列表 GET /system/sysRoleDept/list */
export async function sysRoleDeptList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysRoleDeptListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoSysRoleDeptVo>("/system/sysRoleDept/list", {
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
