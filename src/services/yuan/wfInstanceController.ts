// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改wfi 修改wfi PUT /workflow/wfInstance */
export async function wfInstanceEdit(
  body: API.WfInstanceBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/workflow/wfInstance", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增wfi 新增wfi POST /workflow/wfInstance */
export async function wfInstanceAdd(
  body: API.WfInstanceBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/workflow/wfInstance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取wfi详细信息 获取wfi详细信息 GET /workflow/wfInstance/${param0} */
export async function wfInstanceGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WfInstanceGetInfoParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RWfInstanceVo>(`/workflow/wfInstance/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除wfi 删除wfi DELETE /workflow/wfInstance/${param0} */
export async function wfInstanceRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WfInstanceRemoveParams,
  options?: { [key: string]: any }
) {
  const { ids: param0, ...queryParams } = params;
  return request<API.RVoid>(`/workflow/wfInstance/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改流程定义状态 GET /workflow/wfInstance/detail/${param0} */
export async function wfInstanceDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WfInstanceDetailParams,
  options?: { [key: string]: any }
) {
  const { bizNo: param0, ...queryParams } = params;
  return request<API.RWfApprovalDetailVO>(
    `/workflow/wfInstance/detail/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 导出wfi列表 导出wfi列表 POST /workflow/wfInstance/export */
export async function wfInstanceExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WfInstanceExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/workflow/wfInstance/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询wfi列表 查询wfi列表 GET /workflow/wfInstance/list */
export async function wfInstanceList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WfInstanceListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoWfInstanceVo>("/workflow/wfInstance/list", {
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

/** 流程发起 POST /workflow/wfInstance/start */
export async function wfInstanceStart(
  body: API.StartCmd,
  options?: { [key: string]: any }
) {
  return request<API.RLong>("/workflow/wfInstance/start", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
