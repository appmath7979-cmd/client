import type { LucideIcon } from "lucide-react";

interface INavItem {
	label: string;
	href: string;
	icon?: LucideIcon;
	disabled?: boolean;
	external?: boolean;
}

type NavListType = INavItem[];

export type { INavItem, NavListType };
