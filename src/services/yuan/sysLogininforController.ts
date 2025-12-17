// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改loginlog PUT /system/sysLogininfor */
export async function sysLogininforEdit(
  body: API.SysLogininforBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/sysLogininfor", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增loginlog POST /system/sysLogininfor */
export async function sysLogininforAdd(
  body: API.SysLogininforBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/sysLogininfor", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取loginlog详细信息 GET /system/sysLogininfor/${param0} */
export async function sysLogininforGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SysLogininforGetInfoParams,
  options?: { [key: string]: any }
) {
  const { infoId: param0, ...queryParams } = params;
  return request<API.RSysLogininforVo>(`/system/sysLogininfor/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除loginlog DELETE /system/sysLogininfor/${param0} */
export async function sysLogininforRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SysLogininforRemoveParams,
  options?: { [key: string]: any }
) {
  const { infoIds: param0, ...queryParams } = params;
  return request<API.RVoid>(`/system/sysLogininfor/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出loginlog列表 POST /system/sysLogininfor/export */
export async function sysLogininforExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SysLogininforExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/system/sysLogininfor/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询loginlog列表 GET /system/sysLogininfor/list */
export async function sysLogininforList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SysLogininforListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoSysLogininforVo>(
    "/system/sysLogininfor/list",
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
