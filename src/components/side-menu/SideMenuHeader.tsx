import { SidebarCloseIcon } from "lucide-react";
import type { SideMenuProps } from "#/types/props.type";
import { Button } from "../ui/button";

export function SideMenuHeader({ onToggle }: SideMenuProps) {
	return (
		<div className="flex justify-between items-center">
			<h2 className="font-bold text-lg text-primary uppercase">toanhoc</h2>
			<Button variant={"ghost"} size={"icon"} onClick={() => onToggle()}>
				<SidebarCloseIcon />
			</Button>
		</div>
	);
}
