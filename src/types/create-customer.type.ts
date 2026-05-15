import { z } from "zod";
import {
  BetPairSchema,
  CreateCustomerSchema,
} from "../schemas/create-customer.schema";

export type CreateCustomerType = z.infer<typeof CreateCustomerSchema>;
export type BetPairType = z.infer<typeof BetPairSchema>;

export interface IRegion {
  key: string;
  label: string;
  value: "BAC" | "TRUNG" | "NAM";
}

export type RegionType = IRegion[];
