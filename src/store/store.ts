import { createStore } from "@lavaz/store";
import { createCustomerBox } from "./boxes/create-customer.box";
import { guardLinkBox } from "./boxes/guard-link.box";

export const store = createStore({
  createCustomer: createCustomerBox,
  guardLink: guardLinkBox,
});
