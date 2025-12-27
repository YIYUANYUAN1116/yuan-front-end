// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 个人信息 个人信息 GET /system/user/profile */
export async function getProfile(options?: { [key: string]: any }) {
  return request<API.RProfileVo>("/system/user/profile", {
    method: "GET",
    ...(options || {}),
  });
}

/** 修改用户 修改用户 PUT /system/user/profile */
export async function updateProfile(
  body: API.SysUserProfileBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/user/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 个人信息 头像上传 POST /system/user/profile/avatar */
export async function avatar(
  body: {},
  avatarfile?: File,
  options?: { [key: string]: any }
) {
  const formData = new FormData();

  if (avatarfile) {
    formData.append("avatarfile", avatarfile);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === "object" && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ""));
        } else {
          formData.append(
            ele,
            new Blob([JSON.stringify(item)], { type: "application/json" })
          );
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.RAvatarVo>("/system/user/profile/avatar", {
    method: "POST",
    data: formData,
    requestType: "form",
    ...(options || {}),
  });
}

/** 重置密码 重置密码 PUT /system/user/profile/updatePwd */
export async function updatePwd(
  body: API.SysUserPasswordBo,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/system/user/profile/updatePwd", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
