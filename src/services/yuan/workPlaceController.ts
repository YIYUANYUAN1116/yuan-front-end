// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 我的申请 GET /workplace/my-apply */
export async function workPlaceMyApply(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.workPlaceMyApplyParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoWorkItemRowVO>("/workplace/my-apply", {
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

/** 我的已办 GET /workplace/my-approval */
export async function workPlaceApprovals(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.workPlaceApprovalsParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoWorkItemRowVO>("/workplace/my-approval", {
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

/** 我的代办 GET /workplace/my-task */
export async function workPlaceMyTask(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.workPlaceMyTaskParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoWorkItemRowVO>("/workplace/my-task", {
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
