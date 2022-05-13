import { extendTheme, ChakraProvider } from "@chakra-ui/react";

import MainLayout from "layouts/index";
import CHAKRA_THEME from "constants/chakra-theme";

import "reset-css";

import type { AppProps } from "next/app";
import type { LayoutTypes } from "layouts/index";

type CustomAppProps = {
  [key in keyof AppProps]: key extends "Component"
    ? AppProps["Component"] & { layoutType: LayoutTypes }
    : AppProps[key];
};

const theme = extendTheme(CHAKRA_THEME);

function MyApp({ Component, pageProps }: CustomAppProps) {
  const layoutType = Component.layoutType || "FULL_PAGE";

  return (
    <ChakraProvider theme={theme}>
      <MainLayout type={layoutType}>
        <Component {...pageProps} />
      </MainLayout>
    </ChakraProvider>
  );
}

export default MyApp;
