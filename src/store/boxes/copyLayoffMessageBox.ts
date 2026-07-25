import { createBox } from "@lavaz/store";
import type { OrderItemApiType } from "#/types/apis/message.type";

interface LayoffState extends Omit<OrderItemApiType, "id"> {}

const initialState = {
	message: "",
	release: "",
	region: "MB",
	isSend: false,
	isLayoff: false,
	customerId: "",
	type: "",
	details: [],
	createdAt: "",
	updatedAt: "",
} satisfies LayoffState as LayoffState;

export const copyLayoffMessageBox = createBox(initialState, (set) => ({
	copy: (value: LayoffState) => set((prev) => ({ ...prev, ...value })),
	clear: () => set(initialState),
})).create();
