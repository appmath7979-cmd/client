import { createBox } from "@lavaz/store";

type SideMenuState = boolean;

const initalState: SideMenuState = false;

export const sideMenuBox = createBox(initalState, (set) => ({
	setIsOpen: (value?: boolean) =>
		set((prev) => (typeof value === "boolean" ? value : !prev)),
})).create();
