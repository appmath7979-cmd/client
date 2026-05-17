import { createStore } from "@lavaz/store";
import { guardLinkBox } from "./boxes/guard-link.box";
import { toasterBox } from "./boxes/toaster.box";
import { authBox } from "./boxes/auth.box";
import { awardBox } from "./boxes/award.box";

export const store = createStore({
  guardLink: guardLinkBox,
  toaster: toasterBox,
  auth: authBox,
  awardData: awardBox,
});
