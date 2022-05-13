import bcrypt from "bcrypt";
import cookie from "cookie";
import jwt from "jsonwebtoken";

import prismaClient from "lib/prisma-client";

import type { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;
  const user: User | null = await prismaClient.user.findUnique({ where: { email } });
  const passIsCorrect = await bcrypt.compare(password, user?.password || "");

  if (user && passIsCorrect) {
    const token = jwt.sign({ email, id: user.id, date: Date.now() }, "jwt-secret", { expiresIn: "8h" });
    const cookieVal = cookie.serialize("AUTH_ACCESS_TOKEN", token, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 8 * 3600,
      secure: process.env.NODE_ENV === "production",
    });

    return res.setHeader("Set-Cookie", cookieVal).json({ email: user.email });
  } else {
    return res.status(401).json({ error: "Email or Password are incorrect" });
  }
}
