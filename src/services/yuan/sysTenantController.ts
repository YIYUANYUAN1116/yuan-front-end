// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改多租户 PUT /system/sysTenant */
export async function sysTenantEdit(
  body: API.SysTenantBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/sysTenant", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增多租户 POST /system/sysTenant */
export async function sysTenantAdd(
  body: API.SysTenantBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/sysTenant", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取多租户详细信息 GET /system/sysTenant/${param0} */
export async function sysTenantGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysTenantGetInfoParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RSysTenantVo>(`/system/sysTenant/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除多租户 DELETE /system/sysTenant/${param0} */
export async function sysTenantRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysTenantRemoveParams,
  options?: { [key: string]: any }
) {
  const { ids: param0, ...queryParams } = params;
  return request<API.RVoid>(`/system/sysTenant/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出多租户列表 POST /system/sysTenant/export */
export async function sysTenantExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysTenantExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/system/sysTenant/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询多租户列表 GET /system/sysTenant/list */
export async function sysTenantList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sysTenantListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoSysTenantVo>("/system/sysTenant/list", {
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
