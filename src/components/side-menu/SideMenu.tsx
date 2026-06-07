import { useAppStore } from "@lavaz/store";
import { useRef } from "react";
import { useClickOutside } from "#/hooks/useClickOutside";
import { cn } from "#/lib/utils";
import { store } from "#/store/store";
import { SideMenuBody } from "./SideMenuBody";
import { SideMenuFooter } from "./SideMenuFooter";
import { SideMenuHeader } from "./SideMenuHeader";

export function SideMenu() {
	const [isOpen, { setIsOpen }] = useAppStore(store.sideMenu, (s) => s);
	const ref = useRef<HTMLElement | null>(null);
	useClickOutside(ref, isOpen, setIsOpen);

	return (
		<>
			<aside
				ref={ref}
				className={cn(
					"absolute top-0 -left-full z-9999 w-xs h-dvh rounded-r-md border border-sidebar-border shadow-sidebar-accent p-4 flex flex-col gap-4 bg-sidebar text-sidebar-foreground trans-smooth",
					isOpen && "left-0",
				)}
			>
				<SideMenuHeader onToggle={setIsOpen} />
				<SideMenuBody />
				<SideMenuFooter />
			</aside>
			<div
				className={cn(
					"absolute top-0 left-0 z-9998 w-0 h-full opacity-0 invisible bg-background/60 trans-smooth blur-xs",
					isOpen && "w-full opacity-100 visible",
				)}
			/>
		</>
	);
}
