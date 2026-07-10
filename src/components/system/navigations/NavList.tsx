import { navList } from "#/constants/nav.constant";
import { NavItem } from "./NavItem";

export function NavList() {
	return (
		<nav className="fixed bottom-0 inset-x-0 mx-auto bg-primary p-2 z-40 text-primary-foreground shadow-md flex justify-center items-center">
			{navList.map((item) => {
				const { label, href, icon } = item;
				return <NavItem key={label} href={href} label={label} icon={icon} />;
			})}
		</nav>
	);
}
