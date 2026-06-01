import { createBox } from "@lavaz/store";

type ThemeType = "dark" | "light" | "system";

interface ThemeState {
	theme: ThemeType;
}

const initialState = { theme: "light" } satisfies ThemeState as ThemeState;

export const themeBox = createBox(initialState, (set) => ({
	setTheme: (value: ThemeType) => set((prev) => ({ ...prev, theme: value })),
}))
	.persist("theme")
	.create();
