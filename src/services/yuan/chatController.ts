// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 对话 POST /ai/chat/stream */
export async function chat(
  body: API.ChatRequest,
  options?: { [key: string]: any }
) {
  return request<API.SseEmitter>("/ai/chat/stream", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
