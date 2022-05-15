export type JsonSafeValues = string | number | boolean | null | JsonSafeValues[] | { [key: string]: JsonSafeValues };

export type ValidFetcherUrl = `/api/${string}` | `http${string}`;

export type ValidJsonObj = { [prop: string]: JsonSafeValues };

export default async function fetcher(url: ValidFetcherUrl, data?: ValidJsonObj) {
  const res = await fetch(url, {
    method: data ? "POST" : "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.status > 399 && res.status < 200) throw new Error();

  return await res.json();
}
