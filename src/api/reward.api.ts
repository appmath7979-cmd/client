import type { IBaseApi } from "#/types/apis/base.type";
import type { IGetAllRewardApi } from "#/types/apis/query/reward.type";
import type { IPostRewardItemApi } from "#/types/apis/reward.type";
import { apiRouteName, baseApi } from "./base.api";

export const rewardApi = {
	post: async (data: IPostRewardItemApi[]) => {
		const res: IBaseApi = await baseApi.post(apiRouteName.reward, data);
		return res;
	},
	get: async (release: string) => {
		const res: IGetAllRewardApi = await baseApi.get(
			`${apiRouteName.reward}?release=${release}`,
		);
		return res;
	},
};
