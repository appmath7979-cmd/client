import type { IBaseApi } from "../base.type";
import type { IPostRewardItemApi } from "../reward.type";

interface IGetRewardApiItem extends IPostRewardItemApi, IBaseApi {
	id: string;
}

interface IGetAllRewardApi extends IBaseApi {
	rewards: IGetRewardApiItem[];
}

export type { IGetRewardApiItem, IGetAllRewardApi };
