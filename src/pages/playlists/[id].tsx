import { Box } from "@chakra-ui/layout";
import { BsFillPlayFill } from "react-icons/bs";
import { Table, Thead, Td, Tr, Tbody, Th, IconButton } from "@chakra-ui/react";

import { usePlayerDispatch } from "context";
import prismaClient from "lib/prisma-client";
import { capitalizeString } from "lib/formatter";
import { getValidatedToken } from "lib/auth/validator";
import PlayButton from "components/player/components/buttons/play";

import type { Artist, Song } from "@prisma/client";
import type { GetServerSidePropsContext } from "next";
import type { PagePropsWithLayout } from "pages/_app";

export type PlayListSong = Pick<Song, "name" | "url"> & { artist: Pick<Artist, "name"> };

export type PlaylistProps = { songs: PlayListSong[]; key: string };

export default function PlayList({ songs, key }: PlaylistProps) {
  const playerDispatch = usePlayerDispatch();

  function handlePlay(songIndex: number = 0) {
    playerDispatch({ type: "SET_PLAYER_SONGS", payload: { songs, key } });
    playerDispatch({ type: "SET_PLAYER_INDEX", payload: { index: songIndex } });
  }

  return (
    <Box bg="transparent" color="white">
      <Box padding="10px" marginBottom="20px">
        <Box marginBottom="30px">
          <IconButton
            onClick={() => handlePlay()}
            icon={<BsFillPlayFill fontSize="30px" />}
            aria-label="play"
            colorScheme="green"
            size="lg"
            isRound
          />
        </Box>
        <Table variant="unstyled">
          <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,0.2)">
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Artist</Th>
              <Th>Play</Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs.map((song, i) => (
              <Tr
                sx={{
                  transition: "all .3s ",
                  "&:hover": {
                    bg: "rgba(255,255,255, 0.1)",
                  },
                }}
                key={song.url}
              >
                <Td>{i + 1}</Td>
                <Td cursor="pointer" onClick={() => handlePlay(i)}>
                  {capitalizeString(song.name)}
                </Td>
                <Td>{capitalizeString(song.artist.name)}</Td>
                <Td>
                  <PlayButton fontSize="1.5rem" clickCallback={() => handlePlay(i)} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<PagePropsWithLayout> {
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
      key: pageId,
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
