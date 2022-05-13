export default async function fetcher(url: string, data: any) {
  const res = await fetch(`/api${url}`, {
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
