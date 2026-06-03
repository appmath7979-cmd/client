import { createBox } from "@lavaz/store";

interface LockState {
	isLock: boolean;
	isActive: boolean;
	isLoggedIn: boolean;
}

const initialState = {
	isLock: false,
	isActive: true,
	isLoggedIn: false,
} satisfies LockState as LockState;

export const lockBox = createBox(initialState, (set) => ({
	setIsLock: () => set((prev) => ({ ...prev, isLock: !prev.isLock })),
	setIsActive: () => set((prev) => ({ ...prev, isActive: !prev.isActive })),
	setIsLoggedIn: () => set((prev) => ({ ...prev, isLoggedIn: !prev.isLoggedIn })),
})).create();
