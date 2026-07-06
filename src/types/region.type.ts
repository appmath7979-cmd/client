type RegionType = "MB" | "MT" | "MN";

interface RegionDropdownItem {
	label: string;
	value: RegionType;
}

type RegionDropdownListType = RegionDropdownItem[];

export type { RegionDropdownListType, RegionType, RegionDropdownItem };
