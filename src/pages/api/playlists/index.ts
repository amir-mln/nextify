import { validateUser } from "lib/auth/validator";
import prismaClient from "lib/prisma-client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { status, user } = await validateUser(req);
  if (!user) return res.status(401).json({ error: "UNAUTHORIZED_USER" });

  const playlists = await prismaClient.playlist.findMany({ where: { userId: user.id }, orderBy: { createdAt: "asc" } });

  return res.json(playlists);
}
