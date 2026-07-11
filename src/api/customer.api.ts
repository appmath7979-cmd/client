import type { IBaseApi } from "#/types/apis/base.type";
import type {
	IGetCustomerApi,
	IGetCustomerByIdApi,
	IPostCustomerApi,
} from "#/types/apis/customer.type";
import { apiRouteName, baseApi } from "./base.api";

export const customerApi = {
	getById: async (customerId: string) => {
		const response: IGetCustomerByIdApi = await baseApi.get(
			`${apiRouteName.customer}/${customerId}`,
		);
		return response;
	},
	getAll: async () => {
		const response: IGetCustomerApi = await baseApi.get(
			`${apiRouteName.customer}`,
		);
		return response;
	},
	post: async (postData: IPostCustomerApi) => {
		const response: IBaseApi = await baseApi.post(
			`${apiRouteName.customer}`,
			postData,
		);
		return response;
	},
};
