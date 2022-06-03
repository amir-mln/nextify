import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (!req.cookies.AUTH_ACCESS_TOKEN) return;
  const expiredCookie = cookie.serialize("AUTH_ACCESS_TOKEN", "", {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
  });

  return res.setHeader("Set-Cookie", expiredCookie).redirect("/auth/signin");
}
