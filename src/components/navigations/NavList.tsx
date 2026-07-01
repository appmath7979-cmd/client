import { navList } from "#/constansts/nav.constanst";
import { NavItem } from "./NavItem";

export function NavList() {
	return (
		<nav className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-primary px-6 py-4 z-999 text-primary-foreground shadow-md flex items-center gap-4">
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
