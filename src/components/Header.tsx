import { CaretLeftIcon } from "@phosphor-icons/react";
import { Link, useMatches } from "@tanstack/react-router";
import { SideMenuTrigger } from "./side-menu/SideMenuTrigger";
import { Button } from "./ui/button";

export function Header() {
	const matches = useMatches();
	const isBack = matches.some((m) => m.staticData?.isSidebar);
	const title = matches.find((m) => m.staticData.title)?.staticData.title;

	return (
		<header className="sticky top-0 left-0 z-50 w-full py-3 bg-primary text-primary-foreground flex justify-between items-center">
			{isBack ? (
				<SideMenuTrigger />
			) : (
				<Button asChild>
					<Link to="..">
						<CaretLeftIcon weight="bold" />
						<span>Trở lại</span>
					</Link>
				</Button>
			)}
			<h1 className="absolute top-1/2 left-1/2 -translate-1/2 z-50 font-bold text-lg uppercase">
				{title ?? "toán học"}
			</h1>
		</header>
	);
}
