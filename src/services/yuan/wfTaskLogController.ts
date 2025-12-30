// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改wftl 修改wftl PUT /workflow/wfTaskLog */
export async function wfTaskLogEdit(
  body: API.WfTaskLogBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/workflow/wfTaskLog", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增wftl 新增wftl POST /workflow/wfTaskLog */
export async function wfTaskLogAdd(
  body: API.WfTaskLogBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/workflow/wfTaskLog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取wftl详细信息 获取wftl详细信息 GET /workflow/wfTaskLog/${param0} */
export async function wfTaskLogGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WfTaskLogGetInfoParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RWfTaskLogVo>(`/workflow/wfTaskLog/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除wftl 删除wftl DELETE /workflow/wfTaskLog/${param0} */
export async function wfTaskLogRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WfTaskLogRemoveParams,
  options?: { [key: string]: any }
) {
  const { ids: param0, ...queryParams } = params;
  return request<API.RVoid>(`/workflow/wfTaskLog/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出wftl列表 导出wftl列表 POST /workflow/wfTaskLog/export */
export async function wfTaskLogExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WfTaskLogExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/workflow/wfTaskLog/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询wftl列表 查询wftl列表 GET /workflow/wfTaskLog/list */
export async function wfTaskLogList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WfTaskLogListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoWfTaskLogVo>("/workflow/wfTaskLog/list", {
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
