import { createBox } from "@lavaz/store";
import { formatDate } from "#/lib/format-date";
import type { RegionApiType } from "#/types/reward.type";

interface GetStationState {
	station: string;
	values: Array<number | number[]>;
}

interface GetRegionState {
	region: RegionApiType;
	stations: GetStationState[];
}

type GetRewardState = GetRegionState[];

const initalState: GetRewardState = [];

export const getRewardBox = createBox(initalState, (set) => ({
	setReward: (release: string, data: GetRewardState) => {
		const date = formatDate(new Date());

		if (release !== date) return;

		return set((prev) => {
			const newDataRegion = data.map((item) => item.region);

			const filters = prev.filter(
				(item) => !newDataRegion.includes(item.region),
			);

			return [...filters, ...data];
		});
	},
})).create();
