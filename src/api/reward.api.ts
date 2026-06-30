import type { IRewardApi, IRewardApiRes } from "#/types/reward.type";
import { baseApi } from "./base.api";

export const rewardApi = {
	post: async (bodyData: IRewardApi) => {
		const res = await baseApi.post("/reward", bodyData);
		const data: { message: string } = res.data;
		return data;
	},
	getPagination: async (page: number) => {
		const res = await baseApi.get(`/reward?page=${page}`);
		const data: IRewardApiRes = res.data;
		return data;
	},
};
