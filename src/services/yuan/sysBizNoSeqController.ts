// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改业务序列表 修改业务序列表 PUT /system/sysBizNoSeq */
export async function sysBizNoSeqEdit(
  body: API.SysBizNoSeqBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/sysBizNoSeq", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增业务序列表 新增业务序列表 POST /system/sysBizNoSeq */
export async function sysBizNoSeqAdd(
  body: API.SysBizNoSeqBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/sysBizNoSeq", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取业务序列表详细信息 获取业务序列表详细信息 GET /system/sysBizNoSeq/${param0} */
export async function sysBizNoSeqGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SysBizNoSeqGetInfoParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RSysBizNoSeqVo>(`/system/sysBizNoSeq/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除业务序列表 删除业务序列表 DELETE /system/sysBizNoSeq/${param0} */
export async function sysBizNoSeqRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SysBizNoSeqRemoveParams,
  options?: { [key: string]: any }
) {
  const { ids: param0, ...queryParams } = params;
  return request<API.RVoid>(`/system/sysBizNoSeq/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出业务序列表列表 导出业务序列表列表 POST /system/sysBizNoSeq/export */
export async function sysBizNoSeqExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SysBizNoSeqExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/system/sysBizNoSeq/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询业务序列表列表 查询业务序列表列表 GET /system/sysBizNoSeq/list */
export async function sysBizNoSeqList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SysBizNoSeqListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoSysBizNoSeqVo>("/system/sysBizNoSeq/list", {
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
