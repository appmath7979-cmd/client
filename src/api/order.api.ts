import type { IBaseApi } from "#/types/apis/base.type";
import type {
	IGetOrderMessageApi,
	IGetOrderMessageByIdApi,
	IPatchOrderMessageApi,
	IPostOrderMessageApi,
} from "#/types/apis/message.type";
import { apiRouteName, baseApi } from "./base.api";

export const orderApi = {
	getByDate: async (dateRelease: string) => {
		const res: IGetOrderMessageApi = await baseApi.get(
			`${apiRouteName.order}?release=${dateRelease}`,
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
};
