import type { SignInType, SignUpType } from "#/types/auth.type";
import { baseApi } from "./base.api";

export const authApi = {
  signIn: async (data: SignInType) => {
    try {
      const res = await baseApi.post("/auth/signin", data);
      console.log(res.status);
      return res.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  signUp: async (data: Omit<SignUpType, "confirmPassword">) => {
    const res = await baseApi.post("/auth/signin", data);
    return res.data;
  },
  signOut: async () => {
    const res = await baseApi.post("/auth/signout");
    return res.data;
  },
};
