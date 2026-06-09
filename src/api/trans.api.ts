import type { MessageType } from "#/types/common.type";
import type { ITransReq } from "#/types/transaction.type";
import { baseApi } from "./base.api";

export const transApi = {
	post: async (inputData: ITransReq) => {
		const res = await baseApi.post("/transaction", inputData);
		const data: MessageType = res.data;
		return data;
	},
	get: async (customerId: string) => {
		const res = await baseApi.get(`/transaction?customerId=${customerId}`);
		const data = res.data;
		return data;
	},
};
