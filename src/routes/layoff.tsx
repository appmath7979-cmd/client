import { useAppStore } from "@lavaz/store";
import { createFileRoute } from "@tanstack/react-router";
import { SettingsIcon } from "lucide-react";
import { useState } from "react";
import { Analysis } from "#/components/layoff/Analysis";
import { DatePicker } from "#/components/system/DatePicker";
import { DropdownRegion } from "#/components/system/dropdowns/DropdownRegion";
import { Button } from "#/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { Tooltip, TooltipPopup, TooltipTrigger } from "#/components/ui/tooltip";
import { useRewardSchedule } from "#/hooks/app/use-reward-schedule";
import { useDatePicker } from "#/hooks/use-date-picker";
import { cn } from "#/lib/utils";
import { store } from "#/store/store";

export const Route = createFileRoute("/layoff")({
	staticData: { title: "Cân hàng" },
	component: RouteComponent,
});

function RouteComponent() {
	const [selectTab, setSelectTab] = useState<boolean>(true);
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
				<Tooltip>
					<TooltipTrigger render={<Button variant={"outline"} size={"icon"} className="border-primary text-primary" />}>
						<SettingsIcon />
					</TooltipTrigger>
					<TooltipPopup>Cài đặt</TooltipPopup>
				</Tooltip>
			</div>
			<Tabs defaultValue={"thong-ke"}>
				<TabsList variant="underline" className={"w-full border-b"}>
					<TabsTrigger
						value={"thong-ke"}
						className={cn(
							"uppercase",
							selectTab && "text-primary! hover:text-primary",
						)}
						onClick={() => setSelectTab(true)}
					>
						Thống kê
					</TabsTrigger>
					<TabsTrigger
						value={"du-chuan"}
						className={cn(
							"uppercase",
							selectTab || "text-primary! hover:text-primary",
						)}
						onClick={() => setSelectTab(false)}
					>
						Dư chuẩn
					</TabsTrigger>
				</TabsList>
				<TabsContent value={"thong-ke"}>
					<Analysis provinces={rewardSchedule[region]} region={region} />
				</TabsContent>
				<TabsContent value={"du-chuan"}></TabsContent>
			</Tabs>
		</div>
	);
}
