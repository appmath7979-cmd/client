interface IValidateStatus {
	message: string;
	status: "success" | "error" | "warning";
}

interface IValidateMessageResult extends IValidateStatus {
	chunks: string[][];
}

interface IMessageScoreItem {
	xac: number;
	co: number;
	trung: number;
}

interface IMessageValueItem {
	number: string;
	score: IMessageScoreItem;
}

interface ISimpleStationGroup {
	[stationCode: string]: IMessageValueItem[];
}

type IGroupedBetItem = Record<string, ISimpleStationGroup>;

export type {
	IValidateStatus,
	IValidateMessageResult,
	IMessageScoreItem,
	IMessageValueItem,
	ISimpleStationGroup,
	IGroupedBetItem,
};