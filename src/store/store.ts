import { createStore } from "@lavaz/store";
import { getRewardBox } from "./boxes/get-reward.box";
import { updateRewardBox } from "./boxes/update-reward.box";
import { themeBox } from "./boxes/theme.box";

export const store = createStore({
	updateReward: updateRewardBox,
	getReward: getRewardBox,
	theme: themeBox,
});
