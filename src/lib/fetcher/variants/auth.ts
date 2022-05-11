import fetcher from "../index";

export default function authFetcher(mode: "signin" | "signup", body: { email: string; password: string }) {
  return fetcher(`/api/auth/${mode}`, body);
}
