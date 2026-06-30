import type { CreateCustomerType, IBetPair } from "#/types/customer.type";

const southRegionConstant: IBetPair[] = [
	{
		key: "b",
		label: "2C Lô",
		c: 0.75,
		t: 75,
		loai: "ti_le",
	},
	{
		key: "dd",
		label: "2C ĐĐ",
		c: 0.75,
		t: 75,
		loai: "ti_le",
	},
	{
		key: "da",
		label: "2C ĐáT",
		c: 0.75,
		t: 700,
		loai: "ti_le",
	},
	{
		key: "dax",
		label: "2C DX",
		c: 0.75,
		t: 550,
		loai: "ti_le",
	},
	{
		key: "3b",
		label: "3C Lô",
		c: 0.65,
		t: 650,
		loai: "ti_le",
	},
	{
		key: "3dd",
		label: "3C ĐĐ",
		c: 0.65,
		t: 650,
		loai: "ti_le",
	},
	{
		key: "4b",
		label: "4C",
		c: 0.65,
		t: 5500,
		loai: "ti_le",
	},
];

const northRegionConstant: IBetPair[] = [
	{
		key: "b",
		label: "2C Lô",
		c: 0.75,
		loai: "ti_le",
		t: 75,
	},
	{
		key: "dd",
		label: "2C ĐĐ",
		c: 0.75,
		loai: "ti_le",
		t: 75,
	},
	{
		key: "da",
		label: "2C Đá",
		c: 0.75,
		loai: "ti_le",
		t: 650,
	},
	{
		key: "3b",
		label: "3C Lô",
		c: 0.65,
		loai: "ti_le",
		t: 650,
	},
	{
		key: "3dd",
		label: "3C ĐĐ",
		c: 0.65,
		loai: "ti_le",
		t: 650,
	},
	{
		key: "4b",
		label: "4C",
		c: 0.65,
		loai: "ti_le",
		t: 5500,
	},
];

const centralRegionConstant: IBetPair[] = [...southRegionConstant];

const customerConstant = {
	fullName: "",
	phoneNumber: "",
	type: "GUEST",
	xienMB: false,
	tinhUi: false,
	tinhTrungDaT: "ky_ruoi",
	tinhTrungDaX: "ky_ruoi",
	settings: {
		BAC: northRegionConstant,
		TRUNG: centralRegionConstant,
		NAM: southRegionConstant,
	},
} as CreateCustomerType;

const booleanSelectConstant = ["Cho phép", "Không"];
const toggleSelectConstant = ["1 lần", "ky rưỡi", "nhiều cặp"];

export { customerConstant, booleanSelectConstant, toggleSelectConstant };
