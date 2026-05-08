import type { SignInSchema, SignUpSchema } from "#/schemas/auth.schema";
import { z } from "zod";

export type SignInType = z.infer<typeof SignInSchema>;
export type SignUpType = z.infer<typeof SignUpSchema>;
