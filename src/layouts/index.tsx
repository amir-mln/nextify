import { ReactNode } from "react";
import { LAYOUTS } from "./constants";

import type { MainContentWrapperProps } from "components/main-content";

export type LayoutTypes = keyof typeof LAYOUTS;

export type AppLayoutProps = {
  children: ReactNode;
  type: LayoutTypes;
  mainContentProps: Omit<MainContentWrapperProps, "children">;
};

export default function AppLayout({ children, type, mainContentProps }: AppLayoutProps) {
  const LayoutWrapper = LAYOUTS[type];

  return <LayoutWrapper {...mainContentProps}>{children}</LayoutWrapper>;
}
