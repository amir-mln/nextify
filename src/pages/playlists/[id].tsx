import { Artist, Playlist, Song } from "@prisma/client";

import prismaClient from "lib/prisma-client";
import SongsTable from "components/song-table";
import { getValidatedToken } from "lib/auth/validator";

import type { GetServerSidePropsContext } from "next";
import type { CustomServerSideResult } from "pages/_app";

export type PlayListSong = Song & { artist: Pick<Artist, "name"> };

export type PlaylistProps = { songs: PlayListSong[] };

export default function PlayList({ songs }: PlaylistProps) {
  return <SongsTable songs={songs} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<CustomServerSideResult> {
  const pageId = context.query.id;
  const userJwtPayload = getValidatedToken(context.req);
  const playlistInfo = await prismaClient.playlist.findFirst({
    where: { id: Number(pageId), userId: userJwtPayload?.id },
    include: {
      songs: {
        include: {
          artist: { select: { name: true } },
        },
      },
    },
  });

  if (!playlistInfo) return { redirect: { permanent: false, destination: "/" } };

  return {
    props: {
      songs: playlistInfo.songs,
      layout: {
        type: "MAIN",
        mainContentProps: {
          title: playlistInfo.name,
          color: "green.900",
          subtitle: "playlist",
          roundImage: false,
          description: `${playlistInfo.songs.length} songs`,
          image: `https://picsum.photos/400?random=${playlistInfo.id}`,
        },
      },
    },
  };
}
