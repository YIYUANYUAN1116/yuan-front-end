// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改wfcc 修改wfcc PUT /workflow/wfCc */
export async function wfCcEdit(
  body: API.WfCcBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/workflow/wfCc", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增wfcc 新增wfcc POST /workflow/wfCc */
export async function wfCcAdd(
  body: API.WfCcBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/workflow/wfCc", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取wfcc详细信息 获取wfcc详细信息 GET /workflow/wfCc/${param0} */
export async function wfCcGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WfCcGetInfoParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RWfCcVo>(`/workflow/wfCc/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除wfcc 删除wfcc DELETE /workflow/wfCc/${param0} */
export async function wfCcRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WfCcRemoveParams,
  options?: { [key: string]: any }
) {
  const { ids: param0, ...queryParams } = params;
  return request<API.RVoid>(`/workflow/wfCc/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出wfcc列表 导出wfcc列表 POST /workflow/wfCc/export */
export async function wfCcExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WfCcExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/workflow/wfCc/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询wfcc列表 查询wfcc列表 GET /workflow/wfCc/list */
export async function wfCcList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WfCcListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoWfCcVo>("/workflow/wfCc/list", {
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
