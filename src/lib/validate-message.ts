import type { IValidateMessageResult } from "#/types/message.type";
import type { RegionType } from "#/types/region.type";
import type { IRewardProvince } from "#/types/reward.type";

export function validateMessage(
	parsedText: string,
	rewardSchedule: Omit<IRewardProvince, "day">,
	region: RegionType,
): IValidateMessageResult {
	if (!parsedText) {
		return {
			message: "Chưa nhập tin nhắn!",
			status: "error",
			chunks: [],
		};
	}

	const currentProvinces = (
		rewardSchedule?.[region as keyof typeof rewardSchedule] || []
	)
		.filter(Boolean)
		.map((p: any) => p.syntax.toLowerCase());

	const totalStationsToday = currentProvinces.length;
	const allWords = parsedText.split(/\s+/).filter(Boolean);

	const processedMessageChunks: string[][] = [];
	let lastValidStations: string[] = [];
	let lastValidDigitD: string | null = null;

	let currentChunk: string[] = [];

	for (let i = 0; i < allWords.length; i++) {
		const word = allWords[i];
		const nextWord = allWords[i + 1];
		currentChunk.push(word);

		const matchCurrent = word.match(/^([\p{L}a-zA-Z]+)\d+[nN]?$/u);
		if (matchCurrent) {
			const currentPrefix = matchCurrent[1].toLowerCase();

			if (nextWord) {
				const matchNext = nextWord.match(/^([\p{L}a-zA-Z]+)\d+[nN]?$/u);
				if (matchNext) {
					const nextPrefix = matchNext[1].toLowerCase();
					if (currentPrefix === nextPrefix) {
						return {
							message: `LỖI CÚ PHÁP: Nhập trùng kiểu cược giống nhau liên tiếp "${word} ${nextWord}".`,
							status: "error",
							chunks: processedMessageChunks,
						};
					}
				}
			}
		}

		const isBetSyntax = /^[\p{L}a-zA-Z]+\d+[nN]?$/u.test(word);
		let shouldCloseChunk = isBetSyntax || i === allWords.length - 1;

		if (isBetSyntax && nextWord) {
			const matchNext = nextWord.match(/^([\p{L}a-zA-Z]+)\d+[nN]?$/u);
			if (matchNext) {
				const currentPrefix = word
					.match(/^([\p{L}a-zA-Z]+)/u)?.[1]
					.toLowerCase();
				const nextPrefix = matchNext[1].toLowerCase();
				if (currentPrefix !== nextPrefix) {
					shouldCloseChunk = false;
				}
			}
		}

		if (shouldCloseChunk) {
			const chunkToProcess = [...currentChunk];
			currentChunk = [];

			const currentIdx = processedMessageChunks.length;
			const numbersInChunk = chunkToProcess.filter((w) => /^\d+$/.test(w));

			const pureTextsInChunk = chunkToProcess.filter(
				(w) => /^[\p{L}a-zA-Z]+$/u.test(w) && w.toLowerCase() !== "k",
			);
			const digitDWord = chunkToProcess.find((w) => /^\d+[dD]$/.test(w));
			const matchedProvinces = pureTextsInChunk.filter((w) =>
				currentProvinces.includes(w.toLowerCase()),
			);

			// 1. Lọc tất cả các phím cược trong cụm để phục vụ kiểm tra
			const betWordsInChunk = chunkToProcess.filter((w) =>
				/^[\p{L}a-zA-Z]+\d+[nN]?$/u.test(w),
			);
			const betPrefixes = betWordsInChunk.map(
				(w) => w.match(/^([\p{L}a-zA-Z]+)/u)?.[1].toLowerCase() || "",
			);

			// 2. Kiểm tra cú pháp kéo chữ "k"
			const kIndex = chunkToProcess.findIndex((w) => w.toLowerCase() === "k");
			if (kIndex !== -1) {
				if (numbersInChunk.length !== 2)
					return {
						message: `LỖI CÚ PHÁP: Cú pháp kéo chữ "k" ở cụm ${currentIdx + 1} chỉ chấp nhận đúng 2 số (Ví dụ: 00 k 09).`,
						status: "error",
						chunks: processedMessageChunks,
					};

				const prevWordOfK = chunkToProcess[kIndex - 1];
				const nextWordOfK = chunkToProcess[kIndex + 1];
				if (
					!prevWordOfK ||
					!/^\d+$/.test(prevWordOfK) ||
					!nextWordOfK ||
					!/^\d+$/.test(nextWordOfK)
				) {
					return {
						message: `LỖI CÚ PHÁP: Chữ "k" ở cụm ${currentIdx + 1} bắt buộc phải đứng liền giữa 2 con số.`,
						status: "error",
						chunks: processedMessageChunks,
					};
				}

				if (betPrefixes.includes("da") || betPrefixes.includes("dax")) {
					return {
						message: `LỖI CÚ PHÁP: Cụm số ${currentIdx + 1} đang dùng cú pháp kéo "k" thì không được phép sử dụng kiểu cược "da" hoặc "dax".`,
						status: "error",
						chunks: processedMessageChunks,
					};
				}
			}

			if (
				betPrefixes.includes("dd") &&
				(betPrefixes.includes("dau") || betPrefixes.includes("duoi"))
			) {
				return {
					message: `LỖI CÚ PHÁP: Cụm số ${currentIdx + 1} đã nhập "dd" thì không được nhập thêm "dau" hoặc "duoi".`,
					status: "error",
					chunks: processedMessageChunks,
				};
			}

			if (
				betPrefixes.includes("xc") &&
				(betPrefixes.includes("xdau") || betPrefixes.includes("xduoi"))
			) {
				return {
					message: `LỖI CÚ PHÁP: Cụm số ${currentIdx + 1} đã nhập "xc" thì không được nhập thêm "xdau" hoặc "xduoi".`,
					status: "error",
					chunks: processedMessageChunks,
				};
			}

			if (betPrefixes.includes("da") || betPrefixes.includes("dax")) {
				if (numbersInChunk.length < 2) {
					const phimDa = betPrefixes.includes("dax") ? "dax" : "da";
					return {
						message: `LỖI CÚ PHÁP: Cú pháp "${phimDa}" tại cụm số ${currentIdx + 1} bắt buộc phải đi kèm với ít nhất 2 con số để đánh.`,
						status: "error",
						chunks: processedMessageChunks,
					};
				}

				if (betPrefixes.includes("dax")) {
					let chunkStationCount = 0;

					if (matchedProvinces.length > 0) {
						chunkStationCount = matchedProvinces.length;
					} else if (digitDWord) {
						chunkStationCount = parseInt(
							digitDWord.match(/^(\d+)[dD]$/)?.[1] || "0",
							10,
						);
					} else {
						if (lastValidStations.length > 0) {
							chunkStationCount = lastValidStations.length;
						} else if (lastValidDigitD) {
							chunkStationCount = parseInt(
								lastValidDigitD.match(/^(\d+)[dD]$/)?.[1] || "0",
								10,
							);
						}
					}

					if (chunkStationCount < 2 || chunkStationCount > totalStationsToday) {
						return {
							message: `LỖI CÚ PHÁP: Cú pháp đá xiên "dax" tại cụm số ${currentIdx + 1} yêu cầu tối thiểu là 2 đài và tối đa bằng số đài mở thưởng hôm nay (${totalStationsToday} đài). Bạn hiện đang chạy cho ${chunkStationCount} đài.`,
							status: "error",
							chunks: processedMessageChunks,
						};
					}
				}
			}

			if (numbersInChunk.length > 0) {
				const isPureB =
					betPrefixes.length > 0 &&
					betPrefixes.every((prefix) => prefix === "b");

				if (isPureB) {
					const hasInvalidLength = numbersInChunk.some(
						(num) => num.length < 2 || num.length > 4,
					);
					if (hasInvalidLength) {
						return {
							message: `LỖI CÚ PHÁP: Cụm số ${currentIdx + 1} chứa số có độ dài không hợp lệ (Chỉ chấp nhận số từ 2 đến 4 chữ số).`,
							status: "error",
							chunks: processedMessageChunks,
						};
					}
				} else {
					const digitCount = numbersInChunk[0].length;
					const isSameDigitCount = numbersInChunk.every(
						(num) => num.length === digitCount,
					);

					if (!isSameDigitCount) {
						return {
							message: `LỖI CÚ PHÁP: Cụm số ${currentIdx + 1} chứa các con số lệch càng. Kiểu viết trộn lẫn độ dài số CHỈ được áp dụng khi cụm có duy nhất cú pháp cược "b".`,
							status: "error",
							chunks: processedMessageChunks,
						};
					}

					for (const prefix of betPrefixes) {
						if (digitCount === 2) {
							const valid2Cang = ["b", "dau", "duoi", "db", "dd", "da", "dax"];
							if (!valid2Cang.includes(prefix)) {
								return {
									message: `LỖI CÚ PHÁP: Cụm số ${currentIdx + 1} đánh số 2 càng nhưng dùng phím cược "${prefix}" không hợp lệ.`,
									status: "error",
									chunks: processedMessageChunks,
								};
							}
						} else if (digitCount === 3) {
							const valid3Cang = ["b", "xdau", "xduoi", "xc", "bd"];
							if (!valid3Cang.includes(prefix)) {
								return {
									message: `LỖI CÚ PHÁP: Cụm số ${currentIdx + 1} đánh số 3 càng nhưng dùng phím cược "${prefix}" không hợp lệ.`,
									status: "error",
									chunks: processedMessageChunks,
								};
							}
						} else if (digitCount === 4) {
							if (prefix !== "b") {
								return {
									message: `LỖI CÚ PHÁP: Cụm số ${currentIdx + 1} đánh số 4 càng thì không được phép dùng phím cược "${prefix}".`,
									status: "error",
									chunks: processedMessageChunks,
								};
							}
						}
					}
				}
			}

			if (region === "MB") {
				const invalidWord = pureTextsInChunk.find(
					(w) => !currentProvinces.includes(w.toLowerCase()),
				);
				if (invalidWord) {
					return {
						message: `LỖI CÚ PHÁP: Đài không đúng lịch miền Bắc: "${invalidWord}" ở cụm số ${currentIdx + 1}.`,
						status: "error",
						chunks: processedMessageChunks,
					};
				}

				chunkToProcess.unshift("mb");
			} else {
				const invalidProvince = pureTextsInChunk.find(
					(w) => !currentProvinces.includes(w.toLowerCase()),
				);
				if (invalidProvince) {
					return {
						message: `LỖI CÚ PHÁP: Đài "${invalidProvince}" không thuộc lịch mở thưởng hôm nay của miền ${region}.`,
						status: "error",
						chunks: processedMessageChunks,
					};
				}

				if (digitDWord) {
					const matchDigits = digitDWord.match(/^(\d+)[dD]$/);
					if (matchDigits) {
						const inputDigitCount = parseInt(matchDigits[1], 10);
						if (inputDigitCount > totalStationsToday) {
							return {
								message: `LỖI CÚ PHÁP: Nhập sai phím tắt "${digitDWord}". Lịch vùng ${region} hôm nay chỉ có tối đa ${totalStationsToday} đài.`,
								status: "error",
								chunks: processedMessageChunks,
							};
						}
						if (inputDigitCount < totalStationsToday) {
							return {
								message: `LỖI CÚ PHÁP: Phím tắt "${digitDWord}" không hợp lệ. Nếu chơi ít hơn ${totalStationsToday} đài, vui lòng nhập rõ từng tên đài.`,
								status: "error",
								chunks: processedMessageChunks,
							};
						}
					}
				}

				const hasSelfStation = matchedProvinces.length > 0 || !!digitDWord;
				const hasInheritedStation =
					lastValidStations.length > 0 || !!lastValidDigitD;

				if (!hasSelfStation && (currentIdx === 0 || !hasInheritedStation)) {
					if (currentIdx === 0) {
						return {
							message: `LỖI CÚ PHÁP: Cụm tin nhắn đầu tiên của miền ${region} bắt buộc phải có tên đài hoặc phím tắt hợp lệ (Ví dụ: tp hoặc ${totalStationsToday}d).`,
							status: "error",
							chunks: processedMessageChunks,
						};
					} else {
						return {
							message: `LỖI CÚ PHÁP: Cụm số ${currentIdx + 1} của miền ${region} không tìm thấy đài chữ hoặc phím tắt hợp lệ để kế thừa.`,
							status: "error",
							chunks: processedMessageChunks,
						};
					}
				}

				if (matchedProvinces.length > 0) {
					lastValidStations = matchedProvinces;
					lastValidDigitD = null;
				} else if (digitDWord) {
					lastValidDigitD = digitDWord;
					lastValidStations = [];
				} else {
					if (lastValidStations.length > 0) {
						chunkToProcess.unshift(...lastValidStations);
					} else if (lastValidDigitD) {
						chunkToProcess.unshift(lastValidDigitD);
					}
				}
			}

			processedMessageChunks.push(chunkToProcess);
		}
	}

	return {
		message: `Toàn bộ tin nhắn hợp lệ theo quy tắc của miền ${region}.`,
		status: "success",
		chunks: processedMessageChunks,
	};
}
