import { createStore } from "@lavaz/store";
import { updateRewardBox } from "./boxes/update-reward.box";

export const store = createStore({ updateReward: updateRewardBox })