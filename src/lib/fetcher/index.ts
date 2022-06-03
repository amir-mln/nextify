export type JsonSafeValues = string | number | boolean | null | JsonSafeValues[] | { [key: string]: JsonSafeValues };

export type ValidFetcherUrl = `/api/${string}` | `http${string}`;

export type ValidJsonObj = { [prop: string]: JsonSafeValues };

export default async function fetcher(url: ValidFetcherUrl, body?: ValidJsonObj) {
  const res = await fetch(url, {
    method: body ? "POST" : "GET",
    credentials: "include",
    headers: {
      "Accept": "application/json, text/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (res.status > 399 || res.status < 200) throw new Error(data.error);

  return data;
}
