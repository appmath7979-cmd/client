import type { RegionType } from "#/types/region.type";

interface IGetAllOrderMessageQueryApi {
	release?: string;
	isLayoff?: boolean;
	isSend?: boolean;
	region: RegionType;
}

interface IGetOrderByCustomerIdQueryApi {
	customerId: string;
	region: RegionType;
	release: string;
}

export type { IGetAllOrderMessageQueryApi, IGetOrderByCustomerIdQueryApi };
