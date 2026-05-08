import { createStore } from "@lavaz/store";
import { createCustomerBox } from "./boxes/create-customer.box";

export const store = createStore({
  createCustomer: createCustomerBox,
});
