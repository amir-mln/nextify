import { ReactNode } from "react";
import { LAYOUTS } from "./constants";

type LayoutTypes = keyof typeof LAYOUTS;

type LayoutComponentProps = { children: ReactNode; type: LayoutTypes };

function MainLayout({ children, type }: LayoutComponentProps) {
  const LayoutWrapper = LAYOUTS[type];

  return <LayoutWrapper>{children}</LayoutWrapper>;
}

export type { LayoutTypes, LayoutComponentProps };

export default MainLayout;
