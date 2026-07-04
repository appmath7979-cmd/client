import { createStore } from "@lavaz/store";
import { regionBox } from "./boxes/regionBox";

export const store = createStore({
	region: regionBox,
});
