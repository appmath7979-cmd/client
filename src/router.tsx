import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { DefaultErrorComponent } from "./pages/DefaultErrorComponent";
import { DefaultNotfoundComponent } from "./pages/DefaultNotfoundComponent";

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent,
    defaultNotFoundComponent: DefaultNotfoundComponent,
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
