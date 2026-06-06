import type {
	ICustomerList,
	ICustomerReq,
	ICustomerRes,
} from "#/types/customer.type";
import { baseApi } from "./base.api";

export const customerApi = {
	getAllCustomerForAdmin: async () => {
		const res = await baseApi.get("/customer");
		const data: ICustomerList = res.data;
		return data;
	},
	getAllCustomerForUser: async (
		userId: string,
		page: number = 1,
		limit: number = 10,
	) => {
		const res = await baseApi.get(
			`/customer?page=${page}&limit=${limit}&userId=${userId}`,
		);
		const data: ICustomerList = res.data;
		return data;
	},
	getByIdForUser: async (id: string, userId: string) => {
		const res = await baseApi.get(`/customer/${id}?userId=${userId}`);
		const data: ICustomerRes = res.data;
		return data;
	},
	createCustomer: async (inputData: ICustomerReq) => {
		const res = await baseApi.post("/customer", inputData);
		const data: { message: string } = res.data;
		return data;
	},
};
