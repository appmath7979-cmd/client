import { cn } from "#/lib/utils";
import type { OrderItemApiType } from "#/types/apis/message.type";
import type { RegionType } from "#/types/region.type";
import { CustomerMessageItem } from "../CustomerMessageItem";
import DetailActions from "./DetailActions";

interface DetailListProps {
	data: OrderItemApiType[] | undefined;
	region: RegionType;
	customerId: string;
}

export function DetailList({ data, region, customerId }: DetailListProps) {
	const listOrder = data ? data.filter((item) => item.region === region) : [];

	return (
		<div className="space-y-6">
			{listOrder.length > 0 ? (
				listOrder.map((order, index) => {
					let grandTotalCo = 0;
					let grandTotalTrung = 0;

					const orderName = `Tin nhắn ${index + 1}`;

					return (
						<div
							key={order.id}
							className="border rounded-lg p-4 bg-card shadow-xs space-y-3"
						>
							<div className="text-sm font-bold text-muted-foreground border-b pb-2 flex justify-between items-center">
								<span className="bg-muted px-2 py-0.5 rounded text-xs">
									{orderName}
								</span>
								<DetailActions
									customerId={customerId}
									orderId={order.id}
									orderName={orderName}
								/>
							</div>

							<div className="divide-y border rounded-md overflow-hidden">
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

							<p
								className={cn(
									"bg-muted/40 p-2.5 rounded-md border font-semibold flex justify-between items-center text-sm",
									grandTotalCo - grandTotalTrung >= 0
										? "text-emerald-600"
										: "text-red-600",
								)}
							>
								{grandTotalCo - grandTotalTrung >= 0 ? "Thu" : "Chi"}{" "}
								{(grandTotalCo - grandTotalTrung).toLocaleString("vi-VN")}
							</p>
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
