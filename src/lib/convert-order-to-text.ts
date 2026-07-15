interface IBetScore {
	xac: number;
	co: number;
	trung: number;
}

interface IBetItem {
	number: string;
	score: IBetScore;
}

interface IOrderData {
	region: string;
	type: string;
	results: Array<Record<string, Record<string, IBetItem[]>>>;
}

export function convertOrderToText(orderData: IOrderData): string {
	if (!orderData || !orderData.results) return "";

	const lines: string[] = [];

	orderData.results.forEach((resultItem) => {
		// 1. Duyệt qua các betTypeName (ví dụ: dd2, dd3, b2, b3...)
		Object.entries(resultItem || {}).forEach(([betTypeName, stations]) => {
			// 2. Duyệt qua từng cụm đài (ví dụ: BT, HN-HP...)
			Object.entries(stations || {}).forEach(([stationCodeKey, items]) => {
				// 3. Duyệt qua từng số cược trong đài đó
				items.forEach((item) => {
					const rawNumber = item.number;
					const xacValue = item.score?.xac ?? 0;

					let realNumber = rawNumber;
					let actionType = betTypeName;

					// Xử lý dịch ngược cho nhóm đầu đuôi (dd2, dd3, dd4...)
					if (betTypeName.startsWith("dd")) {
						if (rawNumber.includes("_")) {
							const [num, suffix] = rawNumber.split("_");
							realNumber = num;

							// Chỉ convert sang xdau/xduoi nếu betTypeName KHÔNG PHẢI là dd2 (tức là dd3, dd4...)
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
					// Xử lý dịch ngược cho nhóm bao lô (b2, b3, b4...)
					else if (
						betTypeName.startsWith("b") &&
						!Number.isNaN(Number(betTypeName.slice(1)))
					) {
						actionType = "b";
					}

					lines.push(
						`${stationCodeKey} ${realNumber} ${actionType}${xacValue}`,
					);
				});
			});
		});
	});

	return lines.join("\n").toLocaleLowerCase();
}
