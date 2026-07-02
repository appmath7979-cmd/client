import { Dialog } from "#/components/ui/dialog";

export function AppProvider({ children }: { children: React.ReactNode }) {
	return <Dialog>{children}</Dialog>;
}
