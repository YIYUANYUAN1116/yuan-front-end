// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改保存字典类型 PUT /system/dict/data */
export async function dictEdit(
  body: API.SysDictDataBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/dict/data", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增字典类型 POST /system/dict/data */
export async function dictAdd(
  body: API.SysDictDataBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/dict/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询字典数据列表 GET /system/dict/data/${param0} */
export async function dictGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.dictGetInfoParams,
  options?: { [key: string]: any }
) {
  const { dictCode: param0, ...queryParams } = params;
  return request<API.RSysDictDataVo>(`/system/dict/data/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除字典类型 DELETE /system/dict/data/${param0} */
export async function dictRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.dictRemoveParams,
  options?: { [key: string]: any }
) {
  const { dictCodes: param0, ...queryParams } = params;
  return request<API.RVoid>(`/system/dict/data/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询字典数据列表 POST /system/dict/data/export */
export async function dictExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.dictExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/system/dict/data/export", {
    method: "POST",
    params: {
      ...params,
      dictData: undefined,
      ...params["dictData"],
    },
    ...(options || {}),
  });
}

/** 查询字典数据列表 GET /system/dict/data/list */
export async function dictList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.dictListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoSysDictDataVo>("/system/dict/data/list", {
    method: "GET",
    params: {
      ...params,
      dictData: undefined,
      ...params["dictData"],
      pageQuery: undefined,
      ...params["pageQuery"],
    },
    ...(options || {}),
  });
}

/** 根据字典类型查询字典数据信息 GET /system/dict/data/type/${param0} */
export async function dictDictType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.dictDictTypeParams,
  options?: { [key: string]: any }
) {
  const { dictType: param0, ...queryParams } = params;
  return request<API.RListSysDictDataVo>(`/system/dict/data/type/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}
