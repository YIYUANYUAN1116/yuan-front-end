// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改知识库文档切片表 修改知识库文档切片表 PUT /ai/kbChunk */
export async function kbChunkEdit(
  body: API.KbChunkBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/kbChunk", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增知识库文档切片表 新增知识库文档切片表 POST /ai/kbChunk */
export async function kbChunkAdd(
  body: API.KbChunkBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ai/kbChunk", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取知识库文档切片表详细信息 获取知识库文档切片表详细信息 GET /ai/kbChunk/${param0} */
export async function kbChunkGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbChunkGetInfoParams,
  options?: { [key: string]: any }
) {
  const { chunkId: param0, ...queryParams } = params;
  return request<API.RKbChunkVo>(`/ai/kbChunk/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除知识库文档切片表 删除知识库文档切片表 DELETE /ai/kbChunk/${param0} */
export async function kbChunkRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbChunkRemoveParams,
  options?: { [key: string]: any }
) {
  const { chunkIds: param0, ...queryParams } = params;
  return request<API.RVoid>(`/ai/kbChunk/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出知识库文档切片表列表 导出知识库文档切片表列表 POST /ai/kbChunk/export */
export async function kbChunkExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbChunkExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/ai/kbChunk/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询知识库文档切片表列表 查询知识库文档切片表列表 GET /ai/kbChunk/list */
export async function kbChunkList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.KbChunkListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoKbChunkVo>("/ai/kbChunk/list", {
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
