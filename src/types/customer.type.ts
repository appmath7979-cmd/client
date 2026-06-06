import type z from "zod";
import type { BetPairSchema, CustomerSchema } from "#/schema/customer.schema";
import type { DetailListType, MessageType } from "./common.type";

type BetPairType = z.infer<typeof BetPairSchema>;
type CustomerType = z.infer<typeof CustomerSchema>;

type CustomerTypeDepartmentType = "GUEST" | "OWNER";
type CustomerCalcType = "1_lan" | "ky_ruoi" | "nhieu_lan";

interface IBetPair {
	label: string;
	c: number;
	t: number;
}

interface ISettings {
	BAC: IBetPair[];
	TRUNG: IBetPair[];
	NAM: IBetPair[];
}

interface ICustomer {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	fullName: string;
	phoneNumber: string;
	type: CustomerTypeDepartmentType;
	loaiCo: string;
	xienMB: boolean;
	tinhUi: boolean;
	tinhTrungDaT: string;
	tinhTrungDaX: string;
	settings: ISettings;
	userId: string | null;
}

type ICustomerReq = Omit<ICustomer, "id" | "createdAt" | "updatedAt">;
type ICustomerRes = MessageType & { customer: ICustomer };

interface ICustomerList extends MessageType, DetailListType {
	customers: ICustomer[] | null;
}

export type {
	BetPairType,
	CustomerType,
	CustomerTypeDepartmentType,
	CustomerCalcType,
	IBetPair,
	ISettings,
	ICustomer,
	ICustomerList,
	ICustomerReq,
	ICustomerRes,
};
