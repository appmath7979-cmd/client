import { createStore } from "@lavaz/store";
import { toasterBox } from "./boxes/toaster.box";

export const store = createStore({ toaster: toasterBox });
