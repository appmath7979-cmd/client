import { createBox } from "@lavaz/store";
import type { RegionType } from "#/types/region.type";

interface RegionState {
	region: RegionType;
}

const initialState: RegionState = {
	region: "MB",
};

export const regionBox = createBox(initialState, (set) => ({
	setRegion: (region: RegionType) => set((prev) => ({ ...prev, region })),
})).create();
