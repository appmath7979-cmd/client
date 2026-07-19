import { useAppStore } from "@lavaz/store";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SettingsIcon } from "lucide-react";
import { Analysis } from "#/components/layoff/Analysis";
import { DatePicker } from "#/components/system/DatePicker";
import { DropdownRegion } from "#/components/system/dropdowns/DropdownRegion";
import { Button } from "#/components/ui/button";
import { Tooltip, TooltipPopup, TooltipTrigger } from "#/components/ui/tooltip";
import { useRewardSchedule } from "#/hooks/app/use-reward-schedule";
import { useDatePicker } from "#/hooks/use-date-picker";
import { store } from "#/store/store";

export const Route = createFileRoute("/layoff/")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const { date, handleSelect, open, setOpen } = useDatePicker();
	const [region] = useAppStore(store.region, (s) => s.region);

	const rewardSchedule = useRewardSchedule({ date });

	return (
		<div className="py-4 space-y-5">
			<div className="flex justify-end items-center gap-2">
				<DropdownRegion />
				<DatePicker
					date={date}
					open={open}
					onOpenChange={setOpen}
					onSelect={handleSelect}
				/>
				<Button render={<Link to="/layoff/over-standard" />}>Dư chuẩn</Button>
				<Tooltip>
					<TooltipTrigger
						render={
							<Button
								variant={"outline"}
								size={"icon"}
								className="border-primary text-primary"
								onClick={() => navigate({ to: "/layoff/settings" })}
							/>
						}
					>
						<SettingsIcon />
					</TooltipTrigger>
					<TooltipPopup>Thiết lập Tiêu chuẩn</TooltipPopup>
				</Tooltip>
			</div>

			<Analysis
				provinces={rewardSchedule[region]}
				region={region}
				date={date}
			/>
		</div>
	);
}
