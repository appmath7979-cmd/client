import { MenuIcon } from "lucide-react";
import { Button } from "../ui/button";

export function Header() {
	return (
		<header className="sticky top-0 left-0 z-9999 bg-background/80 backdrop-blur-sm p-4 shadow-md flex justify-between items-center">
			<Button variant={"outline"} size={"icon"}>
				<MenuIcon />
			</Button>
			<h1 className="absolute top-1/2 left-1/2 transform -translate-1/2 text-xl font-semibold uppercase text-primary cursor-default">
				Toán Học
			</h1>
		</header>
	);
}
