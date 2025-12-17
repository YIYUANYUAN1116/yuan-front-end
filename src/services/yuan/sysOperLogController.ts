// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改oprelog PUT /system/sysOperLog */
export async function sysOperLogEdit(
  body: API.SysOperLogBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/sysOperLog", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增oprelog POST /system/sysOperLog */
export async function sysOperLogAdd(
  body: API.SysOperLogBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/sysOperLog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取oprelog详细信息 GET /system/sysOperLog/${param0} */
export async function sysOperLogGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SysOperLogGetInfoParams,
  options?: { [key: string]: any }
) {
  const { operId: param0, ...queryParams } = params;
  return request<API.RSysOperLogVo>(`/system/sysOperLog/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除oprelog DELETE /system/sysOperLog/${param0} */
export async function sysOperLogRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SysOperLogRemoveParams,
  options?: { [key: string]: any }
) {
  const { operIds: param0, ...queryParams } = params;
  return request<API.RVoid>(`/system/sysOperLog/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出oprelog列表 POST /system/sysOperLog/export */
export async function sysOperLogExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SysOperLogExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/system/sysOperLog/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询oprelog列表 GET /system/sysOperLog/list */
export async function sysOperLogList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SysOperLogListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoSysOperLogVo>("/system/sysOperLog/list", {
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
