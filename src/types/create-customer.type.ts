import type { z } from "zod";
import type {
	BetPairSchema,
	CreateCustomerSchema,
} from "#/schemas/create-customer.schema";

type BetPairType = z.infer<typeof BetPairSchema>;
type CreateCustomerType = z.infer<typeof CreateCustomerSchema>;

type CreateTypeValueCustomerType = "khach" | "chu";
type CreateDaValueType = "1 lần" | "ky rưỡi" | "nhiều cặp";

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

export type {
	BetPairType,
	CreateCustomerType,
	CreateTypeValueCustomerType,
	ICreateToggleItem,
	CreateToggleListType,
	CreateDaValueType,
	SettingRecordItem,
	ICreateTypeSettingBet,
};
