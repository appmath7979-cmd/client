import type { IBaseApi } from "#/types/apis/base.type";
import type {
	IGetOrderMessageApi,
	IPostOrderMessageApi,
} from "#/types/apis/message.type";
import { apiRouteName, baseApi } from "./base.api";

export const orderApi = {
	getByDate: async (dateRelease: string) => {
		const res: IGetOrderMessageApi = await baseApi.get(
			`${apiRouteName.order}?dateRelease=${dateRelease}`,
		);

		return res;
	},
	post: async (data: IPostOrderMessageApi) => {
		const res: IBaseApi = await baseApi.post(apiRouteName.order, data);
		return res;
	},
};
