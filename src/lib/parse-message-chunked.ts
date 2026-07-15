import { provinces } from "#/constants/provinces.constant";
import type {
	IGroupedBetItem,
	ISimpleStationGroup,
} from "#/types/message.type"; // Import từ file types chung
import type { RegionType } from "#/types/region.type";

export function parseMessageChunked(
	checkedMessage: Array<string[]>,
	region: RegionType,
): IGroupedBetItem[] {
	const tempResult: Record<string, ISimpleStationGroup> = {};
	const regionKey = region;

	// 1. Tạo Lookup Map dịch đài từ syntax sang code
	const syntaxToCodeMap = new Map<string, string>();
	provinces.forEach((p) => {
		const mapKey = `${p.syntax.toLowerCase()}-${p.region}`;
		syntaxToCodeMap.set(mapKey, p.code);
	});

	checkedMessage.forEach((row) => {
		if (row.length !== 4) return;

		const [stationSyntax, num, actionType, actionValue] = row;
		const money = parseFloat(actionValue) || 0;

		// 2. Chuyển đổi tên đài sang mã code viết hoa
		let stationCodeKey = stationSyntax;
		if (stationSyntax.includes("-")) {
			stationCodeKey = stationSyntax
				.split("-")
				.map(
					(syntax) =>
						syntaxToCodeMap.get(`${syntax.toLowerCase()}-${regionKey}`) ||
						syntax.toUpperCase(),
				)
				.join("-");
		} else {
			stationCodeKey =
				syntaxToCodeMap.get(`${stationSyntax.toLowerCase()}-${regionKey}`) ||
				stationSyntax.toUpperCase();
		}

		// 3. Chuẩn hóa tên cú pháp (name) dựa vào phím cược và độ dài số
		let betTypeName = actionType;
		let numberKey = num; // Biến tạm để lưu key của số (có thể kèm dấu dau/duoi)

		const digitCount = num.includes("-")
			? num.split("-")[0].length
			: num.length;

		if (actionType === "b") {
			betTypeName = `b${digitCount}`;
		}
		// Xử lý nhóm đầu đuôi (bao gồm dd, dau, duoi, xdau, xduoi,...)
		else if (["dd", "dau", "duoi", "xdau", "xduoi"].includes(actionType)) {
			betTypeName = `dd${digitCount}`;

			// Đánh dấu vào số nếu là loại cược riêng biệt biệt để tránh bị cộng dồn sai
			if (actionType === "dau" || actionType === "xdau") {
				numberKey = `${num}_dau`;
			} else if (actionType === "duoi" || actionType === "xduoi") {
				numberKey = `${num}_duoi`;
			} else {
				numberKey = `${num}_dd`; // Cho trường hợp "dd" thông thường
			}
		} else {
			betTypeName = actionType;
		}

		if (!tempResult[betTypeName]) tempResult[betTypeName] = {};
		if (!tempResult[betTypeName][stationCodeKey])
			tempResult[betTypeName][stationCodeKey] = [];

		const stationArray = tempResult[betTypeName][stationCodeKey];

		// Tìm kiếm theo numberKey đã được phân loại đầu/đuôi
		const existingBet = stationArray.find((item) => item.number === numberKey);
		if (existingBet) {
			existingBet.score.xac += money;
		} else {
			stationArray.push({
				number: numberKey, // Lưu dưới dạng "20_dau", "20_duoi", hoặc "20_dd"
				score: { xac: money, co: 0, trung: 0 },
			});
		}
	});

	return Object.entries(tempResult).map(([betTypeName, data]) => {
		const item: IGroupedBetItem = {
			[betTypeName]: data,
		};
		return item;
	});
}
