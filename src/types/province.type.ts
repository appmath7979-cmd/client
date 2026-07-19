import type { RegionType } from "./region.type";

interface IProvinceItem {
	code: string;
	name: string;
	syntax: string;
	region: RegionType;
}

interface IProvinceItemWithScore extends IProvinceItem {
	score: number;
}

type ProvinceListType = IProvinceItem[];

export type { IProvinceItem, ProvinceListType, IProvinceItemWithScore };
