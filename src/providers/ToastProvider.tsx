import { AnchoredToastProvider, ToastProvider } from "#/components/ui/toast";

export function ToastAppProvider({ children }: { children: React.ReactNode }) {
	return (
		<ToastProvider>
			<AnchoredToastProvider>{children}</AnchoredToastProvider>
		</ToastProvider>
	);
}
