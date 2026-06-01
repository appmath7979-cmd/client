import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authApi } from "#/api/auth.api";
import type { AuthSignInType, IAuthSignUpApi } from "#/types/auth.type";

export function useAuthQuery() {
  return {
    signUp: useMutation({
      mutationFn: (value: IAuthSignUpApi) => authApi.signUp(value),

    }),
    signIn: useMutation({
      mutationFn: (value: AuthSignInType) => authApi.signIn(value),
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error(error.message === "Tài khoản" ? "Username/Mật khẩu không đúng. Vui lòng thử lại!" : error.message);
      }
    }),
  };
}
