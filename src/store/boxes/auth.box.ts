import { createBox } from "@lavaz/store";
import type { IUser, IUserRes } from "#/types/user.type";

interface AuthState extends IUserRes {}

const initialState = {
	message: "",
	user: null,
} satisfies AuthState as AuthState;

export const authBox = createBox(initialState, (set) => ({
	signIn: (user: IUser | null, message: string) =>
		set((prev) => ({ ...prev, message, user })),
})).create();
