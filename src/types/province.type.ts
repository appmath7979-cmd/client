import type { RegionType } from "./region.type";

interface IProvinceItem {
	code: string;
	name: string;
	syntax: string;
	region: RegionType;
}

type ProvinceListType = IProvinceItem[];

export type { IProvinceItem, ProvinceListType };
