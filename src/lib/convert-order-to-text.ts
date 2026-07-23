import type { IOrderDetailFromDb } from "#/types/apis/message.type";
import type { RegionType } from "#/types/region.type";

export interface IConvertOrderInput {
	region?: RegionType | string;
	type?: string;
	details: IOrderDetailFromDb[];
}

export function convertOrderToText(orderData: IConvertOrderInput): string {
	if (
		!orderData ||
		!Array.isArray(orderData.details) ||
		orderData.details.length === 0
	) {
		return "";
	}

	const lines: string[] = [];

	orderData.details.forEach((item) => {
		const rawNumber = item.number;
		const xacValue = item.xac ?? 0;
		const betTypeName = item.syntax;

		let realNumber = rawNumber;
		let actionType = betTypeName;

		// 1. Xử lý logic cú pháp Đầu Đuôi (dd) & Xỉu Chủ
		if (betTypeName.startsWith("dd")) {
			if (rawNumber.includes("_")) {
				const [num, suffix] = rawNumber.split("_");
				realNumber = num;

				const isXiuChu = betTypeName !== "dd2";

				if (suffix === "dau" || suffix === "xdau") {
					actionType = isXiuChu ? "xdau" : "dau";
				} else if (suffix === "duoi" || suffix === "xduoi") {
					actionType = isXiuChu ? "xduoi" : "duoi";
				} else {
					actionType = "dd";
				}
			} else {
				actionType = "dd";
			}
		}
		// 2. Xử lý logic cú pháp Bao (b, b2, b3, b4...) -> đổi về "b"
		else if (
			betTypeName.startsWith("b") &&
			!Number.isNaN(Number(betTypeName.slice(1)))
		) {
			actionType = "b";
		}
		// 3. Ưu tiên sử dụng `type` nếu có
		else if (item.type) {
			actionType = item.type;
		}

		// Tạo dòng lệnh riêng biệt
		lines.push(`${item.stationCode} ${realNumber} ${actionType}${xacValue}`);
	});

	// Nối các câu lệnh bằng dấu xuống dòng '\n'
	return lines.join("\n").toLowerCase();
}
