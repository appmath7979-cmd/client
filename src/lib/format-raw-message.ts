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
		const prevValue = parsedKeywords[i - 1];
		const isPrevPureNumber = prevValue && /^\d+$/.test(prevValue);

		if (
			validKeysToCombine.includes(currentValue) &&
			nextValue &&
			/^\d+$/.test(nextValue) &&
			isPrevPureNumber &&
			!/^\d+d$/i.test(currentValue) &&
			!/^[dD]\d+$/i.test(currentValue)
		) {
			finalResult.push(`${currentValue}${nextValue}`);
			i++;
		} else {
			finalResult.push(currentValue);
		}
	}

	return finalResult.join(" ");
}
