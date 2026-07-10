import type { IBaseApi } from "#/types/apis/base.type";
import type {
	IGetCustomerApi,
	IPostCustomerApi,
} from "#/types/apis/customer.type";
import { baseApi } from "./base.api";

export const customerApi = {
	getAll: async () => {
		const res: IGetCustomerApi = await baseApi.get("/customer");
		return res;
	},
	post: async (postData: IPostCustomerApi) => {
		const res: IBaseApi = await baseApi.post("/customer", postData);
		return res;
	},
};
