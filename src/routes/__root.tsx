import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtoolsPanel } from "@tanstack/react-form-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Toaster } from "sonner";

import { Header } from "#/components/Header";
import Navigation from "#/components/navigation/Navigation";
import { SideMenu } from "#/components/side-menu/SideMenu";
import { RootGuard } from "#/guards/RootGuard";
import { useTheme } from "#/hooks/useTheme";
import { AppProvider } from "#/providers/AppProvider";

import appCss from "../styles.css?url";

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
				title: "Toan Hoc",
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
	useTheme();

	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<AppProvider>
					<SideMenu />
					{<Header />}
					<RootGuard>
						<main>{children}</main>
					</RootGuard>
					<Navigation />
					<Toaster richColors expand={false} closeButton />
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
							{
								name: "Tanstack Query",
								render: <ReactQueryDevtoolsPanel />,
							},
							{
								name: "Tanstack Form",
								render: <FormDevtoolsPanel />,
							},
						]}
					/>
					<Scripts />
				</AppProvider>
			</body>
		</html>
	);
}
