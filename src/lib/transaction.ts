import type { ITransItemRes } from "#/types/transaction.type";

// Cấu trúc item sau khi Object.entries(), bây giờ cả 2 mảng đều chứa số (number)
export type ISummaryItem = [string, number];

// 🛠️ Hàm Helper bóc tách và tính toán giá trị của chuỗi công thức (Ví dụ: "100*0.75" -> 75)
export function evaluateExpression(expr: string): number {
	if (!expr) return 0;
	if (/^\d+(\.\d+)?$/.test(expr)) return Number(expr);

	try {
		if (expr.includes("+")) {
			return expr
				.split("+")
				.reduce((sum, part) => sum + evaluateExpression(part), 0);
		}
		if (expr.includes("*")) {
			const [multiplicand, multiplier] = expr.split("*");
			return evaluateExpression(multiplicand) * evaluateExpression(multiplier);
		}
	} catch {
		return 0;
	}
	return Number(expr) || 0;
}

export function transactionCalculator(
	transactions: ITransItemRes[] | undefined,
): [ISummaryItem[], ISummaryItem[]] {
	// 1. Làm phẳng toàn bộ content giống logic cũ của bạn
	const contents = transactions?.flatMap((trans) => trans.content) || [];

	// Khởi tạo 2 Object tích lũy lưu trữ con số độc lập
	const xacMap: Record<string, number> = {};
	const coMap: Record<string, number> = {};

	contents.forEach((cont) => {
		const numberPair = cont[1];
		const syntax = cont[2];
		const value = cont[3];

		if (!numberPair) return;

		// 2. Tính độ dài số (Logic cũ)
		const getLength = numberPair.includes("-")
			? numberPair.split("-")[0].length
			: numberPair.length;

		// 3. Quy đổi nhóm cú pháp về 'dd' (Logic cũ)
		let parseSyntax = "";
		if (["xc", "xdau", "xduoi", "dau", "duoi"].includes(syntax)) {
			parseSyntax = "dd";
		} else {
			parseSyntax = syntax;
		}

		const groupKey = `${getLength}${parseSyntax}`;

		// 4. Phân loại để đưa vào đúng Object tích lũy và tính toán cộng dồn
		if (value) {
			// Nếu chứa dấu toán học -> Thuộc về CÒ (Tính toán ra số rồi cộng dồn)
			if (value.includes("*") || value.includes("+")) {
				const calculatedCoScore = evaluateExpression(value);
				coMap[groupKey] = (coMap[groupKey] || 0) + calculatedCoScore;
			} else {
				// Ngược lại -> Thuộc về XÁC
				xacMap[groupKey] = (xacMap[groupKey] || 0) + (Number(value) || 0);
			}
		}
	});

	// 5. Chuyển đổi cả 2 Object thành dạng mảng Entries giống nhau hoàn toàn
	const xacSummaryList = Object.entries(xacMap); // [ ["2dd", 120], ["3xc", 50] ]
	const coSummaryList = Object.entries(coMap); // [ ["2dd", 95],  ["3xc", 36] ]

	return [xacSummaryList, coSummaryList];
}
