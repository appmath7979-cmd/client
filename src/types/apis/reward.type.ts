import type { RegionType } from "../region.type";

interface IPostRewardItemApi {
	provinceCode: string;
	release: string;
	region: RegionType;
	gdb: string[];
	g1: string[];
	g2: string[];
	g3: string[];
	g4: string[];
	g5: string[];
	g6: string[];
	g7: string[];
	g8: string[];
}

export type { IPostRewardItemApi };
