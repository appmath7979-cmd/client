import type { RegionType } from "#/types/region.type";
import type { IRewardProvince } from "#/types/reward.type";

export function expandChunks(
	chunks: Array<string[]>,
	rewardSchedule: Omit<IRewardProvince, "day"> & {
		MN?: any[];
		MT?: any[];
		MB?: any[];
	},
	region: RegionType,
): Array<string[]> {
	return chunks.flatMap((subArray: string[]) => {
		let stations: string[] = [];
		let numbers: string[] = [];
		let actionTypes: Array<{ type: string; value: string }> = [];

		const rawNumbers: string[] = [];
		let hasKéo = false;
		let has3D = false;

		// Bước 1: Phân loại dữ liệu từ mảng con
		subArray.forEach((item) => {
			const match = item.match(/^([a-z]+)(\d+)$/i);

			if (match) {
				const charPart = match[1].toLowerCase();
				const numPart = match[2];

				if (charPart === "xc") {
					actionTypes.push(
						{ type: "xdau", value: numPart },
						{ type: "xduoi", value: numPart },
					);
				} else if (charPart === "dd") {
					actionTypes.push(
						{ type: "dau", value: numPart },
						{ type: "duoi", value: numPart },
					);
				} else {
					actionTypes.push({ type: charPart, value: numPart });
				}
			} else if (/^\d+$/.test(item)) {
				rawNumbers.push(item);
			} else if (item.toLowerCase() === "k") {
				hasKéo = true;
			} else if (item.toLowerCase() === "3d") {
				has3D = true;
			} else {
				stations.push(item);
			}
		});

		// Bước 1.2: Xử lý khi gặp từ khóa "3d" dựa vào rewardSchedule và region thực tế
		if (has3D) {
			// Chuyển miền thành chữ hoa để khớp với key MN, MT, MB trong schedule của bạn
			const regionKey = region.toUpperCase() as "MN" | "MT" | "MB";
			const openProvinces = rewardSchedule[regionKey] || [];

			// Lấy danh sách cú pháp (syntax) của các đài mở thưởng ngày hôm đó
			const scheduledStations = openProvinces
				.map((p: any) => p?.syntax)
				.filter(Boolean); // Loại bỏ phần tử undefined nếu có

			stations = [...stations, ...scheduledStations];
		}

		// Bước 2: Xử lý Kéo (k) nếu có để sinh dãy số
		if (hasKéo && rawNumbers.length >= 2) {
			const startNum = parseInt(rawNumbers[0], 10);
			const endNum = parseInt(rawNumbers[1], 10);
			const padLength = rawNumbers[0].length;
			for (let i = startNum; i <= endNum; i++) {
				numbers.push(String(i).padStart(padLength, "0"));
			}
		} else {
			numbers = rawNumbers;
		}

		// Bước 3: Tạo tổ hợp kết quả trả về đúng kiểu Array<string[]>
		const combinations: Array<string[]> = [];

		if (stations.length > 0 && numbers.length > 0 && actionTypes.length > 0) {
			actionTypes.forEach((action) => {
				// TRƯỜNG HỢP 1: ĐÁ XIÊN (dax) -> Cặp đài chập 2 x Cặp số chập 2
				if (action.type === "dax") {
					if (stations.length >= 2 && numbers.length >= 2) {
						for (let s1 = 0; s1 < stations.length; s1++) {
							for (let s2 = s1 + 1; s2 < stations.length; s2++) {
								const pairedStation = `${stations[s1]}-${stations[s2]}`;
								for (let n1 = 0; n1 < numbers.length; n1++) {
									for (let n2 = n1 + 1; n2 < numbers.length; n2++) {
										const pairedNumber = `${numbers[n1]}-${numbers[n2]}`;
										combinations.push([
											pairedStation,
											pairedNumber,
											action.type,
											action.value,
										]);
									}
								}
							}
						}
					}
				}
				// TRƯỜNG HỢP 2: ĐÁ THƯỜNG (da) -> Đài đơn x Cặp số chập 2
				else if (action.type === "da") {
					if (numbers.length >= 2) {
						stations.forEach((station) => {
							for (let i = 0; i < numbers.length; i++) {
								for (let j = i + 1; j < numbers.length; j++) {
									const pairedNumber = `${numbers[i]}-${numbers[j]}`;
									combinations.push([
										station,
										pairedNumber,
										action.type,
										action.value,
									]);
								}
							}
						});
					}
				}
				// TRƯỜNG HỢP 3: Các kiểu chơi thông thường (b, xc, dd...)
				else {
					stations.forEach((station) => {
						numbers.forEach((num) => {
							combinations.push([station, num, action.type, action.value]);
						});
					});
				}
			});

			return combinations;
		}

		return [subArray];
	});
}