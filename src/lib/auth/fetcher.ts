import { User } from "@prisma/client";
import fetcher from "lib/fetcher/index";

export type AuthFetcherMods = "signin" | "signup";

export type AuthFetcherBody =
  | { email: string; password: string }
  | { username: string; email: string; password: string };

function authFetcher(mode: AuthFetcherMods, body: AuthFetcherBody): Promise<Partial<User> | Error> {
  return fetcher(`/api/auth/${mode}`, body);
}

export default authFetcher;
