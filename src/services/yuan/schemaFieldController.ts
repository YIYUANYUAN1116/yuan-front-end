// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改数据模型字段 修改数据模型字段 PUT /dev/schemaField */
export async function schemaFieldEdit(
  body: API.SchemaFieldBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/dev/schemaField", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增数据模型字段 新增数据模型字段 POST /dev/schemaField */
export async function schemaFieldAdd(
  body: API.SchemaFieldBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/dev/schemaField", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取数据模型字段详细信息 获取数据模型字段详细信息 GET /dev/schemaField/${param0} */
export async function schemaFieldGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.schemaFieldGetInfoParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RSchemaFieldVo>(`/dev/schemaField/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除数据模型字段 删除数据模型字段 DELETE /dev/schemaField/${param0} */
export async function schemaFieldRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.schemaFieldRemoveParams,
  options?: { [key: string]: any }
) {
  const { ids: param0, ...queryParams } = params;
  return request<API.RVoid>(`/dev/schemaField/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 同步数据库字段 PUT /dev/schemaField/${param0}/syncUpdate */
export async function schemaFieldSyncUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.schemaFieldSyncUpdateParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RVoid>(`/dev/schemaField/${param0}/syncUpdate`, {
    method: "PUT",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 批量更新字段配置 批量更新字段配置 PUT /dev/schemaField/batchUpdate */
export async function schemaFieldBatchUpdateFieldConfig(
  body: API.SchemaFieldBo[],
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/dev/schemaField/batchUpdate", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询数据模型字段列表 查询数据模型字段列表 GET /dev/schemaField/list */
export async function schemaFieldList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.schemaFieldListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoSchemaFieldVo>("/dev/schemaField/list", {
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

/** 根据模型ID查询字段列表 根据模型ID查询字段列表 GET /dev/schemaField/listBySchemaId/${param0} */
export async function schemaFieldListBySchemaId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.schemaFieldListBySchemaIdParams,
  options?: { [key: string]: any }
) {
  const { schemaId: param0, ...queryParams } = params;
  return request<API.RListSchemaFieldVo>(
    `/dev/schemaField/listBySchemaId/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}
