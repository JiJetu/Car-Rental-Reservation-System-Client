import { ReactNode } from "react";

export type TRoute = {
  path: string;
  element: ReactNode;
};

export type TPath = {
  name?: string;
  path?: string;
  element?: ReactNode;
  icon?: ReactNode;
  children?: TPath[];
};

export type TPathItem =
  | {
      key: string;
      label: ReactNode;
      icon?: ReactNode;
      children?: TPathItem[];
    }
  | undefined;
