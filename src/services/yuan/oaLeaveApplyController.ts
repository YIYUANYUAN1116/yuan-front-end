// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改请假申请 修改请假申请 PUT /oa/leave */
export async function oaLeaveApplyEdit(
  body: API.OaLeaveApplyBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/oa/leave", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增请假申请 新增请假申请 POST /oa/leave */
export async function oaLeaveApplyAdd(
  body: API.OaLeaveApplyBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/oa/leave", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取请假申请详细信息 获取请假申请详细信息 GET /oa/leave/${param0} */
export async function oaLeaveApplyGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.OaLeaveApplyGetInfoParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ROaLeaveApplyVo>(`/oa/leave/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除请假申请 删除请假申请 DELETE /oa/leave/${param0} */
export async function oaLeaveApplyRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.OaLeaveApplyRemoveParams,
  options?: { [key: string]: any }
) {
  const { ids: param0, ...queryParams } = params;
  return request<API.RVoid>(`/oa/leave/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取请假申请详细信息 获取请假申请详细信息 GET /oa/leave/bizNo/${param0} */
export async function oaLeaveApplyGetInfoByBizNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.OaLeaveApplyGetInfoByBizNoParams,
  options?: { [key: string]: any }
) {
  const { bizNo: param0, ...queryParams } = params;
  return request<API.ROaLeaveApplyVo>(`/oa/leave/bizNo/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出请假申请列表 导出请假申请列表 POST /oa/leave/export */
export async function oaLeaveApplyExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.OaLeaveApplyExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/oa/leave/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询请假申请列表 查询请假申请列表 GET /oa/leave/list */
export async function oaLeaveApplyList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.OaLeaveApplyListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoOaLeaveApplyVo>("/oa/leave/list", {
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

/** 发起请假申请 GET /oa/leave/submit */
export async function oaLeaveApplySubmit(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.OaLeaveApplySubmitParams,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/oa/leave/submit", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
