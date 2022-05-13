import jwt from "jsonwebtoken";
import { NextApiRequest } from "next";
import prismaClient from "lib/prisma-client";

import type { User } from "@prisma/client";

type ValidationStatus = "VALID_USER" | "INVALID_USER";
type ValidatorReturnType = { user: User | null; status: ValidationStatus };

export async function validateUser(req: NextApiRequest): Promise<ValidatorReturnType> {
  const token = req.cookies.AUTH_ACCESS_TOKEN;
  try {
    const { id } = jwt.verify(token, "jwt-secret") as Partial<User>;
    const user: User | null = await prismaClient.user.findUnique({
      where: { id },
    });

    if (!user || !token || !id) throw new Error();

    return { user, status: "VALID_USER" };
  } catch {
    return { user: null, status: "INVALID_USER" };
  }
}
