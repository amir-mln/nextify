export type JsonSafeValues = string | number | boolean | null | JsonSafeValues[] | { [key: string]: JsonSafeValues };

export type ValidFetcherUrl = `/api/${string}` | `http${string}`;

export type ValidFetcherBody = { [prop: string]: JsonSafeValues } | FormData;

export type FetcherContentType =
  | "application/json"
  | `multipart/form-data; boundary=${string}`
  | "application/x-www-form-urlencoded";

export default async function fetcher(url: ValidFetcherUrl, body?: ValidFetcherBody, contentType?: FetcherContentType) {
  const isFormData = body instanceof FormData;
  const reqOptions: RequestInit = { method: "GET", credentials: "include" };

  if (body) {
    reqOptions.method = "POST";
    reqOptions.headers = isFormData ? undefined : { "Content-Type": "application/json" };
    reqOptions.body = isFormData ? body : JSON.stringify(body);
  }

  const res = await fetch(url, reqOptions);

  const data = await res.json();

  if (res.status > 399 || res.status < 200) throw new Error(data.message || res.statusText);

  return data;
}
