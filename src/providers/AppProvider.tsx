import { Dialog } from "#/components/ui/dialog";
import { QueryProvider } from "./QueryProvider";
import { ToastAppProvider } from "./ToastProvider";

export function AppProvider({ children }: { children: React.ReactNode }) {
	return (
		<QueryProvider>
			<ToastAppProvider>
				<Dialog>{children}</Dialog>
			</ToastAppProvider>
		</QueryProvider>
	);
}
