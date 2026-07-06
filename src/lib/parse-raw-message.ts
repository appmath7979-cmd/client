export function parseRawMessage(
	rawText: string,
	betPairSyntaxes: Record<string, string[]>,
	validKeysToCombine: string[],
): string {
	const debounceTrim = rawText.trim();

	if (!debounceTrim) {
		return "";
	}

	const cleanValue = debounceTrim.replace(/[^\p{L}\s;\d]/gu, " ");
	const initialSplit = cleanValue.split(/\s+/).filter(Boolean);

	const splitValue = initialSplit.flatMap((currentValue) => {
		if (/^\d+[dD]$/.test(currentValue)) {
			return currentValue;
		}

		let sanitizedValue = currentValue;

		// --- SỬA TẠI ĐÂY: CHỈ XÓA CHỮ CÁI THỪA (Không phải n/N và không được là số) ---
		// Loại trừ hẳn các chữ số \d. Chỉ bắt chữ cái [a-zA-Z] ở cuối chuỗi mà không phải n, N
		if (
			/[a-zA-Z]+\d+[a-zA-Z]$/i.test(sanitizedValue) &&
			!/[nN]$/i.test(sanitizedValue)
		) {
			sanitizedValue = sanitizedValue.replace(/[a-zA-Z]$/i, ""); // Chỉ xóa đúng 1 chữ cái lỗi ở cuối
		}

		// Tách số đứng trước sát cú pháp (Ví dụ: "20b20" -> ["20", "b20"])
		const match = sanitizedValue.match(/^(\d+)([\p{L}a-zA-Z]+\d+[nN]?)$/u);
		if (match) {
			return [match[1], match[2]];
		}

		return sanitizedValue;
	});

	const parsedKeywords = splitValue.map((item) => {
		const lowerItem = item.toLowerCase();
		for (const [key, words] of Object.entries(betPairSyntaxes)) {
			if (words.includes(lowerItem)) {
				return key;
			}
		}
		return item;
	});

	const finalResult: string[] = [];
	for (let i = 0; i < parsedKeywords.length; i++) {
		const currentValue = parsedKeywords[i];
		const nextValue = parsedKeywords[i + 1];

		if (
			validKeysToCombine.includes(currentValue) &&
			nextValue &&
			/^\d+$/.test(nextValue)
		) {
			finalResult.push(`${currentValue}${nextValue}`);
			i++;
		} else {
			finalResult.push(currentValue);
		}
	}

	const resultString = finalResult.join(" ");
	return resultString;
}
