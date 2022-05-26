import { Box, Text } from "@chakra-ui/layout";
import { usePlayingSong } from "hooks/use-playing-songs";

function SongInfo() {
  const playingSong = usePlayingSong();
  return (
    <Box>
      <Text fontSize="large">{playingSong?.name}</Text>
      <Text fontSize="sm">{playingSong?.artist.name}</Text>
    </Box>
  );
}

export default SongInfo;
