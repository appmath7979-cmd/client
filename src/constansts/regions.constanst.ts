import type { RegionListType, RegionType } from "#/types/region.type";

const regionNameList: RegionListType = ["MB", "MT", "MN"];

const regionMapper: Record<RegionType, string> = {
	MB: "Miền Bắc",
	MT: "Miền Trung",
	MN: "Miền Nam",
};

export { regionMapper, regionNameList };
