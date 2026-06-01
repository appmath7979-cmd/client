import { Link } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function SideMenuFooter() {
	return (
		<div className="mt-auto border-t pt-1">
			<Link
				to="/profile"
				className="rounded-md p-2 pr-0 flex items-center gap-3 trans-smooth hover:bg-muted"
			>
				<Avatar>
					<AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<div className="w-full">
					<p className="font-bold tracking-tight truncate capitalize">Display name</p>
					<p className="font-semibold text-xs text-muted-foreground uppercase">
						role
					</p>
				</div>
			</Link>
		</div>
	);
}
