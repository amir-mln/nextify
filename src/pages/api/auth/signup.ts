import bcrypt from "bcrypt";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import prismaClient from "lib/prisma-client";

import type { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { email, username, password } = req.body as { [prop: string]: string };
  const salt = await bcrypt.genSalt();
  const hashedPass = await bcrypt.hash(password, salt);

  let user: User;
  try {
    user = await prismaClient.user.create({ data: { email, username, password: hashedPass } });
  } catch (e) {
    return res.status(401).json({ error: "Something's wrong..." });
  }

  const token = jwt.sign({ email, id: user.id, time: Date.now() }, "jwt-secret", { expiresIn: "8h" });
  const cookieVal = cookie.serialize("AUTH_ACCESS_TOKEN", token, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 8 * 3600,
    secure: process.env.NODE_ENV === "production",
  });

  return res.setHeader("Set-Cookie", cookieVal).json(user);
}
