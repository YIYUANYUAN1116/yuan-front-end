// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改岗位 修改post PUT /system/sysPost */
export async function sysPostEdit(
  body: API.SysPostBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/sysPost", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增岗位 新增post POST /system/sysPost */
export async function sysPostAdd(
  body: API.SysPostBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/sysPost", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取岗位详细信息 获取post详细信息 GET /system/sysPost/${param0} */
export async function sysPostGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SysPostGetInfoParams,
  options?: { [key: string]: any }
) {
  const { postId: param0, ...queryParams } = params;
  return request<API.RSysPostVo>(`/system/sysPost/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除岗位 删除post DELETE /system/sysPost/${param0} */
export async function sysPostRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SysPostRemoveParams,
  options?: { [key: string]: any }
) {
  const { postIds: param0, ...queryParams } = params;
  return request<API.RVoid>(`/system/sysPost/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取岗位已分配用户列表 查询已分配用户岗位列表 GET /system/sysPost/allocatedList */
export async function postAllocatedUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postAllocatedUserListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoSysUserVo>("/system/sysPost/allocatedList", {
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

/** 批量取消授权用户 批量取消授权用户 PUT /system/sysPost/cancelAll */
export async function postCancelUserAll(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postCancelUserAllParams,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/sysPost/cancelAll", {
    method: "PUT",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导出岗位列表 导出岗位列表 POST /system/sysPost/export */
export async function sysPostExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SysPostExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/system/sysPost/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询岗位列表 查询岗位列表 GET /system/sysPost/list */
export async function sysPostList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SysPostListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoSysPostVo>("/system/sysPost/list", {
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

/** 批量选择用户授权 批量选择用户授权 PUT /system/sysPost/selectAll */
export async function postSelectUserAll(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postSelectUserAllParams,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/sysPost/selectAll", {
    method: "PUT",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取岗位未分配用户列表 查询未分配用户岗位列表 GET /system/sysPost/unallocatedList */
export async function postUnallocatedUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postUnallocatedUserListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoSysUserVo>(
    "/system/sysPost/unallocatedList",
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
