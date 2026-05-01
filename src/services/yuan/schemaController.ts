// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改数据模型 修改数据模型 PUT /dev/schema */
export async function schemaEdit(
  body: API.SchemaBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/dev/schema", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增数据模型 新增数据模型 POST /dev/schema */
export async function schemaAdd(
  body: API.SchemaBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/dev/schema", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取数据模型详细信息 获取数据模型详细信息 GET /dev/schema/${param0} */
export async function schemaGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.schemaGetInfoParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RSchemaVo>(`/dev/schema/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除数据模型 删除数据模型 DELETE /dev/schema/${param0} */
export async function schemaRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.schemaRemoveParams,
  options?: { [key: string]: any }
) {
  const { ids: param0, ...queryParams } = params;
  return request<API.RVoid>(`/dev/schema/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询数据源表名 查询数据源表名 GET /dev/schema/getDataNames */
export async function schemaGetCurrentDataSourceTableNameList(options?: {
  [key: string]: any;
}) {
  return request<API.RObject>("/dev/schema/getDataNames", {
    method: "GET",
    ...(options || {}),
  });
}

/** 查询数据模型列表 查询数据模型列表 GET /dev/schema/list */
export async function schemaList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.schemaListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoSchemaVo>("/dev/schema/list", {
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
