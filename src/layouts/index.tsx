import { LAYOUTS } from "./constants";
import { LayoutComponentProps } from "./types";

function MainLayout({ children, type }: LayoutComponentProps) {
  const LayoutWrapper = LAYOUTS[type];

  return <LayoutWrapper>{children}</LayoutWrapper>;
}

export default MainLayout;
