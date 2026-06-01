import type { z } from "zod";
import type { AuthSignInSchema, AuthSignUpSchema } from "#/schema/auth.schema";
import type { IUser, UserRoleType } from "./user.type";

type AuthSignInType = z.infer<typeof AuthSignInSchema>;
type AuthSignUpType = z.infer<typeof AuthSignUpSchema>;

interface IAuthSignUpApi {
	username: string;
	phoneNumber: string;
	email?: string;
	password: string;
	role?: UserRoleType;
}

type AuthSignUpApiResType = {
	message: string;
};

interface IAuthSignInApiRes {
	message: string;
	user: IUser;
}

export type {
	AuthSignInType,
	AuthSignUpType,
	IAuthSignUpApi,
	AuthSignUpApiResType,
	IAuthSignInApiRes,
};
