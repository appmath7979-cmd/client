import { cn } from "#/lib/utils";
import type { OrderItemApiType } from "#/types/apis/message.type";
import type { RegionType } from "#/types/region.type";
import { CustomerMessageItem } from "./CustomerMessageItem";

interface DetailListProps {
	data: OrderItemApiType | undefined;
	region: RegionType;
}

export function DetailList({ data, region }: DetailListProps) {
	// Lọc danh sách đơn hàng theo vùng miền trước
	const listOrder = data ? data.filter((item) => item.region === region) : [];

	// Lấy danh sách các khung giờ duy nhất từ danh sách đã lọc theo miền
	const listTime = [...new Set(listOrder.map((item) => item.timeRelease))];

	return (
		<div className="space-y-6">
			{listTime.length > 0 ? (
				listTime.map((time, index) => {
					const key = `${time}-${index}`;

					const ordersInTime = listOrder.filter(
						(item) => item.timeRelease === time,
					);

					let grandTotalCo = 0;
					let grandTotalTrung = 0;

					return (
						<div
							key={key}
							className="border rounded-lg p-4 bg-card shadow-xs space-y-3"
						>
							<div className="text-sm font-bold text-muted-foreground border-b pb-2 flex justify-between items-center">
								<span>{index + 1}</span>
								<span className="text-xs font-normal">
									({ordersInTime.length} đơn hàng)
								</span>
							</div>

							<div className="divide-y border rounded-md overflow-hidden">
								{ordersInTime.map((order) => (
									<div key={order.id} className="divide-y last:border-b-0">
										{order.results?.map((resultItem, resIndex) => {
											const resultKey = `${order.id}-${resIndex}`;

											return (
												<div
													key={resultKey}
													className={cn(resIndex % 2 !== 0 && "bg-muted/50")}
												>
													{Object.keys(resultItem || {}).map((typeKey) => {
														const stations = resultItem?.[typeKey] || {};

														let tongXac = 0;
														let tongCo = 0;
														let tongTrung = 0;

														Object.keys(stations).forEach((stationName) => {
															stations[stationName]?.forEach?.((item) => {
																const co = Number(item.score?.co ?? 0);
																const trung = Number(item.score?.trung ?? 0);

																tongXac += Number(item.score?.xac ?? 0);
																tongCo += co;
																tongTrung += trung;

																grandTotalCo += co;
																grandTotalTrung += trung;
															});
														});

														return (
															<div
																key={typeKey}
																className="flex items-center text-center text-sm hover:bg-muted/30 transition-colors [&>div]:py-2 [&>*:not(:first-child)]:border-l"
															>
																<CustomerMessageItem
																	type="TYPE"
																	content={typeKey}
																/>
																<CustomerMessageItem
																	type="XAC"
																	content={tongXac.toLocaleString("vi-VN")}
																/>
																<CustomerMessageItem
																	type="CO"
																	content={tongCo.toLocaleString("vi-VN")}
																/>
																<CustomerMessageItem
																	type="TRUNG"
																	content={tongTrung.toLocaleString("vi-VN")}
																/>
															</div>
														);
													})}
												</div>
											);
										})}
									</div>
								))}
							</div>

							{/* Phần tổng kết (Tổng Cò - Tổng Trúng) riêng cho Khung giờ này */}
							<div
								className={cn(
									"bg-muted/40 p-2.5 rounded-md border flex justify-between items-center text-xs font-semibold",
									grandTotalCo - grandTotalTrung >= 0
										? "text-emerald-600"
										: "text-red-600",
								)}
							>
								<span className="text-muted-foreground">
									{grandTotalCo - grandTotalTrung >= 0 ? "Thu" : "Chi"}
								</span>
								<span>
									{(grandTotalCo - grandTotalTrung).toLocaleString("vi-VN")}
								</span>
							</div>
						</div>
					);
				})
			) : (
				<p className="py-8 text-muted-foreground text-center text-sm border rounded-lg border-dashed">
					Chưa có dữ liệu theo miền yêu cầu
				</p>
			)}
		</div>
	);
}
