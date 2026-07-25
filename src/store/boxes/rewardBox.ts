import { createBox } from "@lavaz/store";
import type { IPostRewardItemApi } from "#/types/apis/reward.type";

interface RewardState {
	values: IPostRewardItemApi[];
}

const initialState = { values: [] } satisfies RewardState as RewardState;

export const rewardBox = createBox(initialState, (set) => ({
	setReward: (reward: IPostRewardItemApi) =>
		set((prev) => {
			const isExistingItem = prev.values.find(
				(item) =>
					item.provinceCode === reward.provinceCode &&
					item.region === reward.region,
			);

			if (!isExistingItem)
				return {
					values: [...prev.values, reward],
				};
			const updatedValues = prev.values.map((item) => {
				if (
					item.provinceCode === reward.provinceCode &&
					item.region === reward.region
				)
					return reward;
				return item;
			});

			return {
				values: updatedValues,
			};
		}),
})).create();
