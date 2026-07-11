import { Dialog } from "#/components/ui/dialog";
import { ToastAppProvider } from "./ToastProvider";

export function AppProvider({ children }: { children: React.ReactNode }) {
	return (
		<ToastAppProvider>
			<Dialog>{children}</Dialog>
		</ToastAppProvider>
	);
}
