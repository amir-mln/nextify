import { Box } from "@chakra-ui/layout";

import SideBar from "components/sidebar";
import MainFooter from "components/main-footer";
import MainContentWrapper from "components/main-content";

import type { MainContentWrapperProps } from "components/main-content";

function MainLayout({ children, ...mainContentProps }: MainContentWrapperProps) {
  return (
    <Box width="100vw" height="100vh" display="flex" flexWrap="wrap">
      <SideBar />
      <MainContentWrapper {...mainContentProps}>{children}</MainContentWrapper>
      <MainFooter />
    </Box>
  );
}

export default MainLayout;
