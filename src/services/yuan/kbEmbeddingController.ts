// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改知识库向量元数据表 修改知识库向量元数据表 PUT /ai/kbEmbedding */
export async function kbEmbeddingEdit(
  body: API.KbEmbeddingBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/kbEmbedding", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增知识库向量元数据表 新增知识库向量元数据表 POST /ai/kbEmbedding */
export async function kbEmbeddingAdd(
  body: API.KbEmbeddingBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/kbEmbedding", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取知识库向量元数据表详细信息 获取知识库向量元数据表详细信息 GET /ai/kbEmbedding/${param0} */
export async function kbEmbeddingGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbEmbeddingGetInfoParams,
  options?: { [key: string]: any }
) {
  const { embeddingId: param0, ...queryParams } = params;
  return request<API.RKbEmbeddingVo>(`/ai/kbEmbedding/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除知识库向量元数据表 删除知识库向量元数据表 DELETE /ai/kbEmbedding/${param0} */
export async function kbEmbeddingRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbEmbeddingRemoveParams,
  options?: { [key: string]: any }
) {
  const { embeddingIds: param0, ...queryParams } = params;
  return request<API.RVoid>(`/ai/kbEmbedding/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出知识库向量元数据表列表 导出知识库向量元数据表列表 POST /ai/kbEmbedding/export */
export async function kbEmbeddingExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbEmbeddingExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/ai/kbEmbedding/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询知识库向量元数据表列表 查询知识库向量元数据表列表 GET /ai/kbEmbedding/list */
export async function kbEmbeddingList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbEmbeddingListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoKbEmbeddingVo>("/ai/kbEmbedding/list", {
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
