import { rewardConstant, rewardList } from "#/constants/reward.constant";
import { dayConstant } from "#/constants/schedule.constant";
import {
	regionConstanst,
	stationConstanst,
} from "#/constants/station.constanst";
import { formatReward } from "#/lib/format-reward";
import { cn } from "#/lib/utils";
import type { IRegionApi } from "#/types/reward.type";
import type { IRewardSchedule } from "#/types/schedule.type";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";

interface LotteryProps {
	day: number;
	item: IRewardSchedule;
	data: IRegionApi[] | undefined;
}

export function Lottery({ day, item, data }: LotteryProps) {
	const { region, stations } = item;
	const currentDay = dayConstant[day as keyof typeof dayConstant];
	const titleRegion = regionConstanst[region as keyof typeof regionConstanst];

	const rewards = stations ? rewardList[1] : rewardList[0];
	const length = rewards.length;

	const parseReward = formatReward(data);

	return (
		<div>
			<h2 className="rounded-lg bg-primary py-2 font-bold text-lg text-primary-foreground text-center">
				Kết quả {titleRegion}
			</h2>
			<Table>
				<TableHeader>
					<TableRow className="capitalize">
						<TableHead className="w-35 md:w-40 text-center">
							{currentDay}
						</TableHead>
						{stations ? (
							stations.map((st) => {
								const station =
									stationConstanst[st as keyof typeof stationConstanst];
								return (
									<TableHead
										key={`${region}-${st}-col`}
										className="text-center"
									>
										{station}
									</TableHead>
								);
							})
						) : (
							<TableHead className="text-center">Kết quả</TableHead>
						)}
					</TableRow>
				</TableHeader>
				<TableBody>
					{Array.from({ length }).map((_, index) => (
						<TableRow key={`${region}-row}`}>
							<TableCell className="text-center">
								{rewardConstant[rewards[index] as keyof typeof rewardConstant]}
							</TableCell>
							{parseReward ? (
								parseReward.map((dt) => (
									<TableCell
										key={`${dt.region}-${dt.station}-row-${dt.values.join("-")}`}
										className={cn(
											"text-center justify-center items-center gap-x-4 gap-y-2 flex-wrap",
											region === "mien-bac" ? "flex " : "space-y-2",
										)}
									>
										{Array.isArray(dt.values[index])
											? dt.values[index].map((val) => (
													<p key={`${val}-value`}>{val}</p>
												))
											: dt.values[index]}
									</TableCell>
								))
							) : (
								<>Chưa có kết quả</>
							)}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
