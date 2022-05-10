import { extendTheme, ChakraProvider } from "@chakra-ui/react";

import CHAKRA_THEME from "constants/chakra-theme";

import "reset-css";

import type { AppProps } from "next/app";

const theme = extendTheme(CHAKRA_THEME);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
