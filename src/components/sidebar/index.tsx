import NextLink from "next/link";
import { MdHome, MdSearch, MdLibraryMusic, MdPlaylistAdd, MdFavorite } from "react-icons/md";
import { Box, List, ListItem, ListIcon, Divider, Link as ChakraLink } from "@chakra-ui/layout";

import BrandLogo from "components/brand-logo";
import useCustomSWR from "hooks/use-custom-swr";

import type { Playlist } from "@prisma/client";

const navItems = [
  {
    name: "Home",
    icon: MdHome,
    route: "/",
  },
  {
    name: "Search",
    icon: MdSearch,
    route: "/search",
  },
  {
    name: "Your Library",
    icon: MdLibraryMusic,
    route: "/library",
  },
];

const musicMenu = [
  {
    name: "Create Playlist",
    icon: MdPlaylistAdd,
    route: "/",
  },
  {
    name: "Favorites",
    icon: MdFavorite,
    route: "/favorites",
  },
];

function SideBar() {
  const { data: playlists, loading } = useCustomSWR<Playlist[]>("/api/playlists");

  function renderPlaylistItems() {
    if (loading || !playlists) return null;

    return playlists.map((playlist) => (
      <ListItem key={playlist.id + playlist.name}>
        <NextLink href="/" passHref>
          <ChakraLink
            color="gray.400"
            outline="none"
            _focus={{ outline: "none" }}
            _hover={{ textDecoration: "none", color: "gray.100" }}
          >
            {playlist.name}
          </ChakraLink>
        </NextLink>
      </ListItem>
    ));
  }

  return (
    <Box as="aside" width="250px" paddingX="15px" height="calc(100% - 100px)" backgroundColor="gray.800">
      <Box as="nav" paddingY="20px">
        <BrandLogo />
        <List marginBottom="24px" spacing={2}>
          {navItems.map((menu) => (
            <ListItem fontSize="16px" key={menu.name}>
              <NextLink href={menu.route} passHref>
                <ChakraLink
                  color="gray.400"
                  outline="none"
                  _focus={{ outline: "none" }}
                  _hover={{ textDecoration: "none", color: "gray.100" }}
                >
                  <ListIcon as={menu.icon} marginRight="20px" fontSize="1.25rem" />
                  {menu.name}
                </ChakraLink>
              </NextLink>
            </ListItem>
          ))}
        </List>
        <List spacing={2}>
          {musicMenu.map((menu) => (
            <ListItem fontSize="16px" key={menu.name}>
              <NextLink href={menu.route} passHref>
                <ChakraLink
                  color="gray.400"
                  outline="none"
                  _focus={{ outline: "none" }}
                  _hover={{ textDecoration: "none", color: "gray.100" }}
                >
                  <ListIcon as={menu.icon} marginRight="20px" fontSize="1.25rem" />
                  {menu.name}
                </ChakraLink>
              </NextLink>
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider borderColor="gray.100" marginBottom="20px" opacity="0.1" />

      <List overflowY="auto" height="calc(100% - 313px)" spacing={2}>
        {renderPlaylistItems()}
      </List>
    </Box>
  );
}

export default SideBar;