import type { CreateCustomerType } from "../customer.type";
import type { IBaseApi, IBaseApiTime } from "./base.type";

type CustomerStatusType = "ACTIVE" | "INACTIVE";

interface IPostCustomerApi extends CreateCustomerType {}

interface ICustomerListItemApi extends IBaseApiTime {
	id: string;
	fullName: string;
	status: CustomerStatusType;
	type: "khach" | "chu";
}

interface IGetCustomerByIdApi extends IBaseApi {
	customer: CreateCustomerType & { id: string };
}

interface IGetCustomerApi extends IBaseApi {
	customers: ICustomerListItemApi[];
}

export type {
	IPostCustomerApi,
	IGetCustomerApi,
	ICustomerListItemApi,
	IGetCustomerByIdApi,
};
