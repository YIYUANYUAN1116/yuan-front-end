// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 修改wfd 修改wfd PUT /workflow/wfDefinition */
export async function wfDefinitionEdit(
  body: API.WfDefinitionBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/workflow/wfDefinition", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增wfd 新增wfd POST /workflow/wfDefinition */
export async function wfDefinitionAdd(
  body: API.WfDefinitionBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/workflow/wfDefinition", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取wfd详细信息 获取wfd详细信息 GET /workflow/wfDefinition/${param0} */
export async function wfDefinitionGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WfDefinitionGetInfoParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RWfDefinitionVo>(`/workflow/wfDefinition/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除wfd 删除wfd DELETE /workflow/wfDefinition/${param0} */
export async function wfDefinitionRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WfDefinitionRemoveParams,
  options?: { [key: string]: any }
) {
  const { ids: param0, ...queryParams } = params;
  return request<API.RVoid>(`/workflow/wfDefinition/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改流程定义状态 修改wfd POST /workflow/wfDefinition/${param0}/${param1} */
export async function wfDefinitionChangeStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WfDefinitionChangeStatusParams,
  options?: { [key: string]: any }
) {
  const { id: param0, action: param1, ...queryParams } = params;
  return request<API.RVoid>(`/workflow/wfDefinition/${param0}/${param1}`, {
    method: "POST",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /workflow/wfDefinition/${param0}/versions */
export async function wfDefinitionVersionList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.versionsParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RListWfDefinitionVersionVo>(
    `/workflow/wfDefinition/${param0}/versions`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 POST /workflow/wfDefinition/${param0}/versions */
export async function wfDefinitionVersionCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.createVersionParams,
  body: API.CreateDefinitionVersionDto,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RWfDefinitionVersionVo>(
    `/workflow/wfDefinition/${param0}/versions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    }
  );
}

/** 导出wfd列表 导出wfd列表 POST /workflow/wfDefinition/export */
export async function wfDefinitionExport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WfDefinitionExportParams,
  options?: { [key: string]: any }
) {
  return request<any>("/workflow/wfDefinition/export", {
    method: "POST",
    params: {
      ...params,
      bo: undefined,
      ...params["bo"],
    },
    ...(options || {}),
  });
}

/** 查询wfd列表 查询wfd列表 GET /workflow/wfDefinition/list */
export async function wfDefinitionList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WfDefinitionListParams,
  options?: { [key: string]: any }
) {
  return request<API.TableDataInfoWfDefinitionVo>(
    "/workflow/wfDefinition/list",
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

/** 此处后端没有提供注释 GET /workflow/wfDefinition/versions/${param0} */
export async function wfDefinitionVersionGetInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.versionParams,
  options?: { [key: string]: any }
) {
  const { versionId: param0, ...queryParams } = params;
  return request<API.RWfDefinitionVersionVo>(
    `/workflow/wfDefinition/versions/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 DELETE /workflow/wfDefinition/versions/${param0} */
export async function wfDefinitionVersionRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteVersionParams,
  options?: { [key: string]: any }
) {
  const { versionId: param0, ...queryParams } = params;
  return request<API.RVoid>(`/workflow/wfDefinition/versions/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /workflow/wfDefinition/versions/${param0}/archive */
export async function wfDefinitionVersionArchive(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.archiveVersionParams,
  options?: { [key: string]: any }
) {
  const { versionId: param0, ...queryParams } = params;
  return request<API.RVoid>(
    `/workflow/wfDefinition/versions/${param0}/archive`,
    {
      method: "POST",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 PUT /workflow/wfDefinition/versions/${param0}/draft */
export async function wfDefinitionVersionSaveDraft(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.saveDraftParams,
  body: API.SaveDefinitionDraftDto,
  options?: { [key: string]: any }
) {
  const { versionId: param0, ...queryParams } = params;
  return request<API.RVoid>(`/workflow/wfDefinition/versions/${param0}/draft`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /workflow/wfDefinition/versions/${param0}/publish */
export async function wfDefinitionVersionPublish(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.publishVersionParams,
  options?: { [key: string]: any }
) {
  const { versionId: param0, ...queryParams } = params;
  return request<API.RVoid>(
    `/workflow/wfDefinition/versions/${param0}/publish`,
    {
      method: "POST",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}
