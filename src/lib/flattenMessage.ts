/**
 * Hàm phụ trợ dùng để sinh ra tất cả các hoán vị (số đảo) không trùng lặp từ một chuỗi số
 * Ví dụ: '100' -> ['100', '010', '001']
 */
function getPermutations(numStr: string): string[] {
	const results = new Set<string>();

	const permute = (arr: string[], m: string[] = []) => {
		if (arr.length === 0) {
			results.add(m.join(""));
		} else {
			for (let i = 0; i < arr.length; i++) {
				const curr = arr.slice();
				const next = curr.splice(i, 1);
				permute(curr.slice(), m.concat(next));
			}
		}
	};

	permute(numStr.split(""));
	return Array.from(results);
}

/**
 * Hàm phụ trợ dùng để bắt các cặp số và nối lại thành dạng "số-số"
 */
function getPairNumbers(numbers: string[]): string[] {
	const pairs: string[] = [];
	for (let i = 0; i < numbers.length; i++) {
		for (let j = i + 1; j < numbers.length; j++) {
			const sortedPair = [numbers[i], numbers[j]].sort(
				(a, b) => Number(a) - Number(b),
			);
			pairs.push(`${sortedPair[0]}-${sortedPair[1]}`);
		}
	}
	return pairs;
}

/**
 * Hàm phụ trợ dùng để bắt các cặp đài (tỉnh) và nối lại dạng "đài-đài"
 */
function getPairStations(stations: string[]): string[] {
	const pairs: string[] = [];
	for (let i = 0; i < stations.length; i++) {
		for (let j = i + 1; j < stations.length; j++) {
			const sortedStations = [stations[i], stations[j]].sort();
			pairs.push(`${sortedStations[0]}-${sortedStations[1]}`);
		}
	}
	return pairs;
}

// Bộ cấu pháp để phân loại độ dài số khi rã
const syntax3DigitSet = new Set([
	"bd",
	"baodao",
	"xc",
	"xdau",
	"xduoi",
	"xdui",
]);
const syntax2DigitSet = new Set(["da", "dx", "dax", "dau", "duoi"]);

export function flattenMessage(arrValue: Array<string[]>) {
	console.log("Dữ liệu mảng split gốc nhập vào:", arrValue);

	const finalResult: Array<string[]> = [];

	for (const cluster of arrValue) {
		const currentStations: string[] = [];
		const pendingNumbers: string[] = [];

		// --- BƯỚC TIỀN XỬ LÝ (PRE-PROCESS) CLUSTER ĐỂ RÃ CÁC CÚ PHÁP ĐẶC BIỆT ---
		const normalizedCluster: string[] = [];
		for (const token of cluster) {
			const lowerToken = token.toLowerCase();

			// 1. Xử lý dạng d10d20 -> tách thành dau10 và duoi20
			if (/^d\d+d\d+n?$/.test(lowerToken)) {
				const match = lowerToken.match(/^d(\d+)d(\d+)(n?)$/);
				if (match) {
					const [_, dauPt, duoiPt, nPt] = match;
					normalizedCluster.push(`dau${dauPt}${nPt}`);
					normalizedCluster.push(`duoi${duoiPt}${nPt}`);
				}
				continue;
			}

			// 2. Chuẩn hóa chữ 'dui' đứng một mình hoặc dạng 'dui10' -> 'duoi10'
			if (/^dui\d*n?$/.test(lowerToken)) {
				normalizedCluster.push(lowerToken.replace("dui", "duoi"));
				continue;
			}

			// 3. Giữ nguyên các trường hợp khác
			normalizedCluster.push(token);
		}
		// ------------------------------------------------------------------

		for (let i = 0; i < normalizedCluster.length; i++) {
			const token = normalizedCluster[i];
			const lowerToken = token.toLowerCase();

			// 1. Thu thập danh sách tên đài trong cụm
			if (
				/^[a-zA-Z]+$/.test(token) &&
				lowerToken !== "k" &&
				lowerToken !== "dd" &&
				lowerToken !== "dau" &&
				lowerToken !== "duoi" &&
				lowerToken !== "dui"
			) {
				currentStations.push(token);
				continue;
			}

			// 2. Nếu gặp lệnh kéo "k" -> Tự động bung chuỗi số từ Start đến End
			if (lowerToken === "k") {
				const prev = normalizedCluster[i - 1];
				const next = normalizedCluster[i + 1];
				if (prev && /^\d+$/.test(prev) && next && /^\d+$/.test(next)) {
					const startNum = parseInt(prev, 10);
					const endNum = parseInt(next, 10);
					const length = prev.length;

					pendingNumbers.pop();

					const step = startNum <= endNum ? 1 : -1;
					for (
						let n = startNum;
						startNum <= endNum ? n <= endNum : n >= endNum;
						n += step
					) {
						pendingNumbers.push(String(n).padStart(length, "0"));
					}
					i++;
				}
				continue;
			}

			// 3. Nếu là số thuần túy -> Đẩy vào danh sách số chờ
			if (/^\d+$/.test(token)) {
				pendingNumbers.push(token);
				continue;
			}

			// 4. Nếu là gói viết liền đầy đủ Số + Chữ + Số (Ví dụ: 30da20, 100bd20)
			if (/^\d+[a-zA-Z]+\d+n?$/.test(token)) {
				const match = token.match(/^(\d+)([a-zA-Z]+)(\d+)n?$/);
				if (match) {
					const [_, numPart, syntaxPart, pointPart] = match;
					const syntaxLower = syntaxPart.toLowerCase();

					const allNumbers = [...pendingNumbers, numPart];

					const targetSyntaxes: string[] = [];
					if (syntaxLower === "dd") {
						targetSyntaxes.push("dau", "duoi");
					} else if (syntaxLower === "dui") {
						targetSyntaxes.push("duoi");
					} else {
						targetSyntaxes.push(syntaxLower);
					}

					for (const currentSyntax of targetSyntaxes) {
						if (currentSyntax === "da") {
							const pairs = getPairNumbers(allNumbers);
							for (const station of currentStations) {
								for (const combinedPair of pairs) {
									finalResult.push([
										station,
										combinedPair,
										syntaxPart === "dd" ? currentSyntax : syntaxPart,
										pointPart,
									]);
								}
							}
						} else if (
							currentStations.length >= 2 &&
							(currentSyntax === "dax" || currentSyntax === "dx")
						) {
							const stationPairs = getPairStations(currentStations);
							const numberPairs = getPairNumbers(allNumbers);

							for (const stationPair of stationPairs) {
								for (const numberPair of numberPairs) {
									finalResult.push([
										stationPair,
										numberPair,
										syntaxPart,
										pointPart,
									]);
								}
							}
						} else {
							// CÚ PHÁP THƯỜNG + ĐẦU / ĐUÔI
							const validNumbersForSyntax = allNumbers.filter((num) => {
								if (currentSyntax === "b" || currentSyntax === "lo")
									return num.length >= 2 && num.length <= 4;
								if (syntax3DigitSet.has(currentSyntax)) return num.length === 3;
								if (syntax2DigitSet.has(currentSyntax)) return num.length === 2;
								return true;
							});

							for (const station of currentStations) {
								for (const validNum of validNumbersForSyntax) {
									// ĐÃ CẬP NHẬT: Xử lý rã đảo cho bao đảo viết liền (ví dụ: 100bd20)
									if (currentSyntax === "bd" || currentSyntax === "baodao") {
										const permutedNumbers = getPermutations(validNum);
										for (const permutedNum of permutedNumbers) {
											finalResult.push([
												station,
												permutedNum,
												syntaxPart,
												pointPart,
											]);
										}
									} else {
										finalResult.push([
											station,
											validNum,
											syntaxPart === "dd" ? currentSyntax : currentSyntax,
											pointPart,
										]);
									}
								}
							}
						}
					}

					pendingNumbers.push(numPart);
				}
				continue;
			}

			// 5. Nếu là cú pháp rời dính điểm (Ví dụ: tp 100 bd20)
			if (/^[a-zA-Z]+\d+n?$/.test(token)) {
				const match = token.match(/^([a-zA-Z]+)(\d+)n?$/);
				if (match) {
					const [_, syntaxPart, pointPart] = match;
					const syntaxLower = syntaxPart.toLowerCase();

					const targetSyntaxes: string[] = [];
					if (syntaxLower === "dd") {
						targetSyntaxes.push("dau", "duoi");
					} else if (syntaxLower === "dui") {
						targetSyntaxes.push("duoi");
					} else {
						targetSyntaxes.push(syntaxLower);
					}

					for (const currentSyntax of targetSyntaxes) {
						if (currentSyntax === "da") {
							const pairs = getPairNumbers(pendingNumbers);
							for (const station of currentStations) {
								for (const combinedPair of pairs) {
									finalResult.push([
										station,
										combinedPair,
										syntaxPart === "dd" ? currentSyntax : syntaxPart,
										pointPart,
									]);
								}
							}
						} else if (
							currentStations.length >= 2 &&
							(currentSyntax === "dax" || currentSyntax === "dx")
						) {
							const stationPairs = getPairStations(currentStations);
							const numberPairs = getPairNumbers(pendingNumbers);

							for (const stationPair of stationPairs) {
								for (const numberPair of numberPairs) {
									finalResult.push([
										stationPair,
										numberPair,
										syntaxPart,
										pointPart,
									]);
								}
							}
						} else {
							// CÚ PHÁP THƯỜNG + ĐẦU / ĐUÔI RỜI
							const validNumbersForSyntax = pendingNumbers.filter((num) => {
								if (currentSyntax === "b" || currentSyntax === "lo")
									return num.length >= 2 && num.length <= 4;
								if (syntax3DigitSet.has(currentSyntax)) return num.length === 3;
								if (syntax2DigitSet.has(currentSyntax)) return num.length === 2;
								return true;
							});

							for (const station of currentStations) {
								for (const singleNumber of validNumbersForSyntax) {
									// ĐÃ CẬP NHẬT: Xử lý rã đảo cho bao đảo cú pháp rời (Ví dụ: 100 bd20)
									if (currentSyntax === "bd" || currentSyntax === "baodao") {
										const permutedNumbers = getPermutations(singleNumber);
										for (const permutedNum of permutedNumbers) {
											finalResult.push([
												station,
												permutedNum,
												syntaxPart,
												pointPart,
											]);
										}
									} else {
										finalResult.push([
											station,
											singleNumber,
											syntaxPart === "dd" ? currentSyntax : currentSyntax,
											pointPart,
										]);
									}
								}
							}
						}
					}
				}
			}
		}
	}

	return finalResult;
}
