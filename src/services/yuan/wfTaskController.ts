// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改wft 修改wft PUT /workflow/wfTask */
export async function wfTaskEdit(
  body: API.WfTaskBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/workflow/wfTask", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增wft 新增wft POST /workflow/wfTask */
export async function wfTaskAdd(
  body: API.WfTaskBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/workflow/wfTask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取wft详细信息 获取wft详细信息 GET /workflow/wfTask/${param0} */
export async function wfTaskGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WfTaskGetInfoParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RWfTaskVo>(`/workflow/wfTask/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除wft 删除wft DELETE /workflow/wfTask/${param0} */
export async function wfTaskRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WfTaskRemoveParams,
  options?: { [key: string]: any }
) {
  const { ids: param0, ...queryParams } = params;
  return request<API.RVoid>(`/workflow/wfTask/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出wft列表 导出wft列表 POST /workflow/wfTask/export */
export async function wfTaskExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WfTaskExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/workflow/wfTask/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询wft列表 查询wft列表 GET /workflow/wfTask/list */
export async function wfTaskList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WfTaskListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoWfTaskVo>("/workflow/wfTask/list", {
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
