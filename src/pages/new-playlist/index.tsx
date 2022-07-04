import { Box } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";
import { Button, Checkbox, Input, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

import fetcher from "lib/fetcher";
import prismaClient from "lib/prisma-client";
import { capitalizeString } from "lib/formatter";

import type { ChangeEvent } from "react";
import type { PlayListSong } from "pages/playlists/[id]";
import type { PagePropsWithLayout } from "pages/_app";

function NewPlaylist({ songs }: { songs: PlayListSong[] }) {
  const [playlistName, setPlaylistName] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number[]>([]);
  const nextRouter = useRouter();

  function handleOnClick(e: ChangeEvent<HTMLInputElement>) {
    const isChecked = e.target.checked;
    const value = +e.target.value;

    if (isChecked) setSelectedIndex((prev) => prev.concat([value]));
    else setSelectedIndex((prev) => prev.filter((index) => index !== value));
  }

  async function handleSubmit(e: MouseEvent) {
    const selectedSongs: PlayListSong[] = selectedIndex.map((index) => songs[index - 1]);
    const body = { name: playlistName, songs: selectedSongs };

    try {
      const data = await fetcher("/api/new-playlist", body);
      nextRouter.push(data.playlistUrl);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box bg="transparent" color="white" width="80%" padding="10px" marginBottom="20px" marginX="auto">
      <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="2.5rem">
        <Input
          width="30%"
          type="text"
          color="gray.100"
          borderRadius="sm"
          bgColor="gray.800"
          borderColor="gray.500"
          value={playlistName}
          placeholder="Playlist Name"
          onChange={(e) => setPlaylistName(e.target.value)}
        />
        <Button onClick={handleSubmit} _hover={{ backgroundColor: "green.400" }} bgColor="green.600">
          Create Playlist
        </Button>
      </Box>
      <Table variant="unstyled">
        <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,0.2)">
          <Tr>
            <Th>#</Th>
            <Th>Select</Th>
            <Th>Title</Th>
            <Th>Artist</Th>
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
              <Td>
                <Checkbox value={i + 1} onChange={handleOnClick} />
              </Td>
              <Td>{capitalizeString(song.name)}</Td>
              <Td>{capitalizeString(song.artist.name)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

async function getServerSideProps(): Promise<PagePropsWithLayout> {
  const songs = await prismaClient.song.findMany({
    select: { url: true, name: true, artist: { select: { name: true } } },
  });

  return {
    props: {
      songs,
      layout: {
        type: "MAIN",
        mainContentProps: {
          image: "",
          subtitle: "",
          description: "",
          roundImage: false,
          color: "blueviolet",
          title: "Create A Playlist",
        },
      },
    },
  };
}

export { getServerSideProps };

export default NewPlaylist;
