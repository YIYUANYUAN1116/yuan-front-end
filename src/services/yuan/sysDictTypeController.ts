// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改字典类型 修改字典类型 PUT /system/dict/type */
export async function dictTypeEdit(
  body: API.SysDictTypeBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/dict/type", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增字典类型 新增字典类型 POST /system/dict/type */
export async function dictTypeAdd(
  body: API.SysDictTypeBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/dict/type", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询字典类型详细 查询字典类型详细 GET /system/dict/type/${param0} */
export async function dictTypeGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.dictTypeGetInfoParams,
  options?: { [key: string]: any }
) {
  const { dictId: param0, ...queryParams } = params;
  return request<API.RSysDictTypeVo>(`/system/dict/type/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除字典类型 删除字典类型 DELETE /system/dict/type/${param0} */
export async function dictTypeRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.dictTypeRemoveParams,
  options?: { [key: string]: any }
) {
  const { dictIds: param0, ...queryParams } = params;
  return request<API.RVoid>(`/system/dict/type/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询所有字典类型列表 查询所有字典类型列表 GET /system/dict/type/all */
export async function dictTypeAll(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.dictTypeAllParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoSysDictTypeVo>("/system/dict/type/all", {
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

/** 导出字典类型列表 导出字典类型列表 POST /system/dict/type/export */
export async function dictTypeExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.dictTypeExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/system/dict/type/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询字典类型列表 查询字典类型列表 GET /system/dict/type/list */
export async function dictTypeList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.dictTypeListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoSysDictTypeVo>("/system/dict/type/list", {
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

/** 获取字典选择框列表 获取字典选择框列表 GET /system/dict/type/optionselect */
export async function dictTypeOptionselect(options?: { [key: string]: any }) {
  return request<API.RListSysDictTypeVo>("/system/dict/type/optionselect", {
    method: "GET",
    ...(options || {}),
  });
}

/** 刷新字典缓存 刷新字典缓存 DELETE /system/dict/type/refreshCache */
export async function dictTypeRefreshCache(options?: { [key: string]: any }) {
  return request<API.RVoid>("/system/dict/type/refreshCache", {
    method: "DELETE",
    ...(options || {}),
  });
}
