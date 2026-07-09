import type { CreateCustomerType } from "../create-customer.type";

type CustomerType = "ACTIVE" | "INACTIVE";

interface IPostCustomerApi extends CreateCustomerType {}

interface ICustomerListItemApi {
	id: string;
	fullName: string;
	status: CustomerType;
	createdAt: string;
	updatedAt: string;
}

interface IGetCustomerApi {
	message: string;
	customers: ICustomerListItemApi[];
}

export type { IPostCustomerApi, IGetCustomerApi };
