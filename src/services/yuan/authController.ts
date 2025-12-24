// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 登录 登录方法 POST /auth/login */
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

/** 退出登录 退出登录 POST /auth/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<API.RVoid>("/auth/logout", {
    method: "POST",
    ...(options || {}),
  });
}
