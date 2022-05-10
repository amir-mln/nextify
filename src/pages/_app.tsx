import { extendTheme, ChakraProvider } from "@chakra-ui/react";

import MainLayout from "layouts/main";
import CHAKRA_THEME from "constants/chakra-theme";

import "reset-css";

import type { AppProps } from "next/app";

const theme = extendTheme(CHAKRA_THEME);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ChakraProvider>
  );
}

export default MyApp;
