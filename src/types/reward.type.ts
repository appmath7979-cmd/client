type RegionType = "mien-bac" | "mien-trung" | "mien-nam";
type RegionApiType = "SOUTH" | "NORTH" | "CENTRAL";

interface IRegionApi {
	region: RegionApiType;
	station: string;
	results: string[];
}

interface IRewardApi {
	release: string;
	rewards: IRegionApi[];
}

interface IRegionRewardApiRes {
	id: string;
	region: RegionApiType;
	station: string;
	results: string[];
	createdAt: string;
	updatedAt: string;
	rewardId: string;
}

interface IRewardApiRes {
	message: string;
	rewards: {
		id: string;
		release: string;
		createdAt: string;
		updatedAt: string;
		rewards: IRegionRewardApiRes[];
	}[];
}

export type {
	RegionType,
	IRegionApi,
	IRewardApi,
	RegionApiType,
	IRewardApiRes,
	IRegionRewardApiRes,
};
