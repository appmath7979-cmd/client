import { QueryClientProvider } from "@tanstack/react-query";
import type React from "react";
import { getQueryClient } from "#/lib/app-query";

export default function QueryProvider(props: { children: React.ReactNode }) {
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			{props.children}
		</QueryClientProvider>
	);
}
