// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改部门 修改部门 PUT /system/sysDept */
export async function sysDeptEdit(
  body: API.SysDeptBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/sysDept", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增部门 新增部门 POST /system/sysDept */
export async function sysDeptAdd(
  body: API.SysDeptBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/sysDept", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出部门列表 获取部门详细信息 GET /system/sysDept/${param0} */
export async function sysDeptGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysDeptGetInfoParams,
  options?: { [key: string]: any }
) {
  const { deptId: param0, ...queryParams } = params;
  return request<API.RSysDeptVo>(`/system/sysDept/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除部门 删除部门 DELETE /system/sysDept/${param0} */
export async function sysDeptRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysDeptRemoveParams,
  options?: { [key: string]: any }
) {
  const { deptIds: param0, ...queryParams } = params;
  return request<API.RVoid>(`/system/sysDept/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出部门列表 导出部门列表 POST /system/sysDept/export */
export async function sysDeptExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysDeptExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/system/sysDept/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询部门列表 查询部门列表 GET /system/sysDept/list */
export async function sysDeptList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysDeptListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoSysDeptVo>("/system/sysDept/list", {
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

/** 查询树型菜单列表 查询树型菜单列表 GET /system/sysDept/listTree */
export async function sysDeptListTree(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysDeptListTreeParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoSysDeptVo>("/system/sysDept/listTree", {
    method: "GET",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 获取菜单下拉树列表 获取菜单下拉树列表 GET /system/sysDept/treeselect */
export async function sysDeptTreeselect(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysDeptTreeselectParams,
  options?: { [key: string]: any }
) {
  return request<API.RTreeSelectVo>("/system/sysDept/treeselect", {
    method: "GET",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}
