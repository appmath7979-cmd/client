import { createStore } from "@lavaz/store";
import { getRewardBox } from "./boxes/get-reward.box";
import { updateRewardBox } from "./boxes/update-reward.box";

export const store = createStore({
	updateReward: updateRewardBox,
	getReward: getRewardBox,
});
