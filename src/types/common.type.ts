type MessageType = { message: string };
type DetailListType = {
	total: number;
	page: number;
	totalPage: number;
};
type MessageInputType = MessageType & { status: "success" | "error" };

type StatusValidatedType = {
	status: "warning" | "success" | "error";
	itemError?: string;
};

type TransTypeT = "CO" | "XAC" | "TRUNG";

export type {
	MessageType,
	DetailListType,
	MessageInputType,
	StatusValidatedType,
	TransTypeT,
};
