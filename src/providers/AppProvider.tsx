import type React from "react";
import { Dialog } from "#/components/ui/dialog";
import { TooltipProvider } from "#/components/ui/tooltip";
import QueryProvider from "./QueryProvider";

export function AppProvider({ children }: { children: React.ReactNode }) {
	return (
		<QueryProvider>
			<Dialog>
				<TooltipProvider>{children}</TooltipProvider>
			</Dialog>
		</QueryProvider>
	);
}
