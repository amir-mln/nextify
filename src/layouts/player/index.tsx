import { ReactNode } from "react";
import { Box } from "@chakra-ui/layout";

import SideBar from "./components/sidebar";

function PlayerLayout({ children }: { children: ReactNode }) {
  return (
    <Box width="100vw" height="100vh" display="flex" flexWrap="wrap">
      <SideBar />
      <Box as="main" width="calc(100% - 250px)" height="calc(100% - 100px)">
        {children}
      </Box>
      <Box as="footer" position="absolute" bottom="0" width="100%" height="100px">
        footer
      </Box>
    </Box>
  );
}

export default PlayerLayout;
