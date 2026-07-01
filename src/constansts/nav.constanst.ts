import {
	BotIcon,
	CircleUserRoundIcon,
	HomeIcon,
	ScaleIcon,
} from "lucide-react";
import type { NavListType } from "#/types/nav.type";

export const navList: NavListType = [
	{
		href: "/home",
		label: "Trang chủ",
		icon: HomeIcon,
	},
	{
		href: "/chatbot",
		label: "Chatbot",
		icon: BotIcon,
	},
	{
		href: "/layoff",
		label: "Cân hàng",
		icon: ScaleIcon,
	},
	{
		href: "/profile",
		label: "Cá nhân",
		icon: CircleUserRoundIcon,
	},
];
