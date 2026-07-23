interface IValidateStatus {
	message: string;
	status: "success" | "error" | "warning";
}

interface IValidateMessageResult extends IValidateStatus {
	chunks: string[][];
}

// Đây là Type phẳng mới thay thế cho đống lồng nhau cũ
interface IOrderDetailsInput {
	syntax: string; // Cấu trúc càng: "2c", "3c", "4c"
	stationCode: string; // Mã đài (Vd: "TP", "TP-DT")
	number: string; // Số đánh sạch (Vd: "20")
	type: string; // Loại cược cốt lõi: "bao", "dau", "duoi", "dd", "da", "dax", "xc",...
	xac: number;
}

export type { IValidateStatus, IValidateMessageResult, IOrderDetailsInput };
