export type JsonSafeValues = string | number | boolean | null | JsonSafeValues[] | { [key: string]: JsonSafeValues };

export type ValidFetcherUrl = `/api/${string}` | `http${string}`;

export type ValidFetcherBody = { [prop: string]: JsonSafeValues } | FormData;

export type FetcherContentType = "application/json" | "multipart/form-data" | "application/x-www-form-urlencoded";

export default async function fetcher(url: ValidFetcherUrl, body?: ValidFetcherBody, contentType?: FetcherContentType) {
  const res = await fetch(url, {
    method: body ? "POST" : "GET",
    credentials: "include",
    headers: {
      "Accept": "application/json, text/*",
      "Content-Type": contentType || "application/json",
    },
    body: JSON.stringify(body),
  });

  if (res.status > 399 || res.status < 200) throw new Error(res.statusText);

  const data = await res.json();

  return data;
}
