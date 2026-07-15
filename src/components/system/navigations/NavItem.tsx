import { Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import type { INavItem } from "#/types/nav.type";
import { useMatchRoute } from "@tanstack/react-router";
import { cn } from "#/lib/utils";

export function NavItem({ href, label, icon }: INavItem) {
	const matchRoute = useMatchRoute();
	const isActive = matchRoute({ to: href, fuzzy: false });
	const Icon = icon ? icon : () => null;
	return (
		<Button
			variant={isActive ? "secondary" : "default"}
			render={<Link to={href} />}
			className={cn(
				"flex flex-col justify-center h-auto! gap-0 text-base!",
				isActive && "text-primary inset-shadow-sm",
			)}
		>
			<Icon size={30} className="size-[30px]!" />
			<p className="font-semibold">{label}</p>
		</Button>
	);
}
