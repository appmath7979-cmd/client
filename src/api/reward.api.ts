import { formatDate } from "#/lib/format-date";
import type { IRewardApi, IRewardApiRes } from "#/types/reward.type";
import { baseApi } from "./base.api";

export const rewardApi = {
	post: async (bodyData: IRewardApi) => {
		const res = await baseApi.post("/reward", bodyData);
		const data: IRewardApiRes = res.data;
		return data;
	},
	getByTime: async (date: Date | undefined) => {
		if (!date) throw new Error("error");
		const release = formatDate(date);

		const res = await baseApi.get("/reward", {
			params: { release },
		});

		const data: IRewardApiRes = res.data;
		return data;
	},
};
