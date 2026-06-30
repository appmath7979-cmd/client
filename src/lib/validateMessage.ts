import { scheduleConstant } from "#/constants/schedule.constant";
import type {
	MessageInputType,
	StatusValidatedType,
} from "#/types/common.type";
import type { RegionType } from "#/types/reward.type";

interface IReturn {
	notice: MessageInputType;
	validatedValue: Array<string[]>;
	statusValidated: StatusValidatedType;
}

// CẬP NHẬT: Thống nhất các tập cú pháp chữ viết thường chuẩn
const syntax2Digit = new Set([
	"dd",
	"da",
	"dx",
	"dax",
	"dui",
	"dau",
	"d",
	"duoi",
]);
const syntax3Digit = new Set(["bd", "baodao", "xc", "xdau", "xduoi", "xdui"]);

function isValidSyntaxWithNumber(
	numberStr: string,
	syntaxStr: string,
): boolean {
	const syntaxLower = syntaxStr.toLowerCase();
	const length = numberStr.length;

	if (syntaxLower === "b" || syntaxLower === "lo") {
		return length >= 2 && length <= 4;
	}
	if (length === 2) return syntax2Digit.has(syntaxLower);
	if (length === 3) return syntax3Digit.has(syntaxLower);
	return false;
}

function validateMessage(opts: { value: string; region: RegionType }): IReturn {
	const { value, region } = opts;
	let text = value.trim();
	if (!text) {
		return {
			notice: { message: "Chưa nhập tin nhắn!", status: "error" },
			validatedValue: [],
			statusValidated: { status: "error" },
		};
	}

	const arrValue = text.split(/\s+/g);
	const splitValue: Array<string[]> = [];
	let start: number = 0;

	const day = new Date().getDay();
	const stationsTodayArr = scheduleConstant[day].flatMap((item) => {
		if (item.region === region && item.stationsShortcut) {
			return item.stationsShortcut.map((code) => code.toLowerCase());
		}
		return [];
	});
	const validStationsToday = new Set(stationsTodayArr);

	const isStationValidToday = (token: string): boolean => {
		if (!token) return false;
		const lowerToken = token.toLowerCase();
		if (lowerToken === "k") return false;
		if (region === "mien-bac" && lowerToken === "mb") return true;
		return /^[a-zA-Z]+$/.test(lowerToken) && validStationsToday.has(lowerToken);
	};

	const isShortcutStation = (token: string): boolean => /^\d+d$/i.test(token);

	if (region === "mien-bac") {
		const wrongStationIndex = arrValue.findIndex((item) => {
			const lowerItem = item.toLowerCase();
			return (
				/^[a-zA-Z]+$/.test(item) && lowerItem !== "mb" && lowerItem !== "k"
			);
		});

		if (wrongStationIndex !== -1) {
			return {
				notice: {
					message: "Miền Bắc không nhập tên đài hoặc tên đài phải là mb",
					status: "error",
				},
				validatedValue: [arrValue.slice(0, wrongStationIndex + 1)],
				statusValidated: {
					status: "error",
					itemError: arrValue[wrongStationIndex],
				},
			};
		}
		if (/^\d/.test(text)) text = `mb ${text}`;
	}

	const finalArrValue = text.split(/\s+/g);

	// =================================================================
	// BƯỚC 1: TÁCH MẢNG (SPLIT) & KIỂM TRA SƠ BỘ CẬP NHẬT LUỒNG LỖI CHÉO
	// =================================================================
	for (let i = 0; i < finalArrValue.length; i++) {
		const currentValue = finalArrValue[i];
		const prevValue = finalArrValue[i - 1];

		if (i > 0) {
			const isCurrentSyntax = /^[a-zA-Z]+\d+n?$/.test(currentValue);
			const isPrevSyntax = /^[a-zA-Z]+\d+n?$/.test(prevValue);

			// 1. Chặn hai cú pháp thông thường GIỐNG NHAU đi liên tiếp (Ví dụ: dd10 dd20)
			if (isCurrentSyntax && isPrevSyntax) {
				const currentSyntaxStr =
					currentValue.match(/^([a-zA-Z]+)/)?.[1]?.toLowerCase() || "";
				const prevSyntaxStr =
					prevValue.match(/^([a-zA-Z]+)/)?.[1]?.toLowerCase() || "";

				if (currentSyntaxStr === prevSyntaxStr) {
					splitValue.push(finalArrValue.slice(start, i + 1));
					return {
						notice: {
							message: `Không chấp nhận hai cú pháp giống nhau ("${prevValue}" và "${currentValue}") đi liên tiếp!`,
							status: "error",
						},
						statusValidated: { status: "error", itemError: currentValue },
						validatedValue: splitValue,
					};
				}
			}

			// 2. CHẶN LỖI CHÉO: Không cho phép "dd..." đi liền "dxdx" hoặc ngược lại trong cùng một mạch lệnh
			const isCurrentDxDx = /^[dD]\d+[dD]\d+n?$/.test(currentValue);
			const isPrevDxDx = /^[dD]\d+[dD]\d+n?$/.test(prevValue);

			let isCrossError = false;
			if (isPrevSyntax && isCurrentDxDx) {
				const prevSyntaxStr =
					prevValue.match(/^([a-zA-Z]+)/)?.[1]?.toLowerCase() || "";
				if (prevSyntaxStr === "dd") isCrossError = true;
			}
			if (isPrevDxDx && isCurrentSyntax) {
				const currentSyntaxStr =
					currentValue.match(/^([a-zA-Z]+)/)?.[1]?.toLowerCase() || "";
				if (currentSyntaxStr === "dd") isCrossError = true;
			}

			if (isCrossError) {
				splitValue.push(finalArrValue.slice(start, i + 1));
				return {
					notice: {
						message: `Không thể đánh Đầu đuôi và Lệch ("${prevValue}" và "${currentValue}") đi liền kề nhau!`,
						status: "error",
					},
					statusValidated: { status: "error", itemError: currentValue },
					validatedValue: splitValue,
				};
			}

			// 3. LOGIC NGẮT MẢNG CON TỰ ĐỘNG
			const isNewStation =
				isStationValidToday(currentValue) || isShortcutStation(currentValue);
			const isPrevStation =
				isStationValidToday(prevValue) || isShortcutStation(prevValue);
			const isMultiStation = isNewStation && isPrevStation;
			const isFullPackage = /^\d+[a-zA-Z]+\d+n?$/.test(currentValue);
			const isAfterKeepCommand =
				prevValue && /^\d+$/.test(prevValue) && finalArrValue[i - 2] === "k";
			const isPrevPureNumber = prevValue && /^\d+$/.test(prevValue);
			const isIndependentPackage =
				isFullPackage && !isAfterKeepCommand && !isPrevPureNumber;

			const isPrevAnySyntax =
				/^[a-zA-Z]+\d+n?$/.test(prevValue) ||
				/^\d+[a-zA-Z]+\d+n?$/.test(prevValue) ||
				/^[dD]\d+[dD]\d+n?$/.test(prevValue);
			const isCurrentPureNumber = /^\d+$/.test(currentValue);

			const isMixedSyntaxAndPrevIsAnySyntax =
				isCurrentSyntax && isPrevAnySyntax;

			// ĐÃ SỬA: Nếu là cặp "dau10 duoi20" hoặc "duoi10 dau20" đi liền kề nhau, KHÔNG ngắt mảng con
			let isDauDuoiChain = false;
			if (isMixedSyntaxAndPrevIsAnySyntax) {
				const currentSyntaxStr =
					currentValue.match(/^([a-zA-Z]+)/)?.[1]?.toLowerCase() || "";
				const prevSyntaxStr =
					prevValue.match(/^([a-zA-Z]+)/)?.[1]?.toLowerCase() || "";
				if (
					(prevSyntaxStr === "dau" && currentSyntaxStr === "duoi") ||
					(prevSyntaxStr === "duoi" && currentSyntaxStr === "dau") ||
					(prevSyntaxStr === "dau" && currentSyntaxStr === "dui") ||
					(prevSyntaxStr === "dui" && currentSyntaxStr === "dau")
				) {
					isDauDuoiChain = true;
				}
			}

			if (
				((isNewStation && !isMultiStation) ||
					isIndependentPackage ||
					(isCurrentPureNumber && isPrevAnySyntax) ||
					isMixedSyntaxAndPrevIsAnySyntax) &&
				!isDauDuoiChain
			) {
				let cutIndex = i;
				if (isMixedSyntaxAndPrevIsAnySyntax || isIndependentPackage) {
					while (
						cutIndex > start &&
						/^\d+$/.test(finalArrValue[cutIndex - 1])
					) {
						cutIndex--;
					}
				}

				if (cutIndex > start && cutIndex < finalArrValue.length) {
					splitValue.push(finalArrValue.slice(start, cutIndex));
					start = cutIndex;
					i = cutIndex - 1;
				}
			}
		}
	}
	if (start < finalArrValue.length) {
		splitValue.push(finalArrValue.slice(start));
	}

	let activeStationContext: string = region === "mien-bac" ? "mb" : "";

	// =================================================================
	// BƯỚC 2: KIỂM TRA SÂU & KẾ THỪA ĐÀI
	// =================================================================
	for (let clusterIndex = 0; clusterIndex < splitValue.length; clusterIndex++) {
		let cluster = splitValue[clusterIndex];
		const numbersInCluster: string[] = [];
		let lastPrivateSyntax: string | null = null;

		let stationCountInCluster = 0;
		const firstToken = cluster[0];
		const isFirstTokenStation =
			isStationValidToday(firstToken) || isShortcutStation(firstToken);

		const handleCutOnError = (
			errorMessage: string,
			errorItem: string,
		): IReturn => {
			splitValue[clusterIndex] = cluster.slice(
				0,
				cluster.indexOf(errorItem) + 1,
			);
			return {
				notice: { message: errorMessage, status: "error" },
				statusValidated: { status: "error", itemError: errorItem },
				validatedValue: splitValue.slice(0, clusterIndex + 1),
			};
		};

		if (!isFirstTokenStation) {
			if (activeStationContext) {
				const previousStations = activeStationContext.split(",");
				stationCountInCluster = previousStations.length;
				cluster = [...previousStations, ...cluster];
				splitValue[clusterIndex] = cluster;
			} else {
				return handleCutOnError(
					"Chưa có Tên đài hoặc đài không có lịch mở thưởng hôm nay!",
					firstToken,
				);
			}
		}

		if (isFirstTokenStation) {
			const stations: string[] = [];
			for (const t of cluster) {
				if (isStationValidToday(t)) {
					stations.push(t.toLowerCase());
				} else if (isShortcutStation(t)) {
					const numDigits = parseInt(t, 10);
					if (numDigits < validStationsToday.size) {
						return handleCutOnError(
							`Hôm nay có tổng cộng ${validStationsToday.size} đài. Nếu chỉ đánh ${numDigits} đài, vui lòng gõ trực tiếp tên các đài cụ thể (Ví dụ: tp bli) chứ không được gõ tắt "${t}"!`,
							t,
						);
					}
					if (numDigits > validStationsToday.size) {
						return handleCutOnError(
							`Hôm nay miền này chỉ có tối đa ${validStationsToday.size} đài!`,
							t,
						);
					}
					stations.push(...stationsTodayArr);
				} else {
					break;
				}
			}

			stationCountInCluster = stations.length;
			activeStationContext = stations.join(",");

			const nonStationStartIndex = cluster.findIndex(
				(t) => !isStationValidToday(t) && !isShortcutStation(t),
			);
			cluster =
				nonStationStartIndex !== -1
					? [...stations, ...cluster.slice(nonStationStartIndex)]
					: [...stations];
			splitValue[clusterIndex] = cluster;
		}

		if (region === "mien-bac") {
			stationCountInCluster = 1;
		}

		for (let i = 0; i < cluster.length; i++) {
			const token = cluster[i];
			const prev = cluster[i - 1];
			const next = cluster[i + 1];

			if (/^[a-zA-Z]+$/.test(token) && token.toLowerCase() !== "k") {
				if (!isStationValidToday(token)) {
					return handleCutOnError(
						`Đài "${token}" không hợp lệ hoặc không có lịch mở thưởng hôm nay!`,
						token,
					);
				}
				if (!next)
					return handleCutOnError(
						"Chưa có Số/Cặp đánh và Cú pháp sau tên đài!",
						token,
					);
				continue;
			}

			if (token === "k") {
				if (!prev || !/^\d+$/.test(prev) || !next || !/^\d+$/.test(next)) {
					return handleCutOnError(
						"Lệnh kéo phải có số bắt đầu và số kết thúc hợp lệ! Ví dụ: 100 k 400 b10",
						token,
					);
				}
				if (prev.length !== next.length) {
					return handleCutOnError(
						`Lệnh kéo không hợp lệ! Số bắt đầu (${prev}) và số kết thúc (${next}) phải có độ dài bằng nhau.`,
						next,
					);
				}
				continue;
			}

			if (/^\d+$/.test(token)) {
				numbersInCluster.push(token);
				continue;
			}

			if (/^[dD]\d+[dD]\d+n?$/.test(token)) {
				continue;
			}

			if (/^\d+[a-zA-Z]+\d+n?$/.test(token)) {
				const matches = token.match(/^(\d+)([a-zA-Z]+)\d+n?$/);
				if (matches) {
					let [_, numPart, syntaxPart] = matches;
					syntaxPart = syntaxPart.toLowerCase();

					if (["dx", "dax"].includes(syntaxPart) && numPart.length !== 2) {
						return handleCutOnError(
							`Cú pháp đá xiên "${syntaxPart.toUpperCase()}" chỉ áp dụng cho số có 2 chữ số!`,
							token,
						);
					}
					if (syntax3Digit.has(syntaxPart) && numPart.length !== 3) {
						return handleCutOnError(
							`Cú pháp "${syntaxPart.toUpperCase()}" chỉ áp dụng cho số có đúng 3 càng!`,
							token,
						);
					}

					const isVoteSyntax = ["da", "dx", "dax"].includes(syntaxPart);
					if (isVoteSyntax && numbersInCluster.length + 1 < 2) {
						return handleCutOnError(
							`Cú pháp đá ("${syntaxPart.toUpperCase()}") bắt buộc phải có ít nhất 2 số đánh! Ví dụ: 10 20 ${token}`,
							token,
						);
					}
					if (
						stationCountInCluster < 2 &&
						(syntaxPart === "dax" || syntaxPart === "dx")
					) {
						return handleCutOnError(
							`Cú pháp đá xiên "${syntaxPart.toUpperCase()}" bắt buộc phải nhập ít nhất 2 đài!`,
							token,
						);
					}
					if (!isValidSyntaxWithNumber(numPart, syntaxPart)) {
						return handleCutOnError(
							`Cú pháp cụm "${token}" không hợp lệ! Cú pháp "${syntaxPart}" không đi với số có ${numPart.length} chữ số.`,
							token,
						);
					}

					numbersInCluster.push(numPart);
					lastPrivateSyntax = syntaxPart;
				}
				continue;
			}

			if (/^[a-zA-Z]+\d+n?$/.test(token)) {
				const syntaxStr = token.match(/^([a-zA-Z]+)/)?.[1]?.toLowerCase() || "";

				if (["dx", "dax"].includes(syntaxStr)) {
					if (
						numbersInCluster.length === 0 ||
						numbersInCluster.some((num) => num.length !== 2)
					) {
						return handleCutOnError(
							`Cú pháp đá xiên "${syntaxStr.toUpperCase()}" chỉ áp dụng cho các số có 2 chữ số!`,
							token,
						);
					}
				}

				if (syntax3Digit.has(syntaxStr)) {
					if (
						numbersInCluster.length === 0 ||
						numbersInCluster.some((num) => num.length !== 3)
					) {
						return handleCutOnError(
							`Cú pháp "${syntaxStr.toUpperCase()}" chỉ áp dụng cho các số có đúng 3 càng!`,
							token,
						);
					}
				}

				if (
					["da", "dx", "dax"].includes(syntaxStr) &&
					numbersInCluster.length < 2
				) {
					return handleCutOnError(
						`Cú pháp đá ("${syntaxStr.toUpperCase()}") bắt buộc phải có ít nhất 2 số đánh! Ví dụ: 10 20 ${token}`,
						token,
					);
				}

				if (
					stationCountInCluster < 2 &&
					(syntaxStr === "dax" || syntaxStr === "dx")
				) {
					return handleCutOnError(
						`Cú pháp đá xiên "${syntaxStr.toUpperCase()}" bắt buộc phải nhập ít nhất 2 đài!`,
						token,
					);
				}

				if (syntaxStr === "b" || syntaxStr === "lo") {
					if (numbersInCluster.length === 0 && prev !== "k") {
						return handleCutOnError(
							`Cú pháp "${token}" chưa có số đánh!`,
							token,
						);
					}
					continue;
				}

				if (lastPrivateSyntax !== null) {
					const activeSyntax = lastPrivateSyntax;
					const hasCommonNumber = numbersInCluster.some(
						(num) =>
							isValidSyntaxWithNumber(num, activeSyntax) &&
							isValidSyntaxWithNumber(num, syntaxStr),
					);
					if (!hasCommonNumber) {
						return handleCutOnError(
							`Cú pháp "${token}" không được đi liền sau cụm cú pháp trước đó vì chênh lệch cấu trúc độ dài số!`,
							token,
						);
					}
				} else {
					const targetNumbers =
						prev && /^\d+$/.test(prev) && cluster[i - 2] === "k"
							? [prev]
							: numbersInCluster;
					if (
						targetNumbers.length === 0 ||
						!targetNumbers.some((num) =>
							isValidSyntaxWithNumber(num, syntaxStr),
						)
					) {
						return handleCutOnError(
							`Cú pháp "${syntaxStr.toUpperCase()}" không áp dụng được cho cấu trúc các số đứng trước!`,
							token,
						);
					}
				}

				lastPrivateSyntax = syntaxStr;
				continue;
			}

			return handleCutOnError(
				`Cú pháp và Điểm không hợp lệ tại: "${token}"!`,
				token,
			);
		}
	}

	return {
		notice: { message: "Tin nhắn hợp lệ.", status: "success" },
		validatedValue: splitValue,
		statusValidated: { status: "success" },
	};
}

export { validateMessage };
