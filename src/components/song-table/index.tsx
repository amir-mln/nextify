import { Box } from "@chakra-ui/layout";
import { usePlayerDispatch } from "context";
import { Action, useStoreActions } from "easy-peasy";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Table, Thead, Td, Tr, Tbody, Th, IconButton } from "@chakra-ui/react";

import { formatDate, formatTime } from "lib/formatter";

import type { PlayListSong } from "pages/playlists/[id]";

const SongsTable = ({ songs }: { songs: PlayListSong[] }) => {
  const { dispatchPlayerSongs, dispatchPlayingSong } = usePlayerDispatch();

  function handlePlay(activeSong?: PlayListSong) {
    dispatchPlayingSong(activeSong || songs[0]);
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
              <Th>Date Added</Th>
              <Th>
                <AiOutlineClockCircle />
              </Th>
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
                key={song.id}
              >
                <Td>{i + 1}</Td>
                <Td cursor="pointer" onClick={() => handlePlay(song)}>
                  {song.name}
                </Td>
                <Td>{formatDate(song.createdAt)}</Td>
                <Td>{formatTime(song.duration)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default SongsTable;
