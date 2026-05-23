import type { SignInSchema, SignUpSchema } from "#/schemas/auth.schema";
import type z from "zod";

type SignInType = z.infer<typeof SignInSchema>;
type SignUpType = z.infer<typeof SignUpSchema>;

export type { SignInType, SignUpType };
