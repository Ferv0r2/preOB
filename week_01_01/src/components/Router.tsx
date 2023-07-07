import { useState, useEffect, ReactNode, Children, ReactElement } from "react";
import { RouteProps } from "./Route";

interface RouterProps {
  children: ReactNode;
}

export const Router = ({ children }: RouterProps) => {
  const [path, setPath] = useState(location.pathname);
  const routes = Children.toArray(children) as ReactElement<RouteProps>[];

  useEffect(() => {
    const handleSetPath = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleSetPath);
    return () => window.removeEventListener("popstate", handleSetPath);
  }, []);

  return routes.find((route) => route.props.path === path) || null;
};
