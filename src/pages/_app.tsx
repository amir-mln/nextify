import { extendTheme, ChakraProvider } from "@chakra-ui/react";

import AppLayout from "layouts/index";
import { LAYOUT_TYPES } from "layouts/constants";
import CHAKRA_THEME from "constants/chakra-theme";
import { PlayerDataProvider } from "context";

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
  const type = layout ? layout.type : LAYOUT_TYPES.FULL_PAGE;
  const mainContentProps = layout ? layout.mainContentProps : {};

  return (
    <ChakraProvider theme={theme}>
      {/* @ts-ignore : This is an issue with react 18. read: https://github.com/ctrlplusb/easy-peasy/issues/741 */}
      <PlayerDataProvider>
        <AppLayout type={type} mainContentProps={mainContentProps}>
          <Component {...restPageProps} />
        </AppLayout>
      </PlayerDataProvider>
    </ChakraProvider>
  );
}
