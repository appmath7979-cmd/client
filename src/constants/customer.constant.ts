import type { BetPairType, CustomerType } from "#/types/customer.type";

const southRegionConstant: BetPairType[] = [
	{
		label: "2C Lô",
		c: 0.75,
		t: 75,
	},
	{
		label: "2C ĐĐ",
		c: 0.75,
		t: 75,
	},
	{
		label: "2C ĐáT",
		c: 0.75,
		t: 700,
	},
	{
		label: "2C DX",
		c: 0.75,
		t: 550,
	},
	{
		label: "3C Lô",
		c: 0.65,
		t: 650,
	},
	{
		label: "3C ĐĐ",
		c: 0.65,
		t: 650,
	},
	{
		label: "4C",
		c: 0.65,
		t: 5500,
	},
];

const northRegionConstant: BetPairType[] = [
	{
		label: "2C Lô",
		c: 0.75,
		t: 75,
	},
	{
		label: "2C ĐĐ",
		c: 0.75,
		t: 75,
	},
	{
		label: "2C Đá",
		c: 0.75,
		t: 650,
	},
	{
		label: "3C Lô",
		c: 0.65,
		t: 650,
	},
	{
		label: "3C ĐĐ",
		c: 0.65,
		t: 650,
	},
	{
		label: "4C",
		c: 0.65,
		t: 5500,
	},
];

const centralRegionConstant: BetPairType[] = [...southRegionConstant];

const customerConstant = {
	fullName: "",
	phoneNumber: "",
	type: "GUEST",
	loaiCo: "ti_le",
	xienMB: false,
	tinhUi: false,
	tinhTrungDaT: "ky_ruoi",
	tinhTrungDaX: "ky_ruoi",
	settings: {
		BAC: northRegionConstant,
		TRUNG: centralRegionConstant,
		NAM: southRegionConstant,
	},
} as CustomerType;

export { customerConstant };
