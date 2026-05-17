import type { IAwardData } from "#/types/award.type";
import { createBox } from "@lavaz/store";

interface AwardState {
  data: IAwardData[];
}

const initialState = {
  data: [],
} satisfies AwardState as AwardState;

export const awardBox = createBox(initialState, (set) => ({
  setData: (value: IAwardData) =>
    set((prev) => ({ ...prev, data: [...prev.data, value] })),
}))
  .persist("schedule")
  .create();
