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
	// 1. Lọc danh sách orders theo đúng miền (Vd: MN, MB, MT)
	const list = data?.filter((item) => item.region === region) || [];

	// Khởi tạo Object gom nhóm và các biến tính tổng lớn
	const groupedSyntaxes: Record<string, IGroupedSyntax> = {};
	let grandTotalCo = 0;
	let grandTotalTrung = 0;

	// Biến lưu trữ tổng của từng cột cho toàn bộ bảng theo miền
	let totalXacRegion = 0;
	let totalCoRegion = 0;
	let totalTrungRegion = 0;

	// 2. Duyệt qua mảng phẳng details của từng order để cộng dồn
	list.forEach((order) => {
		if (order.details && Array.isArray(order.details)) {
			order.details.forEach((item) => {
				const hasSyntaxPrefix =
					item.syntax && item.type && !item.type.includes(item.syntax);

				const typeKey = hasSyntaxPrefix
					? `${item.syntax}_${item.type}`
					: item.type || item.syntax || "KHAC";

				if (!groupedSyntaxes[typeKey]) {
					groupedSyntaxes[typeKey] = {
						typeKey,
						tongXac: 0,
						tongCo: 0,
						tongTrung: 0,
					};
				}

				const xac = Number(item.xac ?? 0);
				const co = Number(item.co ?? 0);
				const trung = Number(item.trung ?? 0);

				groupedSyntaxes[typeKey].tongXac += xac;
				groupedSyntaxes[typeKey].tongCo += co;
				groupedSyntaxes[typeKey].tongTrung += trung;

				grandTotalCo += co;
				grandTotalTrung += trung;
			});
		}
	});

	const finalGroupedList = Object.values(groupedSyntaxes);

	// Tính tổng từng cột sau khi đã gom nhóm xong
	finalGroupedList.forEach((item) => {
		totalXacRegion += item.tongXac;
		totalCoRegion += item.tongCo;
		totalTrungRegion += item.tongTrung;
	});

	return (
		<div>
			{finalGroupedList.length > 0 ? (
				<>
					{/* Bảng hiển thị gộp tổng theo loại cược (Cấu trúc 3 cột: Xác, Cò, Trúng) */}
					<div className="border-b">
						{finalGroupedList.map((groupedItem, index) => {
							const prefixLabel = groupedItem.typeKey.toLowerCase();

							return (
								<div
									key={groupedItem.typeKey}
									className={cn(
										"grid grid-cols-3 text-sm hover:bg-muted/30 transition-colors [&>div]:py-2 [&>*:not(:first-child)]:border-l",
										index % 2 !== 0 && "bg-muted/10",
									)}
								>
									<CustomerMessageItem
										type="XAC"
										prefix={prefixLabel}
										content={groupedItem.tongXac.toLocaleString("vi-VN")}
									/>
									<CustomerMessageItem
										type="CO"
										prefix={prefixLabel}
										content={groupedItem.tongCo.toLocaleString("vi-VN")}
									/>
									<CustomerMessageItem
										type="TRUNG"
										prefix={prefixLabel}
										content={groupedItem.tongTrung.toLocaleString("vi-VN")}
									/>
								</div>
							);
						})}

						{/* Dòng tổng hợp từng cột (Xác, Cò, Trúng) của toàn bộ miền */}
						<div className="grid grid-cols-3 items-center text-center font-bold bg-muted/70 [&>*:not(:first-child)]:border-l border-t-2">
							<div className="py-2 px-2 text-amber-600 flex justify-center items-center">
								{totalXacRegion.toLocaleString("vi-VN")}
							</div>
							<div className="py-2 px-2 text-emerald-600 flex justify-center items-center">
								{totalCoRegion.toLocaleString("vi-VN")}
							</div>
							<div className="py-2 px-2 text-red-600 flex justify-center items-center">
								{totalTrungRegion.toLocaleString("vi-VN")}
							</div>
						</div>
					</div>

					{/* Dòng tổng kết Thu / Chi toàn cục của miền đó */}
					<p
						className={cn(
							"bg-muted/60 px-3 py-2 text-center font-semibold flex justify-between items-center mt-2 rounded-md border",
							grandTotalCo - grandTotalTrung >= 0
								? "text-emerald-600"
								: "text-red-600",
						)}
					>
						{grandTotalCo - grandTotalTrung >= 0 ? "Tổng Thu" : "Tổng Chi"}{" "}
						{Math.abs(grandTotalCo - grandTotalTrung).toLocaleString("vi-VN")}
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
