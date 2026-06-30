import { useAppStore } from "@lavaz/store";
import { PlusIcon } from "@phosphor-icons/react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { TransactionBox } from "#/components/customer/id/TransactionBox";
import { DatePicker } from "#/components/DatePicker";
import { RegionDropdown } from "#/components/dropdowns/RegionDropdown";
import { TransactionDetail } from "#/components/transactions/TransactionDetail";
import { Button } from "#/components/ui/button";
import { Skeleton } from "#/components/ui/skeleton";
import { useGetCustomerById } from "#/hooks/query/useCustomerQuery";
import { useGetAllTrans } from "#/hooks/query/useTransQuery";
import { formatDate } from "#/lib/format-date";
import { transactionCalculator } from "#/lib/transaction";
import { store } from "#/store/store";
import type { RegionApiType, RegionType } from "#/types/reward.type";
import type { ITransItemRes } from "#/types/transaction.type";

export const Route = createFileRoute("/(app)/customer/$customerId/")({
	staticData: { title: "Khách hàng" },
	component: RouteComponent,
});

const regionMapper: Record<RegionApiType, RegionType> = {
	NORTH: "mien-bac",
	CENTRAL: "mien-trung",
	SOUTH: "mien-nam",
};

function RouteComponent() {
	const [date, setDate] = useState<Date | undefined>(() => {
		if (typeof window === "undefined") return;
		return new Date();
	});
	const [region] = useAppStore(store.regionDropdown, (s) => s.value);

	const { customerId } = useParams({ from: "/(app)/customer/$customerId/" });
	const { data: cus } = useGetCustomerById(customerId);

	const convertDate = formatDate(date);

	const { data: trans } = useGetAllTrans(customerId);

	// 1. Lọc danh sách giao dịch theo vùng miền hiện tại trước
	const transactions = useMemo(() => {
		return (
			trans?.transactions.filter(
				(item) =>
					regionMapper[item.region] === region && item.release === convertDate,
			) ?? []
		);
	}, [trans, region, convertDate]);

	// 2. TỐI ƯU: Tạo một Map index theo `createdAt` cho loại giao dịch "CO" để tìm kiếm O(1)
	const coTransactionsMap = useMemo(() => {
		const map = new Map<string, ITransItemRes>();
		transactions.forEach((item) => {
			if (item.type === "CO") {
				map.set(item.createTime, item);
			}
		});
		return map;
	}, [transactions]);

	// 3. Tách danh sách XAC để render gọn hơn ở phần Chi tiết
	const xacTransactions = useMemo(() => {
		return transactions.filter((item) => item.type === "XAC");
	}, [transactions]);

	const [xacList, coList] = useMemo(() => {
		return transactionCalculator(transactions);
	}, [transactions]);

	const [totalXac, totalCo] = useMemo(() => {
		const totalXac = xacList.reduce((total, item) => total + item[1], 0);
		const totalCo = coList.reduce((total, item) => total + item[1], 0);
		return [totalXac, totalCo];
	}, [xacList, coList]);

	return (
		<div className="py-4">
			<div className="flex justify-between items-center">
				{cus ? (
					<h2 className="font-medium">{cus?.customer.fullName}</h2>
				) : (
					<Skeleton className="h-4 w-30" />
				)}
				<div className="flex items-center gap-2">
					<RegionDropdown />
					<DatePicker date={date} onSelectDate={setDate} />
					<Button asChild>
						<Link to="/customer/$customerId/add" params={{ customerId }}>
							<PlusIcon />
							<span>Thêm lệnh mới</span>
						</Link>
					</Button>
				</div>
			</div>

			<div className="rounded-lg overflow-hidden border shadow-md mt-4">
				<div className="bg-muted/50 text-center flex items-center [&_p]:w-1/3 [&_p]:py-2 uppercase font-semibold border-b">
					<p>Xác</p>
					<p>Cò</p>
					<p>Trúng</p>
				</div>
				<div className="h-50 overflow-y-auto flex relative">
					{transactions.length === 0 ? (
						<p className="size-full grid place-items-center">Chưa có dữ liệu</p>
					) : (
						<>
							<TransactionBox name="xac" transactions={xacList} />
							<TransactionBox
								name="co"
								transactions={coList}
								className="border-x"
							/>
						</>
					)}
					<div className="absolute bottom-0 left-0 bg-background shadow-2xl border w-full flex items-center justify-between text-center [&_p]:w-1/3 font-semibold [&_p]:p-2">
						<p>{totalXac}</p>
						<p className="border-x">{totalCo}</p>
						<p></p>
					</div>
				</div>
			</div>

			<div className="border shadow-md dark:shadow-gray-800 px-4 py-2 rounded-md mt-4 font-semibold">
				{!xacList || xacList.length === 0 ? (
					<p>Kết quả: Chưa có thông tin</p>
				) : (
					<p>Thu</p>
				)}
			</div>

			<div className="mt-8 space-y-4">
				<div className="flex justify-between items-center">
					<h2 className="font-semibold text-lg">Chi tiết</h2>
					<Button
						variant="ghost"
						className="text-primary hover:text-primary"
						asChild
					>
						<Link
							to="/customer/$customerId/transactions"
							params={{ customerId }}
						>
							Xem tất cả
						</Link>
					</Button>
				</div>

				<ul className="space-y-8">
					{xacTransactions.map((trans, index) => {
						// TỐI ƯU: Lấy trực tiếp từ Map, không tốn vòng lặp .find() nữa
						const findCo = coTransactionsMap.get(trans.createTime)?.content;

						return (
							<li
								key={trans.id}
								className="border rounded-md shadow-md dark:shadow-gray-800"
							>
								<TransactionDetail
									transactionId={trans.id}
									contents={trans.content}
									index={index}
									coContents={findCo}
									customerId={customerId}
								/>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
