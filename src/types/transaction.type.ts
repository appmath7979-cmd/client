import type { RegionType } from "./reward.type";

interface IRegionSelectTrans {
	station: string;
	region: RegionType;
	valueString: string;
	syntaxes: string[];
	scores: number[];
	targets: number[];
}

interface ITransaction {
	release: string;
	content: IRegionSelectTrans;
}

export type { IRegionSelectTrans, ITransaction };
