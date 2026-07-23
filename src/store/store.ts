import { createStore } from "@lavaz/store";
import { copyLayoffMessageBox } from "./boxes/copyLayoffMessageBox";
import { regionBox } from "./boxes/regionBox";

export const store = createStore({
	region: regionBox,
	copyLayoff: copyLayoffMessageBox,
});
