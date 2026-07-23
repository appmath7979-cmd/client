import { cn } from "#/lib/utils";
import type {
	IOrderDetailFromDb,
	OrderItemApiType,
} from "#/types/apis/message.type";
import type { RegionType } from "#/types/region.type";
import { CustomerMessageItem } from "../CustomerMessageItem";
import DetailActions from "./DetailActions";

interface DetailListProps {
	data: OrderItemApiType[] | undefined;
	region: RegionType;
	customerId: string;
}

export function DetailList({ data, region, customerId }: DetailListProps) {
	// 1. Lọc danh sách order theo miền mong muốn
	const listOrder = data ? data.filter((item) => item.region === region) : [];

	return (
		<div className="space-y-6">
			{listOrder.length > 0 ? (
				listOrder.map((order, index) => {
					const orderName = `Tin nhắn ${index + 1}`;

					// Tổng kết cuối cùng của toàn bộ tin nhắn/order
					let grandTotalCo = 0;
					let grandTotalTrung = 0;

					// 2. Gom nhóm các item trong order.details theo thuộc tính 'type' và 'syntax'
					const groupedByType: Record<string, IOrderDetailFromDb[]> = {};

					if (order.details && Array.isArray(order.details)) {
						order.details.forEach((detail) => {
							// Nếu có syntax thì ghép syntax lên trước type (Ví dụ: "2c_bao", "2c_dau", "3c_duoi",...)
							// Nếu không có syntax hoặc type trùng syntax thì giữ nguyên
							const hasSyntaxPrefix =
								detail.syntax &&
								detail.type &&
								!detail.type.includes(detail.syntax);

							const typeKey = hasSyntaxPrefix
								? `${detail.syntax}_${detail.type}`
								: detail.type || detail.syntax || "KHAC";

							if (!groupedByType[typeKey]) {
								groupedByType[typeKey] = [];
							}
							groupedByType[typeKey].push(detail);
						});
					}

					return (
						<div
							key={order.id}
							className="border rounded-lg p-4 bg-card shadow-xs space-y-3"
						>
							{/* Header của Tin nhắn */}
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

							{/* Bảng hiển thị danh sách dòng cược sau khi gom nhóm */}
							<div className="divide-y border rounded-md overflow-hidden">
								{Object.keys(groupedByType).map((typeKey, resIndex) => {
									const detailsList = groupedByType[typeKey];

									let tongXac = 0;
									let tongCo = 0;
									let tongTrung = 0;

									// Tính tổng tiền cho nhóm loại cược hiện tại
									detailsList.forEach((item) => {
										const xac = Number(item.xac ?? 0);
										const co = Number(item.co ?? 0);
										const trung = Number(item.trung ?? 0);

										tongXac += xac;
										tongCo += co;
										tongTrung += trung;

										// Cộng dồn vào tổng lớn của cả Tin nhắn
										grandTotalCo += co;
										grandTotalTrung += trung;
									});

									return (
										<div
											key={`${order.id}-${typeKey}`}
											className={cn(
												"flex items-center text-center text-sm hover:bg-muted/30 transition-colors [&>div]:py-2 [&>*:not(:first-child)]:border-l",
												resIndex % 2 !== 0 && "bg-muted/50",
											)}
										>
											{/* Cột hiển thị Loại cược (Vd: 2C_BAO, 2C_DAU, 2C_DUOI, DA,...) */}
											<CustomerMessageItem
												type="TYPE"
												content={typeKey.toUpperCase()}
											/>
											{/* Cột tổng xác */}
											<CustomerMessageItem
												type="XAC"
												content={tongXac.toLocaleString("vi-VN")}
											/>
											{/* Cột tổng cò */}
											<CustomerMessageItem
												type="CO"
												content={tongCo.toLocaleString("vi-VN")}
											/>
											{/* Cột tổng trúng */}
											<CustomerMessageItem
												type="TRUNG"
												content={tongTrung.toLocaleString("vi-VN")}
											/>
										</div>
									);
								})}
							</div>

							{/* Hộp tổng kết Thu / Chi cuối mỗi tin nhắn */}
							<p
								className={cn(
									"bg-muted/40 p-2.5 rounded-md border font-semibold flex justify-between items-center text-sm",
									grandTotalCo - grandTotalTrung >= 0
										? "text-emerald-600"
										: "text-red-600",
								)}
							>
								{grandTotalCo - grandTotalTrung >= 0 ? "Thu" : "Chi"}{" "}
								{Math.abs(grandTotalCo - grandTotalTrung).toLocaleString(
									"vi-VN",
								)}
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