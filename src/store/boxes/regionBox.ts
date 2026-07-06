import { createBox } from "@lavaz/store";
import type { RegionDropdownItem, RegionType } from "#/types/region.type";

interface RegionState {
	region: RegionType;
	default: RegionDropdownItem;
}

const initialState: RegionState = {
	region: "MB",
	default: { label: "Miền Bắc", value: "MB" },
};

export const regionBox = createBox(initialState, (set) => ({
	setRegion: (region: RegionType) => set((prev) => ({ ...prev, region })),
})).create();
