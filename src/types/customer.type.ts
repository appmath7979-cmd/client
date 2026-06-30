import type z from "zod";
import type { CustomerSchema } from "#/schema/customer.schema";

type CreateCustomerType = z.infer<typeof CustomerSchema>;

interface IBetPair {
	key: string;
	label: string;
	c: number;
	t: number;
	loai: "ti_le" | "thanh_tien";
}

interface ICustomerListInfoApi {
	id: string;
	fullName: string;
	type: "OWNER" | "GUEST";
}

interface ICustomerListApi {
	message: string;
	customers: ICustomerListInfoApi[];
	total: number;
}

interface ICustomerDetailsItem extends CreateCustomerType {
	id: string;
	createTime: string;
	createdAt: Date;
	updatedAt: Date;
}

interface ICustomerDetailsRes {
	message: string;
	customer: ICustomerDetailsItem;
}
export type {
	IBetPair,
	CreateCustomerType,
	ICustomerListInfoApi,
	ICustomerListApi,
	ICustomerDetailsItem,
	ICustomerDetailsRes,
};
