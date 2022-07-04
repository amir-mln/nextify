import { Image } from "@chakra-ui/react";
import { Box, Text } from "@chakra-ui/layout";
import { usePlayerDispatch } from "context";

import { capitalizeString } from "lib/formatter";
import PlayButton from "components/player/components/buttons/play";

import type { PlayListSong } from "pages/playlists/[id]";

function SongBox({ song }: { song: PlayListSong }) {
  const dispatch = usePlayerDispatch();

  function handleOnClick() {
    dispatch({ type: "SET_PLAYER_SONGS", payload: { songs: [song], key: song.url } });
  }

  return (
    <Box
      bg="gray.800"
      width="210px"
      height="272px"
      padding="15px"
      borderRadius="4px"
      position="relative"
      key={song.name + song.artist.name}
    >
      <Image src="https://placekitten.com/300/300" alt="kitten" borderRadius="100%" />
      <Box marginTop="20px">
        <Text fontSize="large">{capitalizeString(song.name)}</Text>
        <Text fontSize="x-small">{capitalizeString(song.artist.name)}</Text>
      </Box>
      <Box position="absolute" top="160px" left="150">
        <PlayButton fontSize="3rem" clickCallback={handleOnClick} propSongName={song.name} />
      </Box>
    </Box>
  );
}

export default SongBox;
