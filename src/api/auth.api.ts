import type {
	AuthSignInType,
	AuthSignUpApiResType,
	IAuthSignInApiRes,
	IAuthSignUpApi,
} from "#/types/auth.type";
import { baseApi } from "./base.api";

export const authApi = {
	signIn: async (bodyData: AuthSignInType) => {
		const res = await baseApi.post("/auth/sign-in", bodyData);
		const data: IAuthSignInApiRes = res.data
		return data
	},
	signUp: async (bodyData: IAuthSignUpApi) => {
		const res = await baseApi.post("/auth/sign-up", bodyData);
		const data: AuthSignUpApiResType = res.data;
		return data;
	},
};
