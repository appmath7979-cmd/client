import type { TransTypeT } from "./common.type";
import type { RegionApiType } from "./reward.type";

interface ITransReq {
	release: string;
	region: RegionApiType;
	content: Array<string[]>;
	createTime: string;
	type: TransTypeT;
	customerId: string;
}

interface ITransItemRes extends ITransReq {
	id: "938ef41c-68a7-4207-9689-9e9cdbfdd1ff";
	createdAt: "2026-06-20T11:48:56.830Z";
	updatedAt: "2026-06-20T11:48:56.830Z";
}

interface ITransRes {
	message: "Tìm kiếm tin nhắn thành công.";
	transactions: ITransItemRes[];
}

export type { ITransReq, ITransItemRes, ITransRes };
