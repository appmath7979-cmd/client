import type { z } from "zod";
import type {
	BetPairSchema,
	CreateCustomerSchema,
} from "#/schemas/create-customer.schema";

type BetPairType = z.infer<typeof BetPairSchema>;
type CreateCustomerType = z.infer<typeof CreateCustomerSchema>;

type CreateTypeValueCustomerType = "khach" | "chu";

interface ICreateTypeCustomerItem {
	label: string;
	value: CreateTypeValueCustomerType;
}

export type {
	BetPairType,
	CreateCustomerType,
	CreateTypeValueCustomerType,
	ICreateTypeCustomerItem,
};
