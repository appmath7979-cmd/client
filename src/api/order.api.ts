import type { IBaseApi } from "#/types/apis/base.type";
import type {
	IGetOrderMessageApi,
	IGetOrderMessageByIdApi,
	IPatchOrderMessageApi,
	IPostOrderMessageApi,
} from "#/types/apis/message.type";
import { apiRouteName, baseApi } from "./base.api";

export const orderApi = {
	getByDate: async (release: string) => {
		const res: IGetOrderMessageApi = await baseApi.get(
			`${apiRouteName.order}?release=${release}`,
		);
		return res;
	},
	getByDateWithCustomerId: async (customerId: string, dateRelease: string) => {
		const res: IGetOrderMessageApi = await baseApi.get(
			`${apiRouteName.order}/customer/${customerId}?release=${dateRelease}`,
		);

		return res;
	},
	getById: async (id: string) => {
		const res: IGetOrderMessageByIdApi = await baseApi.get(
			`${apiRouteName.order}/${id}`,
		);
		return res;
	},
	post: async (data: IPostOrderMessageApi) => {
		const res: IBaseApi = await baseApi.post(apiRouteName.order, data);
		return res;
	},
	pacth: async (data: IPatchOrderMessageApi) => {
		const { id, ...restData } = data;
		const res: IGetOrderMessageByIdApi = await baseApi.patch(
			`${apiRouteName.order}/${id}`,
			restData,
		);
		return res;
	},
	deleteById: async (id: string) => {
		const res: IBaseApi = await baseApi.delete(`${apiRouteName.order}/${id}`);
		return res;
	},
	postLayoff: async (data: IPostOrderMessageApi) => {
		const res: IBaseApi = await baseApi.post(
			`${apiRouteName.order}/layoff`,
			data,
		);
		return res;
	},
};
