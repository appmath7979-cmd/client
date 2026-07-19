import type {
	IProvinceItem,
	IProvinceItemWithScore,
} from "#/types/province.type";
import { schedule } from "./schedule.constant";
import { syntaxTypeList } from "./syntax-type.constant";

interface IDayScheduleWithScore {
	MB: IProvinceItemWithScore[];
	MT: IProvinceItemWithScore[];
	MN: IProvinceItemWithScore[];
}

// 1. Danh sách lịch trình tỉnh GỐC nguyên bản (chưa biến đổi tên)
const baseProvinceSchedule: IDayScheduleWithScore[] = schedule.map((item) => ({
	MB: item.MB.map((p) => ({ ...p, score: 0 })),
	MT: item.MT.map((p) => ({ ...p, score: 0 })),
	MN: item.MN.map((p) => ({ ...p, score: 0 })),
}));

// Hàm tạo cặp X-Y (Dành riêng cho cú pháp 'dax')
const getCombinations = (
	regionList: IProvinceItem[],
	currentSyntax: string,
): IProvinceItemWithScore[] => {
	const combinations: IProvinceItemWithScore[] = [];
	const len = regionList.length;

	for (let i = 0; i < len - 1; i++) {
		for (let j = i + 1; j < len; j++) {
			const itemI = regionList[i];
			const itemJ = regionList[j];

			combinations.push({
				code: `${itemI.code}-${itemJ.code}`,
				name: `${itemI.code}-${itemJ.code}`,
				region: itemI.region,
				syntax: currentSyntax, // Đảm bảo đồng bộ theo cú pháp hiện hành ('dax')
				score: 0,
			});
		}
	}
	return combinations;
};

// Hàm tạo các biến thể bao, dau, duoi (Dành cho cú pháp '2c' và '3c')
const getSuffixExtensions = (
	regionList: IProvinceItemWithScore[],
	currentSyntax: string,
): IProvinceItemWithScore[] => {
	const extensions: IProvinceItemWithScore[] = [];
	const suffixes = ["bao", "dau", "duoi"];

	regionList.forEach((item) => {
		suffixes.forEach((suffix) => {
			extensions.push({
				...item,
				syntax: currentSyntax, // Ghi đè chính xác syntax ('2c' hoặc '3c')
				code: `${item.code}-${suffix}`,
				name: `${item.name}-${suffix}`,
			});
		});
	});

	return extensions;
};

export const standard = syntaxTypeList.map((syntax) => {
	const result: Record<string, IDayScheduleWithScore[]> = {};

	result[syntax] = baseProvinceSchedule.map((dayData, index) => {
		// TRƯỜNG HỢP 1: Cú pháp tổ hợp 'dax'
		if (syntax === "dax") {
			const originalDay = schedule[index];
			return {
				MB: dayData.MB.map((p) => ({ ...p, syntax })), // Miền Bắc giữ nguyên tỉnh gốc nhưng cập nhật syntax
				MT: getCombinations(originalDay.MT, syntax),
				MN: getCombinations(originalDay.MN, syntax),
			};
		}

		// TRƯỜNG HỢP 2: Cú pháp '2c' hoặc '3c' -> Thêm hậu tố bao, dau, duoi đi kèm
		if (syntax === "2c" || syntax === "3c") {
			return {
				MB: getSuffixExtensions(dayData.MB, syntax),
				MT: getSuffixExtensions(dayData.MT, syntax),
				MN: getSuffixExtensions(dayData.MN, syntax),
			};
		}

		// TRƯỜNG HỢP 3: Các cú pháp còn lại (ví dụ: 'da'...) -> Đồng bộ lại trường syntax của tỉnh gốc
		return {
			MB: dayData.MB.map((p) => ({ ...p, syntax })),
			MT: dayData.MT.map((p) => ({ ...p, syntax })),
			MN: dayData.MN.map((p) => ({ ...p, syntax })),
		};
	});

	return result;
});
