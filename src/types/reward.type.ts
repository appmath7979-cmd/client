import type { IProvinceItem } from "./province.type";

interface IReward {
	day: string;
	MN: IProvinceItem[];
	MB: IProvinceItem[];
	MT: IProvinceItem[];
}

export type { IReward };
