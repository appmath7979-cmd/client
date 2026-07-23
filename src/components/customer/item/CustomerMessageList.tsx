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

	// 2. Duyệt qua mảng phẳng details của từng order để cộng dồn
	list.forEach((order) => {
		if (order.details && Array.isArray(order.details)) {
			order.details.forEach((item) => {
				// Kiểm tra xem có syntax ghép đằng trước type hay không (VD: 2c_bao, 2c_dau, 3c_duoi,...)
				const hasSyntaxPrefix =
					item.syntax && item.type && !item.type.includes(item.syntax);

				const typeKey = hasSyntaxPrefix
					? `${item.syntax}_${item.type}`
					: item.type || item.syntax || "KHAC";

				// Khởi tạo cấu trúc nhóm nếu loại cược này xuất hiện lần đầu
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

				// Cộng dồn vào nhóm tương ứng
				groupedSyntaxes[typeKey].tongXac += xac;
				groupedSyntaxes[typeKey].tongCo += co;
				groupedSyntaxes[typeKey].tongTrung += trung;

				// Cộng dồn vào tổng lớn của toàn bộ bảng
				grandTotalCo += co;
				grandTotalTrung += trung;
			});
		}
	});

	// Chuyển đối tượng map thành mảng để render
	const finalGroupedList = Object.values(groupedSyntaxes);

	return (
		<div>
			{finalGroupedList.length > 0 ? (
				<>
					{/* Bảng hiển thị gộp tổng theo loại cược */}
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
										content={groupedItem.typeKey.toUpperCase()}
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

					{/* Dòng tổng kết Thu / Chi toàn cục của miền đó */}
					<p
						className={cn(
							"bg-muted/60 px-3 py-2 text-center text-sm font-semibold flex justify-between items-center",
							grandTotalCo - grandTotalTrung >= 0
								? "text-emerald-600"
								: "text-red-600",
						)}
					>
						<span>
							{grandTotalCo - grandTotalTrung >= 0 ? "Tổng Thu" : "Tổng Chi"}
						</span>
						<span>
							{Math.abs(grandTotalCo - grandTotalTrung).toLocaleString("vi-VN")}
						</span>
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