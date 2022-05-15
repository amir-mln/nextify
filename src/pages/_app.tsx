import { extendTheme, ChakraProvider } from "@chakra-ui/react";

import AppLayout from "layouts/index";
import { LAYOUT_TYPES } from "layouts/constants";
import CHAKRA_THEME from "constants/chakra-theme";

import "reset-css";

import type { AppProps } from "next/app";
import type { GetServerSidePropsResult } from "next";
import type { AppLayoutProps } from "layouts/index";

const theme = extendTheme(CHAKRA_THEME);

export type CustomServerSideResult = GetServerSidePropsResult<{
  [key: string]: any;
  layout: Partial<Omit<AppLayoutProps, "children">>;
}>;

export default function MyApp({ Component, pageProps }: AppProps) {
  const { layout, ...restPageProps } = pageProps;
  const type = layout.type || LAYOUT_TYPES.FULL_PAGE;
  const mainContentProps = layout.mainContentProps || {};

  return (
    <ChakraProvider theme={theme}>
      <AppLayout type={type} mainContentProps={mainContentProps}>
        <Component {...restPageProps} />
      </AppLayout>
    </ChakraProvider>
  );
}
