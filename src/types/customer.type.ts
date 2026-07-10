import type { z } from "zod";
import type {
	BetPairSchema,
	CreateCustomerSchema,
} from "#/schemas/create-customer.schema";

type BetPairType = z.infer<typeof BetPairSchema>;
type CreateCustomerType = z.infer<typeof CreateCustomerSchema>;

type CustomerType = "khach" | "chu";
type DaValueType = "1 lần" | "ky rưỡi" | "nhiều cặp";

interface ICreateToggleItem {
	label: string;
	value: string;
}

interface ICreateTypeSettingBet {
	tile: ICreateToggleItem;
	thanhtien: ICreateToggleItem;
}

type CreateToggleListType = ICreateToggleItem[];

type SettingRecordItem = Record<
	string,
	{
		c: Record<string, number>;
		t: Record<string, number>;
		type: "tile" | "thanhtien";
	}
>;

type SelectCustomerType = Record<CustomerType, string[]>;

export type {
	BetPairType,
	CreateCustomerType,
	ICreateToggleItem,
	CreateToggleListType,
	DaValueType,
	SettingRecordItem,
	ICreateTypeSettingBet,
	CustomerType,
	SelectCustomerType,
};
