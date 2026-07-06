import type { RegionDropdownListType, RegionType } from "#/types/region.type";

const regionDropdownList: RegionDropdownListType = [
	{ label: "Miền Bắc", value: "MB" },
	{ label: "Miền Trung", value: "MT" },
	{ label: "Miền Nam", value: "MN" },
];

const regionMapper: Record<RegionType, string> = {
	MB: "Miền Bắc",
	MT: "Miền Trung",
	MN: "Miền Nam",
};

const regionNameList: RegionType[] = ["MB", "MT", "MN"];

export { regionMapper, regionDropdownList, regionNameList };
