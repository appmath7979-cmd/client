import { SideMenuTrigger } from "./side-menu/SideMenuTrigger";

export function Header() {
	return (
		<header className="sticky top-0 left-0 z-50 w-full py-3 bg-primary text-primary-foreground flex justify-between items-center">
			<SideMenuTrigger />
			<h1 className="absolute top-1/2 left-1/2 -translate-1/2 z-50 font-bold text-lg uppercase">
				toán học
			</h1>
		</header>
	);
}
