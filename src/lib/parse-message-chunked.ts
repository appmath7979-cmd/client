import { provinces } from "#/constants/provinces.constant";
import type { IOrderDetailsInput } from "#/types/message.type";
import type { RegionType } from "#/types/region.type";

export function parseMessageChunked(
	checkedMessage: Array<string[]>,
	region: RegionType,
): IOrderDetailsInput[] {
	const regionKey = region;

	// 1. Tạo Lookup Map dịch đài từ syntax sang code
	const syntaxToCodeMap = new Map<string, string>();
	provinces.forEach((p) => {
		const mapKey = `${p.syntax.toLowerCase()}-${p.region}`;
		syntaxToCodeMap.set(mapKey, p.code);
	});

	const detailsList: IOrderDetailsInput[] = [];

	checkedMessage.forEach((row) => {
		if (row.length !== 4 && row.length !== 5) return;

		const stationSyntax = row[0];
		const num = row[1];
		const actionType = row[2].toLowerCase();
		const actionValue = row[3];
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

		// 3. Phân định syntax theo cấu trúc số càng
		const digitCount = num.includes("-")
			? num.split("-")[0].length
			: num.length;
		const dbSyntax = `${digitCount}c`;

		// 4. Phân định type chính xác theo loại cược cốt lõi
		let dbType = actionType;
		if (actionType === "b" || actionType === "bd") {
			dbType = "bao";
		}

		// Đẩy bản ghi phẳng sạch sẽ vào danh sách (Bỏ trường price)
		detailsList.push({
			syntax: dbSyntax,
			stationCode: stationCodeKey,
			number: num,
			type: dbType,
			xac: money, // Tiền cược gán thẳng vào xac
		});
	});

	// 5. Gom tổng tiền tích lũy theo xac nếu trùng lặp bộ cược
	const aggregatedMap = new Map<string, IOrderDetailsInput>();

	detailsList.forEach((item) => {
		const uniqueKey = `${item.stationCode}_${item.number}_${item.type}_${item.syntax}`;
		const existing = aggregatedMap.get(uniqueKey);

		if (existing) {
			existing.xac += item.xac; // Cộng dồn tiền xác
		} else {
			aggregatedMap.set(uniqueKey, item);
		}
	});

	return Array.from(aggregatedMap.values());
}
