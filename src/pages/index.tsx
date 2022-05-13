import { Artist } from "@prisma/client";
import { Image } from "@chakra-ui/react";
import { Box, Text, Flex } from "@chakra-ui/layout";

import prismaClient from "lib/prisma-client";
import GradientLayout from "layouts/gradient";
import { LAYOUT_TYPES } from "layouts/constants";

function Home({ artists }: { artists: Artist[] }) {
  return (
    <GradientLayout
      roundImage
      color="teal.900"
      subtitle="profile"
      title="Scott Moss"
      description="15 public playlists"
      image="https://dl.dropboxusercontent.com/s/bgiv0ssz3xpotz9/peep.png?dl=0"
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artist this month
          </Text>
          <Text fontSize="md">only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Box key={artist.id + artist.name} paddingX="10px" width="20%">
              <Box bg="gray.800" borderRadius="4px" padding="15px" width="100%">
                <Image src="https://placekitten.com/300/300" borderRadius="100%" />
                <Box marginTop="20px">
                  <Text fontSize="large">{artist.name}</Text>
                  <Text fontSize="x-small">Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
}

Home.layoutType = LAYOUT_TYPES.PLAYER;

export default Home;

export async function getServerSideProps() {
  const artists = await prismaClient.artist.findMany({});

  return {
    props: { artists },
  };
}
