import { syntaxTypeList } from "#/constants/syntax-type.constant";
import { useOrderQuery } from "#/hooks/query/use-order-query";
import { formatDate } from "#/lib/date-format";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface IScore {
	co: number;
	xac: number; // Đây chính là TỔNG
	trung: number;
}

interface IDetailItem {
	number: string;
	score: IScore;
	syntaxName?: string;
	displayProvince?: string; // Tên đài/cặp đài (VD: "VL-BD")
}

interface AnalysisListProps {
	provinceCode: string;
	region: string;
	date: Date;
}

export function AnalysisList({
	provinceCode,
	region,
	date,
}: AnalysisListProps) {
	const { data } = useOrderQuery.getByDate(formatDate(date));

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
				const groupedData: Record<string, IDetailItem> = {};

				ordersInRegion.forEach((order) => {
					if (order.results && Array.isArray(order.results)) {
						order.results.forEach((resultObj) => {
							const allKeys = Object.keys(resultObj);

							allKeys.forEach((key) => {
								let isMatched = false;

								// XỬ LÝ RIÊNG CHO TAB "2c"
								if (syntax === "2c") {
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
									const targetObject = resultObj[key];
									if (!targetObject) return;

									// Lọc tìm các key đài phù hợp trong data
									const matchedProvinceKeys = Object.keys(targetObject).filter(
										(pKey) => {
											if (key === "da" || key === "dax") {
												const parts = pKey.split("-");
												return parts.includes(provinceCode);
											}
											return pKey === provinceCode;
										},
									);

									matchedProvinceKeys.forEach((pKey) => {
										const provinceData = targetObject[pKey];

										if (Array.isArray(provinceData)) {
											provinceData.forEach((item) => {
												// Nhóm dữ liệu kết hợp cả key đài để không bị cộng dồn nhầm giữa các cặp đài dax khác nhau
												const groupKey = `${key}-${item.number}-${pKey}`;

												if (groupedData[groupKey]) {
													groupedData[groupKey].score.co += item.score?.co ?? 0;
													groupedData[groupKey].score.xac +=
														item.score?.xac ?? 0;
													groupedData[groupKey].score.trung +=
														item.score?.trung ?? 0;
												} else {
													groupedData[groupKey] = {
														number: item.number,
														syntaxName: key,
														displayProvince: pKey,
														score: {
															co: item.score?.co ?? 0,
															xac: item.score?.xac ?? 0,
															trung: item.score?.trung ?? 0,
														},
													};
												}
											});
										}
									});
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
												{/* Đài để ở ngoài cùng bên trái */}
												<TableHead>Đài</TableHead>
												<TableHead>Cú pháp</TableHead>
												<TableHead>Số đánh</TableHead>
												<TableHead>Điểm</TableHead>
												<TableHead>Đã cân</TableHead>
												<TableHead>Tổng</TableHead>
												<TableHead>Đang dư</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody className="divide-y divide-border bg-background text-foreground">
											{finalDataList.map((item, idx) => {
												const rowKey = `${item.syntaxName}-${item.number}-${item.displayProvince}-${idx}`;

												const tong = item.score.xac;
												const daCan = 0;
												const diem = tong - daCan;

												return (
													<TableRow key={rowKey} className="text-center">
														{/* Cột Đài ở ngoài cùng: Chỉ hiển thị khi cú pháp là dax */}
														<TableCell className="font-semibold text-blue-600 lowercase">
															{item.syntaxName === "dax"
																? item.displayProvince
																: ""}
														</TableCell>
														<TableCell className="font-bold text-muted-foreground uppercase">
															{item.syntaxName}
														</TableCell>
														<TableCell>{item.number}</TableCell>
														<TableCell className="px-4 py-2.5 text-center text-blue-500 font-medium">
															{diem}
														</TableCell>
														<TableCell className="text-muted-foreground">
															{daCan}
														</TableCell>
														<TableCell className="font-semibold text-emerald-600">
															{tong}
														</TableCell>
														<TableCell>0</TableCell>
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
