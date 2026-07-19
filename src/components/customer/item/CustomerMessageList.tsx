import { cn } from "#/lib/utils";
import type { OrderItemApiType } from "#/types/apis/message.type";
import type { RegionType } from "#/types/region.type";
import { CustomerMessageItem } from "./CustomerMessageItem";

interface CustomerTypeListProps {
	data: OrderItemApiType[] | undefined;
	region: RegionType;
}

interface IGroupedSyntax {
	typeKey: string;
	tongXac: number;
	tongCo: number;
	tongTrung: number;
}

export function CustomerMessageList({ data, region }: CustomerTypeListProps) {
	// 1. Lọc orders theo đúng Vùng miền
	const list = data?.filter((item) => item.region === region) || [];

	// Tạo đối tượng gom nhóm theo Cú pháp (typeKey)
	const groupedSyntaxes: Record<string, IGroupedSyntax> = {};

	let grandTotalCo = 0;
	let grandTotalTrung = 0;

	// 2. Tiến hành duyệt và cộng dồn toàn bộ dữ liệu cùng cú pháp
	list.forEach((order) => {
		order.results?.forEach((resultItem) => {
			if (!resultItem) return;

			Object.keys(resultItem).forEach((typeKey) => {
				const stations = resultItem[typeKey] || {};

				// Khởi tạo cú pháp trong group nếu chưa tồn tại
				if (!groupedSyntaxes[typeKey]) {
					groupedSyntaxes[typeKey] = {
						typeKey,
						tongXac: 0,
						tongCo: 0,
						tongTrung: 0,
					};
				}

				Object.keys(stations).forEach((stationName) => {
					stations[stationName]?.forEach?.((item) => {
						const xac = Number(item.score?.xac ?? 0);
						const co = Number(item.score?.co ?? 0);
						const trung = Number(item.score?.trung ?? 0);

						groupedSyntaxes[typeKey].tongXac += xac;
						groupedSyntaxes[typeKey].tongCo += co;
						groupedSyntaxes[typeKey].tongTrung += trung;

						grandTotalCo += co;
						grandTotalTrung += trung;
					});
				});
			});
		});
	});

	const finalGroupedList = Object.values(groupedSyntaxes);

	return (
		<div>
			{finalGroupedList.length > 0 ? (
				<>
					<div className="divide-y border-b">
						{finalGroupedList.map((groupedItem, index) => {
							return (
								<div
									key={groupedItem.typeKey}
									className={cn(
										"flex items-center text-center text-sm hover:bg-muted/30 transition-colors [&>div]:py-2 [&>*:not(:first-child)]:border-l",
										index % 2 !== 0 && "bg-muted/10",
									)}
								>
									<CustomerMessageItem
										type="TYPE"
										content={groupedItem.typeKey}
									/>
									<CustomerMessageItem
										type="XAC"
										content={groupedItem.tongXac.toLocaleString("vi-VN")}
									/>
									<CustomerMessageItem
										type="CO"
										content={groupedItem.tongCo.toLocaleString("vi-VN")}
									/>
									<CustomerMessageItem
										type="TRUNG"
										content={groupedItem.tongTrung.toLocaleString("vi-VN")}
									/>
								</div>
							);
						})}
					</div>

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
