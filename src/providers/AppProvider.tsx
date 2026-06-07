import type React from "react";
import { TooltipProvider } from "#/components/ui/tooltip";
import QueryProvider from "./QueryProvider";

export function AppProvider({ children }: { children: React.ReactNode }) {
	return (
		<QueryProvider>
			<TooltipProvider>{children}</TooltipProvider>
		</QueryProvider>
	);
}
