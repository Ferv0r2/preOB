import { ReactNode } from "react";

export interface RouteProps {
  path: string;
  element: ReactNode;
}

export const Route = ({ path, element }: RouteProps) => {
  return window.location.pathname == path ? <>{element}</> : null;
};
