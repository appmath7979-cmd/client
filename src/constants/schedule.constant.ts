import type { ScheduleListType } from "#/types/schedule.type";

const scheduleConstant: ScheduleListType = [
	[
		{
			region: "mien-nam",
			stations: ["tien-giang", "kien-giang", "da-lat"],
		},
		{ region: "mien-bac" },
		{ region: "mien-trung", stations: ["khanh-hoa", "kon-tum"] },
	],
	[
		{
			region: "mien-nam",
			stations: ["tp-hcm", "dong-thap", "ca-mau"],
		},
		{ region: "mien-bac" },
		{ region: "mien-trung", stations: ["thua-thien-hue", "phu-yen"] },
	],
	[
		{
			region: "mien-nam",
			stations: ["ben-tre", "vung-tau", "bac-lieu"],
		},
		{ region: "mien-bac" },
		{ region: "mien-trung", stations: ["quang-nam", "dak-lak"] },
	],
	[
		{
			region: "mien-nam",
			stations: ["dong-nai", "can-tho", "soc-trang"],
		},
		{ region: "mien-bac" },
		{ region: "mien-trung", stations: ["da-nang", "khanh-hoa"] },
	],
	[
		{
			region: "mien-nam",
			stations: ["tay-ninh", "an-giang", "binh-thuan"],
		},
		{ region: "mien-bac" },
		{
			region: "mien-trung",
			stations: ["binh-dinh", "quang-binh", "quang-tri"],
		},
	],
	[
		{
			region: "mien-nam",
			stations: ["vinh-long", "binh-duong", "tra-vinh"],
		},
		{ region: "mien-bac" },
		{ region: "mien-trung", stations: ["gia-lai", "ninh-thuan"] },
	],
	[
		{
			region: "mien-nam",
			stations: ["tp-hcm", "long-an", "hau-giang", "binh-phuoc"],
		},
		{ region: "mien-bac" },
		{ region: "mien-trung", stations: ["da-nang", "quang-ngai", "dak-nong"] },
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
