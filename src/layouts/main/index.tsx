import { ReactNode } from "react";
import { Box } from "@chakra-ui/layout";

import SideBar from "components/sidebar";
import MainContentWrapper from "components/main-content";

import type { MainContentWrapperProps } from "components/main-content";

function MainLayout({ children, ...mainContentProps }: MainContentWrapperProps) {
  return (
    <Box width="100vw" height="100vh" display="flex" flexWrap="wrap">
      <SideBar />
      <MainContentWrapper {...mainContentProps}>{children}</MainContentWrapper>
      <Box as="footer" position="absolute" bottom="0" width="100%" height="100px">
        footer
      </Box>
    </Box>
  );
}

export default MainLayout;
