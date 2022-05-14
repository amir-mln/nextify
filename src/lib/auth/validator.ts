import jwt from "jsonwebtoken";
import prismaClient from "lib/prisma-client";

import type { User } from "@prisma/client";
import type { NextApiRequestCookies } from "next/dist/server/api-utils";

export type ValidatedUser = Pick<User, "id" | "email" | "firstName" | "lastName">;
export type RequestCookies = { cookies: NextApiRequestCookies };
export interface ValidationRequest extends RequestCookies {}

export async function validateUser(req: ValidationRequest): Promise<ValidatedUser | null> {
  const token = req.cookies.AUTH_ACCESS_TOKEN;
  try {
    const { id } = jwt.verify(token, "jwt-secret") as Partial<User>;
    const user = await prismaClient.user.findUnique({
      where: { id },
    });
    if (!user || !token || !id) throw new Error();

    const { password, createdAt, updatedAt, ...validatedUser } = user;

    return validatedUser;
  } catch {
    return null;
  }
}

export function getValidatedToken(req: ValidationRequest) {
  const token = req.cookies.AUTH_ACCESS_TOKEN;
  try {
    const userJWT = jwt.verify(token, "jwt-secret") as Partial<User>;

    return userJWT;
  } catch {
    return null;
  }
}
