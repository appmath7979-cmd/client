import type { IGroupedBetItem } from "../message.type";
import type { RegionType } from "../region.type";
import type { IBaseApi, IBaseApiTime } from "./base.type";

interface IPostOrderMessageApi {
	region: RegionType;
	results: IGroupedBetItem[];
	release: string;
	customerId: string;
	type: "XAC";
}

type OrderItemApiType = IPostOrderMessageApi & { id: string } & IBaseApiTime;

interface IGetOrderMessageApi extends IBaseApi {
	orders: OrderItemApiType[];
}

interface IGetOrderMessageByIdApi extends IBaseApi {
	order: OrderItemApiType;
}

type IPatchOrderMessageApi = Partial<IPostOrderMessageApi> & { id: string };

export type {
	IPostOrderMessageApi,
	IGetOrderMessageApi,
	OrderItemApiType,
	IGetOrderMessageByIdApi,
	IPatchOrderMessageApi,
};
