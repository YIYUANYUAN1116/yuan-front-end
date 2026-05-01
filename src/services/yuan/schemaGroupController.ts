// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改数据模型分组 修改数据模型分组 PUT /dev/schemaGroup */
export async function schemaGroupEdit(
  body: API.SchemaGroupBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/dev/schemaGroup", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增数据模型分组 新增数据模型分组 POST /dev/schemaGroup */
export async function schemaGroupAdd(
  body: API.SchemaGroupBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/dev/schemaGroup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取数据模型分组详细信息 获取数据模型分组详细信息 GET /dev/schemaGroup/${param0} */
export async function schemaGroupGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.schemaGroupGetInfoParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RSchemaGroupVo>(`/dev/schemaGroup/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除数据模型分组 删除数据模型分组 DELETE /dev/schemaGroup/${param0} */
export async function schemaGroupRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.schemaGroupRemoveParams,
  options?: { [key: string]: any }
) {
  const { ids: param0, ...queryParams } = params;
  return request<API.RVoid>(`/dev/schemaGroup/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询数据模型分组列表 查询数据模型分组列表 GET /dev/schemaGroup/list */
export async function schemaGroupList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.schemaGroupListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoSchemaGroupVo>("/dev/schemaGroup/list", {
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

/** 获取数据模型分组选择列表 获取数据模型分组选择列表 GET /dev/schemaGroup/select */
export async function schemaGroupSelect(options?: { [key: string]: any }) {
  return request<API.RListSchemaGroupVo>("/dev/schemaGroup/select", {
    method: "GET",
    ...(options || {}),
  });
}
