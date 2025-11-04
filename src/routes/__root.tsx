// src/routes/__root.tsx
/// <reference types="vite/client" />
import type { ReactNode } from "react";
import {
  Outlet,
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  Link,
} from "@tanstack/react-router";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { QueryClient } from "@tanstack/react-query";

import appStyles from "../css/styles.css?url";
import appCss from "../styles/app.css?url";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
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
    <RootDocument>
      <div className="core_screen core_flexCol">
        <div className="core_wrapper">
          <div className="navbar p-1 justify-between bg-base-100 shadow-sm">
            <div className="navbar-start w-32">
              <a
                href="/"
                className="btn hover:bg-transparent hover:shadow-none hover:border-transparent btn-ghost core_flexCol"
              >
                <p className="text-(--color-error) text-xl">BijaLapa</p>
                <p className="w-1 pr-4 text-right">Natural</p>
              </a>
            </div>
            <div className="navbar-center hidden lg:flex lg:content-between">
              <ul className="menu menu-horizontal gap-2 justify-between px-1">
                <li>
                  <a href="/rooms">View Rooms</a>
                </li>
                <li>
                  <a href="/grounds">Grounds</a>
                </li>
                <li>
                  <a>Activities</a>
                </li>
                <li>
                  <a>Scarlet Macaw Habitat Project</a>
                </li>
                <li>
                  <a href="/about">About</a>
                  {/* <Link to="/about">About</Link> */}
                </li>
              </ul>
            </div>
            <div className="navbar-end w-20 lg:hidden">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    // xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0,0,256,256"
                    width="27.5px"
                    height="27.5px"
                    fill-rule="nonzero"
                  >
                    <g
                      fill="#e41e3c"
                      fill-rule="nonzero"
                      stroke="none"
                      stroke-width="1"
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      stroke-miterlimit="10"
                      stroke-dasharray=""
                      stroke-dashoffset="0"
                      font-family="none"
                      font-weight="none"
                      font-size="none"
                      text-anchor="none"
                      // style="mix-blend-mode: normal"
                    >
                      <g transform="scale(5.12,5.12)">
                        <path d="M5,8c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175h40c0.72127,0.0102 1.39216,-0.36875 1.75578,-0.99175c0.36361,-0.623 0.36361,-1.39351 0,-2.01651c-0.36361,-0.623 -1.0345,-1.00195 -1.75578,-0.99175zM5,23c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175h40c0.72127,0.0102 1.39216,-0.36875 1.75578,-0.99175c0.36361,-0.623 0.36361,-1.39351 0,-2.01651c-0.36361,-0.623 -1.0345,-1.00195 -1.75578,-0.99175zM5,38c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175h40c0.72127,0.0102 1.39216,-0.36875 1.75578,-0.99175c0.36361,-0.623 0.36361,-1.39351 0,-2.01651c-0.36361,-0.623 -1.0345,-1.00195 -1.75578,-0.99175z"></path>
                      </g>
                    </g>
                  </svg>
                </div>
                <ul
                  // tabIndex="-1"
                  className="menu menu-md flex-1 justify-between gap-2 dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a href="/rooms">View Rooms</a>
                  </li>
                  <li>
                    <a href="/grounds">Grounds</a>
                  </li>
                  <li>
                    <a>Activities</a>
                  </li>
                  <li>
                    <a>Scarlet Macaw Habitat Project</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
      {/* <Outlet /> */}
    </RootDocument>
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
