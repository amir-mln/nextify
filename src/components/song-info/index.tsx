import { Box, Text } from "@chakra-ui/layout";
import { capitalizeString } from "lib/formatter";
import { usePlayingSong } from "hooks/use-playing-songs";

function SongInfo() {
  const playingSong = usePlayingSong();

  if (!playingSong) return null;
  return (
    <Box>
      <Text fontSize="large">{capitalizeString(playingSong.name)}</Text>
      <Text fontSize="sm">{capitalizeString(playingSong.artist.name)}</Text>
    </Box>
  );
}

export default SongInfo;
