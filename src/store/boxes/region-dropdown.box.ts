import { createBox } from "@lavaz/store";
import { regions } from "#/constants/regions.contanst";
import type { RegionType } from "#/types/reward.type";

interface RegionState {
	value: RegionType;
	regions: RegionType[];
}

const initialState = {
	value: "mien-bac",
	regions,
} satisfies RegionState as RegionState;

export const regionDropdownBox = createBox(initialState, (set) => ({
	setValue: (value: RegionType) => set((prev) => ({ ...prev, value })),
})).create();
