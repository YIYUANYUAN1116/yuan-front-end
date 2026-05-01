// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** Search knowledge base POST /ai/kbRetrieval/search */
export async function kbRetrievalSearch(
  body: API.KbRetrievalRequest,
  options?: { [key: string]: any }
) {
  return request<API.RKbRetrievalResponse>("/ai/kbRetrieval/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
