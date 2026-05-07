import type { CreateCustomerSchema } from "#/schemas/create-customer.schema";
import z from "zod";

export type createCustomerType = z.infer<typeof CreateCustomerSchema>;
