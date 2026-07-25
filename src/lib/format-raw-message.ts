export function formatRawMessage(
	rawText: string,
	betPairSyntaxes: Record<string, string[]>,
	validKeysToCombine: string[],
): string {
	if (!rawText) {
		return "";
	}

	if (/\s$/.test(rawText)) {
		return rawText;
	}

	const debounceTrim = rawText.trim();
	const cleanValue = debounceTrim.replace(/[^\p{L}\s;\d]/gu, " ");
	const initialSplit = cleanValue.split(/\s+/).filter(Boolean);

	const splitValue = initialSplit.flatMap((currentValue) => {
		// Tách các trường hợp dính liền kiểu d20d30 thành ['d20', 'd30']
		const combinedMatch = currentValue.match(/[dD]\d+/g);
		if (combinedMatch && combinedMatch.length > 1) {
			return combinedMatch;
		}

		if (/^\d+[dD]$/.test(currentValue)) {
			return currentValue;
		}

		let sanitizedValue = currentValue;

		if (
			/[a-zA-Z]+\d+[a-zA-Z]$/i.test(sanitizedValue) &&
			!/[nN]$/i.test(sanitizedValue)
		) {
			sanitizedValue = sanitizedValue.replace(/[a-zA-Z]$/i, "");
		}

		if (/^[dD]\d+$/.test(sanitizedValue)) {
			return sanitizedValue;
		}

		const match = sanitizedValue.match(/^(\d+)([\p{L}a-zA-Z]+\d+[nN]?)$/u);
		if (match) {
			return [match[1], match[2]];
		}

		return sanitizedValue;
	});

	// Đếm số lượng chữ d đã gặp để tự động phân biệt dau / duoi nếu nhập d20 d30
	let dCount = 0;

	const parsedKeywords = splitValue.map((item) => {
		const lowerItem = item.toLowerCase();

		// Nếu gặp dạng d + số (ví dụ d20, d30)
		if (/^[dD]\d+$/.test(lowerItem)) {
			dCount++;
			const num = lowerItem.replace(/^[dD]/, "");
			// d đầu tiên -> dau, d thứ hai (hoặc từ chẵn) -> duoi
			const mappedKey = dCount % 2 !== 0 ? `dau${num}` : `duoi${num}`;
			return mappedKey;
		}

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
		const prevValue = parsedKeywords[i - 1];
		const isPrevPureNumber = prevValue && /^\d+$/.test(prevValue);

		if (
			validKeysToCombine.includes(currentValue) &&
			nextValue &&
			/^\d+$/.test(nextValue) &&
			isPrevPureNumber &&
			!/^\d+d$/i.test(currentValue) &&
			!/^[dD]\d+$/.test(currentValue)
		) {
			finalResult.push(`${currentValue}${nextValue}`);
			i++;
		} else {
			finalResult.push(currentValue);
		}
	}

	return finalResult.join(" ");
}