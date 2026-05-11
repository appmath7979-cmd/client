import type { User } from "#/types/auth.type";
import { createBox } from "@lavaz/store";

interface AuthState {
  user: User;
  message: string;
}

const initialState = {
  user: {
    id: "",
    username: "",
    phoneNumber: "",
    role: "GUEST",
    createdAt: "",
    updatedAt: "",
  },
  message: "",
} satisfies AuthState as AuthState;

export const authBox = createBox(initialState, (set) => ({
  setAuth: (auth: AuthState) => set((prev) => ({ ...prev, ...auth })),
})).create();
