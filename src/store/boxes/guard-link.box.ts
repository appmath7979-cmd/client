import { createBox } from "@lavaz/store";

interface GuardLinkState {
  count: number;
  isLogin: boolean;
}

const initialState = {
  count: 0,
  isLogin: false,
} satisfies GuardLinkState as GuardLinkState;

export const guardLinkBox = createBox(initialState, (set) => ({
  setCount: () => set((prev) => ({ ...prev, count: prev.count + 1 })),
})).create();
