import { Box, Text, Flex } from "@chakra-ui/layout";

import SongBox from "components/song-box";
import prismaClient from "lib/prisma-client";
import { getValidatedUser } from "lib/auth/validator";

import type { PagePropsWithLayout } from "./_app";
import type { PlayListSong } from "./playlists/[id]";
import type { GetServerSidePropsContext } from "next";

type HomePageProps = { songs: PlayListSong[] };

export default function Home({ songs }: HomePageProps) {
  const homeSongs = songs.map((song) => <SongBox key={song.url} song={song} />);

  return (
    <Box color="white" paddingX="40px">
      <Box marginBottom="40px">
        <Text fontSize="2xl" fontWeight="bold">
          Some Songs
        </Text>
        <Text fontSize="md">Based On Your Preference</Text>
      </Box>
      <Flex justifyContent="space-between">{homeSongs}</Flex>
    </Box>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<PagePropsWithLayout> {
  const user = await getValidatedUser(context.req);
  const songs = await prismaClient.song.findMany({
    select: { name: true, url: true, artist: { select: { name: true } } },
    take: 5,
  });
  // the middleware that runs before this guarantees that user wont be null
  const playlistsCount = await prismaClient.playlist.count({ where: { userId: user!.id } });

  return {
    props: {
      songs,
      layout: {
        type: "MAIN",
        mainContentProps: {
          roundImage: true,
          color: "teal.900",
          subtitle: "profile",
          title: user!.username,
          description: `${playlistsCount} public playlists`,
          image: "https://dl.dropboxusercontent.com/s/bgiv0ssz3xpotz9/peep.png?dl=0",
        },
      },
    },
  };
}
