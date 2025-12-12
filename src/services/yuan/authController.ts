// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 登录 POST /auth/login */
export async function login(
  body: API.LoginBody,
  options?: { [key: string]: any }
) {
  return request<API.RLoginVo>("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
