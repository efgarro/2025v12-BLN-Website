// src/router.tsx
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
// import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { routeTree } from "./routeTree.gen";
import { QueryClient } from "@tanstack/react-query";


// export function createRouter() {
//   const queryClient = new QueryClient();

//   return routerWithQueryClient(
//     createTanStackRouter({
//       routeTree,
//       context: { queryClient },
//       defaultPreload: "intent",
//       // defaultErrorComponent: DefaultCatchBoundary,
//       // defaultNotFoundComponent: () => <NotFound />,
//       defaultPreloadStaleTime: 0,
//       scrollRestoration: true,
//     }),
//     queryClient
//   );
// }
// declare module "@tanstack/react-router" {
//   interface Register {
//     router: ReturnType<typeof createRouter>;
//   }
// }

export function getRouter() {
  const queryClient = new QueryClient()

  const router = createRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: 'intent',
    // defaultErrorComponent: DefaultCatchBoundary,
    // defaultNotFoundComponent: () => <NotFound />,
  })
  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}