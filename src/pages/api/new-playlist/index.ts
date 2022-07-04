import { getValidatedUser } from "lib/auth/validator";
import prismaClient from "lib/prisma-client";
import { NextApiRequest, NextApiResponse } from "next";
import { PlayListSong } from "pages/playlists/[id]";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const userJWT = await getValidatedUser(req);
  const { name, songs } = req.body as { name: string; songs: PlayListSong[] };
  if (!name || !songs.length || !userJWT) return res.status(402).json({ error: "Invalid Request" });

  const playlist = await prismaClient.playlist.create({
    data: {
      name,
      user: { connect: { id: userJWT.id } },
      songs: { connect: songs.map(({ url }) => ({ url })) },
    },
  });

  return res
    .status(200)
    .json({ message: "playlist was created successfully", playlistUrl: "/playlists/" + playlist.id });
}
