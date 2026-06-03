import { LockKeyIcon, LockKeyOpenIcon } from "@phosphor-icons/react";
import { useAppStore } from "@lavaz/store";
import { Button } from "./ui/button";
import { store } from "#/store/store";

export function LockButton() {
	const [isLock, { setIsLock }] = useAppStore(store.lock, (s) => s.isLock);

	return (
		<Button variant={"ghost"} onClick={setIsLock} className="justify-start">
			{isLock ? <LockKeyOpenIcon /> : <LockKeyIcon />}
			<span>{isLock ? "Mở khóa" : "Khóa"} ứng dụng</span>
		</Button>
	);
}
