import type { ScheduleListType } from "#/types/schedule.type";

const scheduleConstant: ScheduleListType = [
	[
		{
			region: "mien-nam",
			stations: ["tien-giang", "kien-giang", "da-lat"],
			stationsShortcut: ["tg", "kg", "dl"],
		},
		{ region: "mien-bac" },
		{
			region: "mien-trung",
			stations: ["khanh-hoa", "kon-tum"],
			stationsShortcut: ["kh", "kt"],
		},
	],
	[
		{
			region: "mien-nam",
			stations: ["tp-hcm", "dong-thap", "ca-mau"],
			stationsShortcut: ["tp", "dt", "cm"],
		},
		{ region: "mien-bac" },
		{
			region: "mien-trung",
			stations: ["thua-thien-hue", "phu-yen"],
			stationsShortcut: ["th", "py"],
		},
	],
	[
		{
			region: "mien-nam",
			stations: ["ben-tre", "vung-tau", "bac-lieu"],
			stationsShortcut: ["bt", "vt", "bli"],
		},
		{ region: "mien-bac" },
		{
			region: "mien-trung",
			stations: ["quang-nam", "dak-lak"],
			stationsShortcut: ["qn", "dl"],
		},
	],
	[
		{
			region: "mien-nam",
			stations: ["dong-nai", "can-tho", "soc-trang"],
			stationsShortcut: ["dn", "ct", "st"],
		},
		{ region: "mien-bac" },
		{
			region: "mien-trung",
			stations: ["da-nang", "khanh-hoa"],
			stationsShortcut: ["dn", "kh"],
		},
	],
	[
		{
			region: "mien-nam",
			stations: ["tay-ninh", "an-giang", "binh-thuan"],
			stationsShortcut: ["tn", "ag", "bt"],
		},
		{ region: "mien-bac" },
		{
			region: "mien-trung",
			stations: ["binh-dinh", "quang-binh", "quang-tri"],
			stationsShortcut: ["bd", "qb", "qt"],
		},
	],
	[
		{
			region: "mien-nam",
			stations: ["vinh-long", "binh-duong", "tra-vinh"],
			stationsShortcut: ["vl", "bd", "tv"],
		},
		{ region: "mien-bac" },
		{
			region: "mien-trung",
			stations: ["gia-lai", "ninh-thuan"],
			stationsShortcut: ["gl", "nt"],
		},
	],
	[
		{
			region: "mien-nam",
			stations: ["tp-hcm", "long-an", "hau-giang", "binh-phuoc"],
			stationsShortcut: ["tp", "la", "hg", "bp"],
		},
		{ region: "mien-bac" },
		{
			region: "mien-trung",
			stations: ["da-nang", "quang-ngai", "dak-nong"],
			stationsShortcut: ["dn", "qn", "dno"],
		},
	],
];

const dayConstant = {
	0: "chủ nhật",
	1: "thứ hai",
	2: "thứ ba",
	3: "thứ tư",
	4: "thứ năm",
	5: "thứ sáu",
	6: "thứ bảy",
};

export { scheduleConstant, dayConstant };
