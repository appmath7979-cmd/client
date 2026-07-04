import { navList } from "#/constants/nav.constant";
import { NavItem } from "./NavItem";

export function NavList() {
	return (
		<nav className="sticky bottom-2 left-1/2 w-fit -translate-x-1/2 rounded-full bg-primary p-2 z-999 text-primary-foreground shadow-md flex items-center">
			{navList.map((item) => (
				<NavItem
					key={item.label}
					href={item.href}
					label={item.label}
					icon={item.icon}
				/>
			))}
		</nav>
	);
}
