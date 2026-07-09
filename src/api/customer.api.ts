import type { IGetCustomerApi } from "#/types/apis/customer.type";
import { baseApi } from "./base.api";

export const customerApi = {
	getAll: async () => {
		const res = await baseApi.get("/customer");
		const data: IGetCustomerApi = res.data;

		return data;
	},
};
