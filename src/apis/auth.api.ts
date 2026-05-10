import type { SignInType, SignUpType } from "#/types/auth.type";
import { baseApi } from "./base.api";

export const authApi = {
  signIn: async (data: SignInType) => {
    try {
      const res = await baseApi.post("/auth/signin", data);
      return res.data;
    } catch (error: any) {
      throw error;
    }
  },
  signUp: async (data: Omit<SignUpType, "confirmPassword">) => {
    const res = await baseApi.post("/auth/signup", data);
    return res.data;
  },
  signOut: async () => {
    const res = await baseApi.post("/auth/signout");
    return res.data;
  },
};
