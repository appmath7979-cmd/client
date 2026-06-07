import { createStore } from "@lavaz/store";
import { authBox } from "./boxes/auth.box";
import { getRewardBox } from "./boxes/get-reward.box";
import { lockBox } from "./boxes/lock.box";
import { regionDropdownBox } from "./boxes/region-dropdown.box";
import { sideMenuBox } from "./boxes/side-menu.box";
import { testBox } from "./boxes/test.box";
import { themeBox } from "./boxes/theme.box";
import { updateRewardBox } from "./boxes/update-reward.box";

export const store = createStore({
	updateReward: updateRewardBox,
	getReward: getRewardBox,
	theme: themeBox,
	sideMenu: sideMenuBox,
	lock: lockBox,
	regionDropdown: regionDropdownBox,
	test: testBox,
	auth: authBox,
});
