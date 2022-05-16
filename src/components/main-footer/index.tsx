import { Box } from "@chakra-ui/layout";

import Player from "components/player";
import SongInfo from "components/song-info";

function MainFooter() {
  return (
    <Box
      as="footer"
      padding="4"
      width="100%"
      height="81px"
      bg="gray.700"
      color="gray.100"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box flexBasis="20%">
        <SongInfo />
      </Box>
      <Box flexBasis="40%">
        <Player />
      </Box>
      <Box flexBasis="20%">controls</Box>
    </Box>
  );
}

export default MainFooter;
