import { Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import type { INavItem } from "#/types/nav.type";

export function NavItem({ href, label, icon }: INavItem) {
	const Icon = icon ? icon : () => null;
	return (
		<Button
			render={<Link to={href} />}
			className="flex flex-col justify-center items-center h-auto! gap-0 text-base!"
		>
			<Icon size={30} className="size-[30px]!" />
			<p className="font-semibold">{label}</p>
		</Button>
	);
}
