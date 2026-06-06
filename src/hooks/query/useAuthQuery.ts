import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authApi } from "#/api/auth.api";
import type { AuthSignInType, IAuthSignUpApi } from "#/types/auth.type";
import { useAppStore } from "@lavaz/store";
import { store } from "#/store/store";

export function useAuthQuery() {
	const [, { setIsLoggedIn }] = useAppStore(store.lock, (s) => s.isLoggedIn);
	const [, { signIn }] = useAppStore(store.auth, (s) => s);
	return {
		signUp: useMutation({
			mutationFn: (value: IAuthSignUpApi) => authApi.signUp(value),
			onSuccess: (data) => {
				toast.success(data.message);
			},
			onError: (error) => {
				toast.error(error.message);
			},
		}),
		signIn: useMutation({
			mutationFn: (value: AuthSignInType) => authApi.signIn(value),
			onSuccess: (data) => {
				setIsLoggedIn();
				signIn(data.user, data.message);
				toast.success(data.message);
			},
			onError: (error) => {
				toast.error(
					error.message === "Tài khoản"
						? "Username/Mật khẩu không đúng. Vui lòng thử lại!"
						: error.message,
				);
			},
		}),
	};
}
