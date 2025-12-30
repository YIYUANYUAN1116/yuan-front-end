// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改wfn 修改wfn PUT /workflow/wfNodeInstance */
export async function wfNodeInstanceEdit(
  body: API.WfNodeInstanceBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/workflow/wfNodeInstance", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增wfn 新增wfn POST /workflow/wfNodeInstance */
export async function wfNodeInstanceAdd(
  body: API.WfNodeInstanceBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/workflow/wfNodeInstance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取wfn详细信息 获取wfn详细信息 GET /workflow/wfNodeInstance/${param0} */
export async function wfNodeInstanceGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WfNodeInstanceGetInfoParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RWfNodeInstanceVo>(`/workflow/wfNodeInstance/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除wfn 删除wfn DELETE /workflow/wfNodeInstance/${param0} */
export async function wfNodeInstanceRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WfNodeInstanceRemoveParams,
  options?: { [key: string]: any }
) {
  const { ids: param0, ...queryParams } = params;
  return request<API.RVoid>(`/workflow/wfNodeInstance/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出wfn列表 导出wfn列表 POST /workflow/wfNodeInstance/export */
export async function wfNodeInstanceExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WfNodeInstanceExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/workflow/wfNodeInstance/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询wfn列表 查询wfn列表 GET /workflow/wfNodeInstance/list */
export async function wfNodeInstanceList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WfNodeInstanceListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoWfNodeInstanceVo>(
    "/workflow/wfNodeInstance/list",
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
