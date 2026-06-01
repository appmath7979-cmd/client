import { useAppStore } from "@lavaz/store";
import { useEffect, useState } from "react";
import { store } from "#/store/store";

export function useTheme() {
	const [theme] = useAppStore(store.theme, (s) => s.theme);
	const [isMount, setIsMount] = useState<boolean>(false);

	useEffect(() => {
		if (typeof window === "undefined") return;
		setIsMount(true);
	}, []);

	useEffect(() => {
		if (!isMount) return;

		function applyTheme() {
			const root = document.documentElement;
			root.classList.remove("dark", "light");

			const resolved =
				theme === "system"
					? window.matchMedia("(prefers-color-scheme: dark)").matches
						? "dark"
						: "light"
					: theme;

			root.classList.add(resolved);
		}

		applyTheme();
	}, [isMount, theme]);
}
