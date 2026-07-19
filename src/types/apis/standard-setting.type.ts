import type { RegionType } from "../region.type";
import type { IBaseApi } from "./base.type";

interface IGetSettingItemApi {
	day: number;
	id: string;
	syntax: string;
	provinceCode: string;
	region: RegionType;
	score: number;
	createdAt: string;
	updatedAt: string;
}

interface IGetSettingApi extends IBaseApi {
	settings: IGetSettingItemApi[];
}

interface IPostSettingApi {
	day: number;
	syntax: string;
	provinceCode: string;
	region: RegionType;
	score: number;
}

export type { IPostSettingApi, IGetSettingApi, IGetSettingItemApi };
