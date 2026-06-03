import type z from "zod";
import type { BetPairSchema, CustomerSchema } from "#/schema/customer.schema";

type BetPairType = z.infer<typeof BetPairSchema>;
type CustomerType = z.infer<typeof CustomerSchema>;

type CustomerTypeDepartmentType = "GUEST" | "OWNER";
type CustomerCalcType = "1_lan" | "ky_ruoi" | "nhieu_lan";

export type {
	BetPairType,
	CustomerType,
	CustomerTypeDepartmentType,
	CustomerCalcType,
};
