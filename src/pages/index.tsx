import { Image } from "@chakra-ui/react";
import { Artist } from "@prisma/client";
import { Box, Text, Flex } from "@chakra-ui/layout";

import prismaClient from "lib/prisma-client";
import { getValidatedUser } from "lib/auth/validator";

import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { PagePropsWithLayout } from "./_app";

type HomePageProps = { artists: Artist[] };

export default function Home({ artists }: HomePageProps) {
  return (
    <Box color="white" paddingX="40px">
      <Box marginBottom="40px">
        <Text fontSize="2xl" fontWeight="bold">
          Top Artists This Month
        </Text>
        <Text fontSize="md">Based On Your Preference</Text>
      </Box>
      <Flex>
        {artists.map((artist) => (
          <Box key={artist.id + artist.name} paddingX="10px" width="20%" height="280px">
            <Box bg="gray.800" borderRadius="4px" padding="15px" width="100%" height="100%">
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
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<PagePropsWithLayout> {
  const user = await getValidatedUser(context.req);
  const artists = await prismaClient.artist.findMany({ select: { name: true, id: true } });
  // the middleware that runs before this guarantees that user wont be null
  const playlistsCount = await prismaClient.playlist.count({ where: { userId: user!.id } });

  return {
    props: {
      artists,
      layout: {
        type: "MAIN",
        mainContentProps: {
          roundImage: true,
          color: "teal.900",
          subtitle: "profile",
          title: user!.username,
          description: `${playlistsCount} public playlists`,
          image: "https://dl.dropboxusercontent.com/s/bgiv0ssz3xpotz9/peep.png?dl=0",
        },
      },
    },
  };
}
