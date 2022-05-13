import { Box } from "@chakra-ui/layout";
import { ReactNode } from "react";

function FullPageLayout({ children }: { children: ReactNode }) {
  return (
    <Box width="100vw" height="100vh" bgColor="gray.900" color="gray.100">
      {children}
    </Box>
  );
}

export default FullPageLayout;
