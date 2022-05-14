import { Artist, Playlist, Song } from "@prisma/client";

import prismaClient from "lib/prisma-client";
import GradientLayout from "layouts/gradient";
import SongsTable from "components/song-table";
import { LAYOUT_TYPES } from "layouts/constants";
import { getValidatedToken } from "lib/auth/validator";

import type { GetServerSidePropsContext } from "next";

export type PlayListSong = Song & Pick<Artist, "name">;

export type PlaylistProps = {
  playlistInfo: Playlist & { songs: PlayListSong[] };
};

function PlayList({ playlistInfo }: PlaylistProps) {
  const { name, songs, id } = playlistInfo;

  return (
    <GradientLayout
      title={name}
      color="green.900"
      subtitle="playlist"
      roundImage={false}
      description={`${songs.length} songs`}
      image={`https://picsum.photos/400?random=${id}`}
    >
      <SongsTable songs={songs} />
    </GradientLayout>
  );
}
PlayList.layoutType = LAYOUT_TYPES.PLAYER;

export default PlayList;

export async function getServerSideProps(context: GetServerSidePropsContext) {
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

  return { props: { playlistInfo } };
}
