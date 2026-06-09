import { SidebarCloseIcon } from "lucide-react";
import type { SideMenuProps } from "#/types/props.type";
import { Button } from "../ui/button";

export function SideMenuHeader({ onToggle }: SideMenuProps) {
	return (
		<div className="flex justify-between items-center">
			<div className="*:leading-4">
				<h2 className="font-bold text-lg text-primary uppercase">toanhoc</h2>
				<p className="text-xs font-semibold text-muted-foreground">
					Con đường của những giấc mơ
				</p>
			</div>
			<Button variant={"ghost"} size={"icon"} onClick={() => onToggle()}>
				<SidebarCloseIcon />
			</Button>
		</div>
	);
}
