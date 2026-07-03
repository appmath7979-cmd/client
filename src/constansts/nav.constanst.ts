import {
	BotIcon,
	CircleUserRoundIcon,
	HomeIcon,
	ScaleIcon,
	Users2Icon,
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
		href: "/customers",
		label: "Khách hàng",
		icon: Users2Icon,
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
