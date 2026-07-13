import type { IGroupedBetItem } from "../message.type";
import type { RegionType } from "../region.type";
import type { IBaseApi } from "./base.type";

interface IPostOrderMessageApi {
	region: RegionType;
	results: IGroupedBetItem[];
	dateRelease: string;
	timeRelease: string;
	customerId: string;
	type: "XAC";
}

type OrderItemApiType = Array<IPostOrderMessageApi & { id: string }>;

interface IGetOrderMessageApi extends IBaseApi {
	orders: OrderItemApiType;
}

export type { IPostOrderMessageApi, IGetOrderMessageApi, OrderItemApiType };
