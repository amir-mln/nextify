import jwt from "jsonwebtoken";
import { NextApiRequest } from "next";
import prismaClient from "lib/prisma-client";

import type { User } from "@prisma/client";

type ValidationStatus = "VALID" | "INVALID";
type ValidatorReturnType = { user: User | null; status: ValidationStatus };

export async function validateUser(req: NextApiRequest): Promise<ValidatorReturnType> {
  const token = req.cookies.AUTH_ACCESS_TOKEN;
  try {
    const { id } = jwt.verify(token, "jwt-secret") as Partial<User>;
    const user: User | null = await prismaClient.user.findUnique({
      where: { id },
    });

    if (!user || !token || !id) throw new Error();

    return { user, status: "VALID" };
  } catch {
    return { user: null, status: "INVALID" };
  }
}
