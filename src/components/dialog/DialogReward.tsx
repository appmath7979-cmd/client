import { regions } from "#/constants/regions.contanst";
import { scheduleConstant } from "#/constants/schedule.constant";
import { stationConstanst } from "#/constants/station.constanst";
import type { RegionType } from "#/types/reward.type";
import { Button } from "../ui/button";
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import DialogRewardItem from "./DialogRewardItem";

const regionMapper: Record<RegionType, string> = {
	"mien-bac": "Miền Bắc",
	"mien-trung": "Miền Trung",
	"mien-nam": "Miền Nam",
};

interface DialogRewardProps {
	day: number;
}

export function DialogReward({ day }: DialogRewardProps) {
	const schedule = scheduleConstant[day];

	const groupedSchedule = {
		"mien-bac": schedule.filter((item) => item.region === "mien-bac"),
		"mien-trung": schedule.filter((item) => item.region === "mien-trung"),
		"mien-nam": schedule.filter((item) => item.region === "mien-nam"),
	};

	return (
		<DialogContent showCloseButton={false}>
			<DialogHeader className="-space-y-0.5">
				<DialogTitle>Cập nhật kết quả</DialogTitle>
				<DialogDescription>Cập nhật kết quả ngày</DialogDescription>
			</DialogHeader>
			<div className="-mx-4 no-scrollbar min-h-[50vh] max-h-[50vh] overflow-y-auto px-4">
				<Tabs defaultValue="mien-bac">
					{/* Loop qua danh sách miền để tạo Tab Trigger */}
					<TabsList>
						{regions.map((item) => (
							<TabsTrigger key={`${item}-tab`} value={item}>
								{regionMapper[item as RegionType] || item}
							</TabsTrigger>
						))}
					</TabsList>

					{/* 4. Tự động hóa nội dung Tab Content bằng vòng lặp */}
					{regions.map((regionKey) => {
						const currentRegionKey = regionKey;
						const currentSchedule = groupedSchedule[currentRegionKey];

						return (
							<TabsContent key={`${regionKey}-content`} value={regionKey}>
								<div className="space-y-2 mt-4">
									{currentSchedule.length > 0 ? (
										currentSchedule.map((item, index) => {
											const key = `${item.stations?.join("-")}-${index}`;
											return (
												<div key={key} className="space-y-4">
													{currentRegionKey === "mien-bac" ? (
														<DialogRewardItem
															region={currentRegionKey}
															station="Miền Bắc"
														/>
													) : (
														item.stations?.map((st) => (
															<DialogRewardItem
																key={`${st}-tabcontent`}
																region={currentRegionKey}
																station={st}
															/>
														))
													)}
												</div>
											);
										})
									) : (
										<p className="text-sm text-muted-foreground">
											Không có lịch mở thưởng cho miền này.
										</p>
									)}
								</div>
							</TabsContent>
						);
					})}
				</Tabs>
			</div>
			<DialogFooter>
				<DialogClose asChild>
					<Button variant={"outline"}>Hủy bỏ</Button>
				</DialogClose>
				<Button>Xác nhận</Button>
			</DialogFooter>
		</DialogContent>
	);
}
