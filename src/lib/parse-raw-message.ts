export function parseRawMessage(
	rawText: string,
	betPairSyntaxes: Record<string, string[]>,
	validKeysToCombine: string[],
): string {
	const debounceTrim = rawText.trim();

	if (!debounceTrim) {
		return "";
	}

	// Thay thế các ký tự không hợp lệ nhưng giữ lại các khoảng trắng để phân tách
	const cleanValue = debounceTrim.replace(/[^\p{L}\s;\d]/gu, " ");
	const initialSplit = cleanValue.split(/\s+/).filter(Boolean);

	const splitValue = initialSplit.flatMap((currentValue) => {
		// Không tách các cú pháp dạng số + d (2d, 3d, 4d, 10d...)
		if (/^\d+[dD]$/.test(currentValue)) {
			return currentValue;
		}

		let sanitizedValue = currentValue;

		// Xử lý các trường hợp đặc biệt:
		// Nếu gặp 'd10', 'd20'... ta giữ nguyên để không tách 'd' ra khỏi số
		if (/^[dD]\d+$/.test(sanitizedValue)) {
			return sanitizedValue;
		}

		if (
			/[a-zA-Z]+\d+[a-zA-Z]$/i.test(sanitizedValue) &&
			!/[nN]$/i.test(sanitizedValue)
		) {
			sanitizedValue = sanitizedValue.replace(/[a-zA-Z]$/i, "");
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

		// Lấy giá trị đứng trước currentValue từ mảng parsedKeywords ban đầu
		const prevValue = parsedKeywords[i - 1];

		// Kiểm tra xem phía trước có phải là số đánh thuần túy hay không (ví dụ: "100", "50")
		// và loại trừ trường hợp đứng trước là dạng chữ nối số như b20, bd200 hoặc các chữ đài tp, dn
		const isPrevPureNumber = prevValue && /^\d+$/.test(prevValue);

		// Chỉ kết hợp nếu:
		// 1. currentValue thuộc danh sách cần gộp (ví dụ: bd)
		// 2. Phía sau nó là một con số (ví dụ: 20)
		// 3. Phía trước nó BẮT BUỘC phải là một số đánh thuần túy
		if (
			validKeysToCombine.includes(currentValue) &&
			nextValue &&
			/^\d+$/.test(nextValue) &&
			isPrevPureNumber && // Thêm điều kiện này
			!/^\d+d$/i.test(currentValue) &&
			!/^[dD]\d+$/i.test(currentValue)
		) {
			finalResult.push(`${currentValue}${nextValue}`);
			i++; // Bỏ qua phần tử số kế tiếp vì đã gộp
		} else {
			finalResult.push(currentValue);
		}
	}

	const resultString = finalResult.join(" ");
	return resultString;
}
