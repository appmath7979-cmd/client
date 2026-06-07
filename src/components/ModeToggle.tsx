import { useAppStore } from "@lavaz/store";
import { MoonIcon, SunDimIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { cn } from "#/lib/utils";
import { store } from "#/store/store";
import { Button } from "./ui/button";

export default function ModeToggle({ className }: { className?: string }) {
	const [theme, { setTheme }] = useAppStore(store.theme, (s) => s.theme);
	const [mounted, setMounted] = useState<boolean>(false);
	const isDark = theme === "dark";

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<Button
			variant={"ghost"}
			onClick={() => setTheme(isDark ? "light" : "dark")}
			className={cn("", className)}
		>
			{isDark ? (
				<SunDimIcon weight="fill" className="text-orange-700" />
			) : (
				<MoonIcon weight="bold" className="text-blue-500" />
			)}
			<span>Chế độ {isDark ? "sáng" : "tối"}</span>
		</Button>
	);
}
