import { Link, useChildMatches } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import { cn } from "#/lib/utils";
import type { INavItem } from "#/types/nav.type";

export function NavItem({ href, label, icon }: INavItem) {
	const isActive = useChildMatches()[0].fullPath.includes(href);
	const Icon = icon ? icon : () => null;

	return (
		<Button
			variant={isActive ? "secondary" : "default"}
			render={<Link to={href} />}
			className={cn(
				"flex flex-col justify-center h-auto! gap-1 md:gap-0 text-base! max-md:py-2",
				isActive && "text-primary inset-shadow-sm",
			)}
		>
			<Icon size={30} className="size-[24px] md:size-[30px]!" />
			<p className="font-semibold max-md:hidden">{label}</p>
		</Button>
	);
}
