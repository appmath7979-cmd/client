import type {
  CreateCustomerSchema,
  CreateRegionSettingSchema,
  CreateSettingSchema,
  RegionPatternSchema,
} from "#/schemas/create-customer.schema";
import z from "zod";

export type RegionPattenType = z.infer<typeof RegionPatternSchema>;
export type CreateRegionSettingType = z.infer<typeof CreateRegionSettingSchema>;
export type CreateSettingSchemaType = z.infer<typeof CreateSettingSchema>;
export type CreateCustomerType = z.infer<typeof CreateCustomerSchema>;
