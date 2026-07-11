import type { IGroupedBetItem } from "../message.type";
import type { RegionType } from "../region.type";
import type { IBaseApi } from "./base.type";

interface IPostOrderMessageApi {
	region: RegionType;
	results: IGroupedBetItem[];
	dateRelease: string;
	timeRelease: string;
	customerId: string;
}

interface IGetOrderMessageApi extends IBaseApi {
	orders: Array<IPostOrderMessageApi & { id: string }>;
}

export type { IPostOrderMessageApi, IGetOrderMessageApi };
