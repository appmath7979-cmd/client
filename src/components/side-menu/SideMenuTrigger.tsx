import { useAppStore } from "@lavaz/store";
import { SidebarOpenIcon } from "lucide-react";
import { Button } from "../ui/button";
import { store } from "#/store/store";

export function SideMenuTrigger() {
	const [, { setIsOpen }] = useAppStore(store.sideMenu, (s) => s);
	return (
		<Button size={"icon"} onClick={() => setIsOpen()}>
			<SidebarOpenIcon />
		</Button>
	);
}
