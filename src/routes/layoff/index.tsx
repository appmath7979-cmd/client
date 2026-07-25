import { useAppStore } from "@lavaz/store";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SettingsIcon } from "lucide-react";
import { useMemo } from "react";
import { Analysis } from "#/components/layoff/Analysis";
import { DatePicker } from "#/components/system/DatePicker";
import { DropdownRegion } from "#/components/system/dropdowns/DropdownRegion";
import { Button } from "#/components/ui/button";
import { Tooltip, TooltipPopup, TooltipTrigger } from "#/components/ui/tooltip";
import { useRewardSchedule } from "#/hooks/app/use-reward-schedule";
import { useOrderQuery } from "#/hooks/query/use-order-query";
import { useDatePicker } from "#/hooks/use-date-picker";
import { formatDate } from "#/lib/date-format";
import { store } from "#/store/store";

export const Route = createFileRoute("/layoff/")({
	staticData: { title: "Cân hàng" },
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const { date, handleSelect, open, setOpen } = useDatePicker();
	const [region] = useAppStore(store.region, (s) => s.region);
	const rewardSchedule = useRewardSchedule({ date });

	// 1. Fetch dữ liệu tất cả đơn hàng trong ngày
	const { data: orderData } = useOrderQuery.getAll({
		release: formatDate(date),
		region,
	});

	// 2. Lọc loại bỏ những đơn có (isLayoff === false VÀ isSend === true)
	const filteredOrders = useMemo(() => {
		if (!orderData?.orders) return [];
		return orderData.orders.filter(
			(item) => !(item.isLayoff === false && item.isSend === true),
		);
	}, [orderData]);

	return (
		<div className="py-4 space-y-5">
			<div className="flex flex-wrap justify-end items-center gap-2">
				<DropdownRegion />
				<DatePicker
					date={date}
					open={open}
					onOpenChange={setOpen}
					onSelect={handleSelect}
				/>
				<Button render={<Link to="/layoff/over-standard" />}>
					Xử lý Dư chuẩn
				</Button>
				<Tooltip>
					<TooltipTrigger
						render={
							<Button
								variant={"outline"}
								size={"icon"}
								className="border-primary text-primary shrink-0"
								onClick={() => navigate({ to: "/layoff/settings" })}
							/>
						}
					>
						<SettingsIcon className="size-4" />
					</TooltipTrigger>
					<TooltipPopup>Thiết lập Tiêu chuẩn</TooltipPopup>
				</Tooltip>
			</div>

			<Analysis
				provinces={rewardSchedule[region]}
				region={region}
				date={date}
				orders={filteredOrders}
			/>
		</div>
	);
}
