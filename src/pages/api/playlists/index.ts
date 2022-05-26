import { getValidatedUser } from "lib/auth/validator";
import prismaClient from "lib/prisma-client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const user = await getValidatedUser(req);
  if (!user) return res.status(401).send({ message: "UNAUTHORIZED_USER" });

  const playlists = await prismaClient.playlist.findMany({ where: { userId: user.id }, orderBy: { createdAt: "asc" } });

  return res.json(playlists);
}
