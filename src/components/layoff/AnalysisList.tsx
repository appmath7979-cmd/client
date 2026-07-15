import { syntaxTypeList } from "#/constants/syntax-type.constant";
import { useOrderQuery } from "#/hooks/query/use-order-query";
import { useDatePicker } from "#/hooks/use-date-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { formatDate } from "#/lib/date-format";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";

interface IScore {
	co: number;
	xac: number;
	trung: number;
}

interface IDetailItem {
	number: string;
	score: IScore;
	syntaxName?: string; // Ví dụ: b2, dd2, v.v.
}

interface AnalysisListProps {
	provinceCode: string;
	region: string;
}

export function AnalysisList({ provinceCode, region }: AnalysisListProps) {
	const { date } = useDatePicker();
	const { data } = useOrderQuery.getByDate(formatDate(date));

	// 1. Lọc orders theo đúng Vùng miền
	const ordersInRegion = data
		? data.orders.filter((order) => order.region === region)
		: [];

	return (
		<Tabs>
			<TabsList className={"w-full"}>
				{syntaxTypeList.map((syntax) => (
					<TabsTrigger key={`${syntax}-trigger`} value={syntax}>
						{syntax}
					</TabsTrigger>
				))}
			</TabsList>

			{syntaxTypeList.map((syntax) => {
				// Sử dụng một Record (object) để nhóm và cộng dồn dữ liệu
				// Key của map sẽ có dạng: "syntaxName-number" (VD: "b2-20_dau")
				const groupedData: Record<string, IDetailItem> = {};

				ordersInRegion.forEach((order) => {
					if (order.results && Array.isArray(order.results)) {
						order.results.forEach((resultObj) => {
							const allKeys = Object.keys(resultObj);

							allKeys.forEach((key) => {
								let isMatched = false;

								// XỬ LÝ RIÊNG CHO TAB "2c"
								if (syntax === "2c") {
									// Thỏa mãn: Key có chứa số '2' VÀ không phải 'da', 'dax'
									if (key.includes("2") && key !== "da" && key !== "dax") {
										isMatched = true;
									}
								}
								// CÁC TAB CÒN LẠI (3c, 4c, da, dax)
								else {
									if (key === syntax) {
										isMatched = true;
									}
								}

								if (isMatched) {
									const provinceData = resultObj[key][provinceCode];
									if (Array.isArray(provinceData)) {
										provinceData.forEach((item) => {
											// Tạo một key duy nhất kết hợp giữa cú pháp và số đánh
											const groupKey = `${key}-${item.number}`;

											if (groupedData[groupKey]) {
												// Nếu đã tồn tại, cộng dồn các giá trị score
												groupedData[groupKey].score.co += item.score?.co ?? 0;
												groupedData[groupKey].score.xac += item.score?.xac ?? 0;
												groupedData[groupKey].score.trung +=
													item.score?.trung ?? 0;
											} else {
												// Nếu chưa tồn tại, khởi tạo phần tử mới (nhớ clone object score để không ảnh hưởng dữ liệu gốc)
												groupedData[groupKey] = {
													number: item.number,
													syntaxName: key,
													score: {
														co: item.score?.co ?? 0,
														xac: item.score?.xac ?? 0,
														trung: item.score?.trung ?? 0,
													},
												};
											}
										});
									}
								}
							});
						});
					}
				});

				// Chuyển đổi object đã nhóm về lại dạng mảng để render
				const finalDataList = Object.values(groupedData);

				return (
					<TabsContent key={`${syntax}-content`} value={syntax}>
						<div className="p-2 text-sm text-muted-foreground">
							{finalDataList.length > 0 ? (
								<div className="overflow-x-auto border rounded-lg">
									<Table className="min-w-full divide-y divide-border text-left">
										<TableHeader className="bg-muted text-muted-foreground uppercase text-xs font-semibold">
											<TableRow className="[&_th]:font-semibold! [&_th]:text-center">
												<TableHead>Cú pháp</TableHead>
												<TableHead>Số đánh</TableHead>
												<TableHead>Điểm</TableHead>
												{/* Các cột này bạn có thể bổ sung dữ liệu sau theo yêu cầu thực tế */}
												<TableHead>Đã cân</TableHead>
												<TableHead>Tổng</TableHead>
												<TableHead>Đang dư</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody className="divide-y divide-border bg-background text-foreground">
											{finalDataList.map((item, idx) => {
												const rowKey = `${item.syntaxName}-${item.number}-${idx}`;
												return (
													<TableRow key={rowKey} className="text-center">
														<TableCell className="font-bold text-muted-foreground uppercase">
															{item.syntaxName}
														</TableCell>
														<TableCell>{item.number}</TableCell>
														<TableCell className="px-4 py-2.5 text-center text-blue-500">
															{item.score.xac}
														</TableCell>
														<TableCell>-</TableCell>
														<TableCell>-</TableCell>
														<TableCell>-</TableCell>
													</TableRow>
												);
											})}
										</TableBody>
									</Table>
								</div>
							) : (
								<p className="text-center py-4">Chưa có thông tin</p>
							)}
						</div>
					</TabsContent>
				);
			})}
		</Tabs>
	);
}