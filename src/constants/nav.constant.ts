import {
	BotIcon,
	ChartNoAxesCombinedIcon,
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
		disabled: true,
	},
	{
		href: "/chatbot",
		label: "Chatbot",
		icon: BotIcon,
		disabled: false,
	},
	{
		href: "/customers",
		label: "Khách hàng",
		icon: Users2Icon,
		disabled: false,
	},
	{
		href: "/layoff",
		label: "Cân hàng",
		icon: ScaleIcon,
		disabled: false,
	},
	{
		href: "/report",
		label: "Báo cáo",
		icon: ChartNoAxesCombinedIcon,
		disabled: false,
	},
	{
		href: "/profile",
		label: "Cá nhân",
		icon: CircleUserRoundIcon,
		disabled: false,
	},
];
