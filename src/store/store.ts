import { createStore } from "@lavaz/store";
import { getRewardBox } from "./boxes/get-reward.box";
import { updateRewardBox } from "./boxes/update-reward.box";
import { themeBox } from "./boxes/theme.box";
import { sideMenuBox } from "./boxes/side-menu.box";
import { lockBox } from "./boxes/lock.box";

export const store = createStore({
	updateReward: updateRewardBox,
	getReward: getRewardBox,
	theme: themeBox,
	sideMenu: sideMenuBox,
	lock: lockBox,
});
