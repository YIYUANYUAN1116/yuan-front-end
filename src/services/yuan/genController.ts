// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 生成后端代码 生成后端代码 GET /tool/gen/batchGenCode */
export async function batchGenCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.batchGenCodeParams,
  options?: { [key: string]: any }
) {
  return request<API.RString>("/tool/gen/batchGenCode", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 生成前端代码 生成前端代码 GET /tool/gen/batchGenFrontendCode */
export async function batchGenFrontendCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.batchGenFrontendCodeParams,
  options?: { [key: string]: any }
) {
  return request<API.RString>("/tool/gen/batchGenFrontendCode", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据表名获取代码生成元数据-前端代码生成 根据表名获取代码生成元数据-前端代码生成 GET /tool/gen/getByTableName */
export async function getByTableName(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getByTableNameParams,
  options?: { [key: string]: any }
) {
  return request<API.RObject>("/tool/gen/getByTableName", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
