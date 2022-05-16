import { Box, Text } from "@chakra-ui/layout";
import { usePlayerData } from "context";

function SongInfo() {
  const { playingSong } = usePlayerData();
  return (
    <Box>
      <Text fontSize="large">{playingSong?.name}</Text>
      <Text fontSize="sm">{playingSong?.artist.name}</Text>
    </Box>
  );
}

export default SongInfo;
