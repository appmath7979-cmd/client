import type { IBaseApi } from "#/types/apis/base.type";
import type {
	IGetSettingApi,
	IPostSettingApi,
} from "#/types/apis/standard-setting.type";
import { apiRouteName, baseApi } from "./base.api";

export const standardSettingApi = {
	get: async (day: number) => {
		const res: IGetSettingApi = await baseApi.get(
			`${apiRouteName.setting}?day=${day}`,
		);
		return res;
	},
	post: async (data: IPostSettingApi[]) => {
		const res: IBaseApi = await baseApi.post(apiRouteName.setting, data);
		return res;
	},
	put: async (payload: { data: IPostSettingApi[]; ids: string[] }) => {
		const res: IBaseApi = await baseApi.put(apiRouteName.setting, payload);
		return res;
	},
};
