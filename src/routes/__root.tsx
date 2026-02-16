// src/routes/__root.tsx
/// <reference types="vite/client" />
import type { ReactNode } from "react";
import {
  Outlet,
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  Link,
  RouterProvider,
  Router,
} from "@tanstack/react-router";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { QueryClient } from "@tanstack/react-query";

import appStyles from "../css/styles.css?url";
import appCss from "../styles/app.css?url";
import {
  NavSettingsProvider,
  useNavSettings,
} from "~/components/context/NavigationContext";
import NavBar from "~/components/NavBar";
import { IRouterContext } from "~/types/blnTypes";
import { getRouter } from "~/router";
import { useScreenWidth } from "~/hooks/useScreenWidth";
import Footer from "~/components/Footer";

export const Route = createRootRouteWithContext<IRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "BijaLapa Natural",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: appStyles },
    ],
  }),
  component: BijaLapaHomePage,
});

function BijaLapaHomePage() {
  return (
    <NavSettingsProvider>
      <RootDocument>
        <NavBar />
        <Outlet />
        <Footer />
      </RootDocument>
    </NavSettingsProvider>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <Scripts />
      </body>
    </html>
  );
}
