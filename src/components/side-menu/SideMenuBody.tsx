import { LockButton } from "../LockButton";
import ModeToggle from "../ModeToggle";

export function SideMenuBody() {
	return (
		<div className="flex flex-col gap-2">
			<ModeToggle className="justify-start" />
			<LockButton />
		</div>
	);
}
