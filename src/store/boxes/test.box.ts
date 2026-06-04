import { createBox } from "@lavaz/store";

interface TestState {
	value: string;
}

const initialState = { value: "" } satisfies TestState as TestState;

export const testBox = createBox(initialState, (set) => ({
	setValue: (value: string) => set((prev) => ({ ...prev, value })),
})).create();
