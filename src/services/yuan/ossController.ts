// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 此处后端没有提供注释 POST /oss/multipart/complete */
export async function multipartComplete(
  body: API.CompleteMultipartReq,
  options?: { [key: string]: any }
) {
  return request<API.RFileObjectKey>("/oss/multipart/complete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /oss/multipart/init */
export async function initMultipart(
  body: API.InitMultipartReq,
  options?: { [key: string]: any }
) {
  return request<API.RMultipartSession>("/oss/multipart/init", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /oss/multipart/part-url */
export async function multipartPartUrl(
  body: API.MultipartSession,
  options?: { [key: string]: any }
) {
  return request<API.RString>("/oss/multipart/part-url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /oss/temp/upload */
export async function tempUpload(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tempUploadParams,
  body: {},
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/oss/temp/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}
