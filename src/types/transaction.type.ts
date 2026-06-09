interface ITransContent {
	region: string;
	station: string;
	target: number | number[];
	syntax: string;
	score: number;
}

interface ITransReq {
	release: string;
	content: ITransContent[];
	customerId: string;
}

export type { ITransContent, ITransReq };
