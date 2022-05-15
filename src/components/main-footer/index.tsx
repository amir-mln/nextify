import { Box, Text } from "@chakra-ui/layout";

function MainFooter() {
  return (
    <Box
      as="footer"
      padding="4"
      width="100%"
      height="81px"
      bg="gray.800"
      color="gray.100"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>
        <Text fontSize="large">Song Name</Text>
        <Text fontSize="sm">Artist Name</Text>
      </Box>
      <Box flexBasis="40%">Player</Box>
      <Box>controls</Box>
    </Box>
  );
}

export default MainFooter;
