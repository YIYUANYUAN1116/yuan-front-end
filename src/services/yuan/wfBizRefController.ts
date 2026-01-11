// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改wfref 修改wfref PUT /workflow/wfBizRef */
export async function wfBizRefEdit(
  body: API.WfBizRefBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/workflow/wfBizRef", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增wfref 新增wfref POST /workflow/wfBizRef */
export async function wfBizRefAdd(
  body: API.WfBizRefBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/workflow/wfBizRef", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取wfref详细信息 获取wfref详细信息 GET /workflow/wfBizRef/${param0} */
export async function wfBizRefGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WfBizRefGetInfoParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RWfBizRefVo>(`/workflow/wfBizRef/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除wfref 删除wfref DELETE /workflow/wfBizRef/${param0} */
export async function wfBizRefRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WfBizRefRemoveParams,
  options?: { [key: string]: any }
) {
  const { ids: param0, ...queryParams } = params;
  return request<API.RVoid>(`/workflow/wfBizRef/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出wfref列表 导出wfref列表 POST /workflow/wfBizRef/export */
export async function wfBizRefExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WfBizRefExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/workflow/wfBizRef/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询wfref列表 查询wfref列表 GET /workflow/wfBizRef/list */
export async function wfBizRefList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WfBizRefListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoWfBizRefVo>("/workflow/wfBizRef/list", {
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
