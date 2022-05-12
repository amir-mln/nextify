import { ReactNode } from "react";

import { LAYOUTS } from "./constants";

export type LayoutTypes = keyof typeof LAYOUTS;

export type LayoutComponentProps = { children: ReactNode; type: LayoutTypes };
