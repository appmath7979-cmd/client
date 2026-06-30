import type {
	CreateCustomerType,
	ICustomerDetailsRes,
	ICustomerListApi,
} from "#/types/customer.type";
import { baseApi } from "./base.api";

export const customerApi = {
	getAllCustomer: async (userId: string) => {
		const res = await baseApi.get("/customer", { data: userId });

		const data: ICustomerListApi = res.data;
		return data;
	},
	getCustomerById: async (customerId: string) => {
		const res = await baseApi.get(`/customer/${customerId}`);
		const data: ICustomerDetailsRes = res.data;
		return data;
	},
	createCustomer: async (data: CreateCustomerType & { userId: string }) => {
		await baseApi.post("/customer", data);
	},
	deleteCustomer: async (id: string) => await baseApi.delete(`/customer/${id}`),

	deleteManyCustomer: async (ids: string[]) =>
		await baseApi.delete("/customer/many", { data: ids }),
};
