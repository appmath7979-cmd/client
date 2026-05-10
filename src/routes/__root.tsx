import {
  HeadContent,
  Scripts,
  createRootRoute,
  useMatches,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import appCss from "../styles.css?url";
import { Header } from "#/components/Header";
import { Toaster } from "../components/ui/Toaster";

export const Route = createRootRoute({
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
        title: "ToanHoc",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const showHeader = useMatches({
    select: (matches) =>
      !matches.some((m) => m.staticData?.showHeader === false),
  });

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {showHeader && <Header />}
        <main className="layout">{children}</main>
        <Toaster richColor expand />
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
