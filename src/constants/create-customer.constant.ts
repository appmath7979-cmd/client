import type { CreateToggleListType } from "#/types/customer.type";

const typeValues: CreateToggleListType = [
	{ label: "Khách", value: "khach" },
	{ label: "Chủ", value: "chu" },
];

const daValues: CreateToggleListType = [
	{ label: "1 lần", value: "1 lần" },
	{ label: "ky rưỡi", value: "ky rưỡi" },
	{ label: "nhiều cặp", value: "nhiều cặp" },
];

const settingLabelMapper: Record<string, string> = {
	b2: "Bao lô 2 càng",
	dd2: "Đầu đuôi 2 càng",
	da: "Đá",
	dax: "Đá xiên",
	b3: "Bao lô 3 càng",
	dd3: "Đầu đuôi 3 số (ĐĐ3)",
	b4: "Bao lô 4 càng",
};

export { typeValues, daValues, settingLabelMapper };
