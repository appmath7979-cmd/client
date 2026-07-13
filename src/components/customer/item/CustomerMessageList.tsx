import { cn } from "#/lib/utils";
import type { OrderItemApiType } from "#/types/apis/message.type";
import type { RegionType } from "#/types/region.type";
import { CustomerMessageItem } from "./CustomerMessageItem";

interface CustomerTypeListProps {
	data: OrderItemApiType | undefined;
	region: RegionType;
}

export function CustomerMessageList({ data, region }: CustomerTypeListProps) {
	const list = data?.filter((item) => item.region === region) || [];

	let grandTotalCo = 0;
	let grandTotalTrung = 0;

	return (
		<div>
			{list.length > 0 ? (
				<>
					{list.map((order) => (
						<div key={order.id} className="divide-y border-b last:border-0">
							{order.results?.map((resultItem, resIndex) => {
								const key = `${resultItem}-${resIndex}`;
								return (
									<div
										key={key}
										className={cn(resIndex % 2 !== 0 && "bg-muted/0")}
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
													<CustomerMessageItem type="TYPE" content={typeKey} />
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

					<p
						className={cn(
							"bg-muted/60 px-3 py-2 text-center text-sm font-semibold",
							grandTotalCo - grandTotalTrung >= 0
								? "text-emerald-600"
								: "text-red-600",
						)}
					>
						{grandTotalCo - grandTotalTrung >= 0 ? "Thu" : "Chi"}{" "}
						{(grandTotalCo - grandTotalTrung).toLocaleString("vi-VN")}
					</p>
				</>
			) : (
				<p className="py-4 text-muted-foreground font-semibold text-center text-sm">
					Chưa có dữ liệu
				</p>
			)}
		</div>
	);
}
