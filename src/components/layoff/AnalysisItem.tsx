import type { IAnalysisDetail } from "#/types/analysis.type";
import { TableCell, TableRow } from "../ui/table";

export function AnalysisItem({
	item,
	idx,
}: {
	item: IAnalysisDetail;
	idx: number;
}) {
	return (
		<TableRow className="text-center">
			{/* 1. STT */}
			<TableCell className="font-medium">{idx + 1}</TableCell>

			{/* 2. Đài */}
			<TableCell className="font-semibold text-blue-600 uppercase">
				{item.stationCode}
			</TableCell>

			{/* 3. Cú pháp */}
			<TableCell className="font-bold text-muted-foreground uppercase">
				{item.syntax}
			</TableCell>

			{/* 4. Số đánh */}
			<TableCell className="font-medium text-foreground">
				{item.number}
			</TableCell>

			{/* 5. Điểm (xac) */}
			<TableCell className="px-4 py-2.5 text-center text-blue-500 font-semibold">
				{item.diem}
			</TableCell>

			{/* 6. Đã cân */}
			<TableCell className="font-semibold text-amber-600">
				{item.daCan}
			</TableCell>

			{/* 7. Tổng */}
			<TableCell className="font-semibold text-emerald-600">
				{item.tong}
			</TableCell>

			{/* 8. Đang dư */}
			<TableCell className="font-bold text-red-600">{item.dangDu}</TableCell>
		</TableRow>
	);
}
