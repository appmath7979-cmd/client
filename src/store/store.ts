import { createStore } from "@lavaz/store";
import { copyLayoffMessageBox } from "./boxes/copyLayoffMessageBox";
import { regionBox } from "./boxes/regionBox";
import { rewardBox } from "./boxes/rewardBox";

export const store = createStore({
	region: regionBox,
	copyLayoff: copyLayoffMessageBox,
	reward: rewardBox,
});
