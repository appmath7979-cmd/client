import type { CreateCustomerType } from "../customer.type";
import type { IBaseApi, IBaseApiTime } from "./base.type";

type CustomerType = "ACTIVE" | "INACTIVE";

interface IPostCustomerApi extends CreateCustomerType {}

interface ICustomerListItemApi extends IBaseApiTime {
	id: string;
	fullName: string;
	status: CustomerType;
	type: CustomerType;
}

interface IGetCustomerApi extends IBaseApi {
	customers: ICustomerListItemApi[];
}

export type { IPostCustomerApi, IGetCustomerApi, ICustomerListItemApi };
