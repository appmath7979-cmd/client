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
		if (actionType === "b") {
			const digitCount = num.includes("-")
				? num.split("-")[0].length
				: num.length;
			betTypeName = `b${digitCount}`;
		} else if (
			actionType === "dd" ||
			actionType === "dau" ||
			actionType === "duoi"
		) {
			const digitCount = num.includes("-")
				? num.split("-")[0].length
				: num.length;
			betTypeName = `dd${digitCount}`;
		} else betTypeName = actionType;

		if (!tempResult[betTypeName]) tempResult[betTypeName] = {};

		if (!tempResult[betTypeName][stationCodeKey])
			tempResult[betTypeName][stationCodeKey] = [];

		const stationArray = tempResult[betTypeName][stationCodeKey];

		const existingBet = stationArray.find((item) => item.number === num);
		if (existingBet) {
			existingBet.score.xac += money;
		} else {
			stationArray.push({
				number: num,
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
