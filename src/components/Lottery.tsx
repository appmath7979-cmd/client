import { rewardConstant, rewardList } from "#/constants/reward.constant";
import { dayConstant } from "#/constants/schedule.constant";
import {
  regionConstanst,
  stationConstanst,
} from "#/constants/station.constanst";
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
}

export function Lottery({ day, item }: LotteryProps) {
  const { region, stations } = item;
  const currentDay = dayConstant[day as keyof typeof dayConstant];
  const titleRegion = regionConstanst[region as keyof typeof regionConstanst];

  const rewards = stations ? rewardList[1] : rewardList[0];
  const length = rewards.length;

  return (
    <div>
      <h2 className="rounded-lg bg-primary py-2 font-bold text-lg text-primary-foreground text-center">
        Kết quả {titleRegion}
      </h2>
      <Table>
        <TableHeader>
          <TableRow className="capitalize">
            <TableHead className="w-35 md:w-40 text-center">{currentDay}</TableHead>
            {stations ? (
              stations.map((st) => {
                const station =
                  stationConstanst[st as keyof typeof stationConstanst];
                return (
                  <TableHead key={`${region}-${st}-col`}>{station}</TableHead>
                );
              })
            ) : (
              <TableHead className="text-center">Kết quả</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length }).map((_, index) => (
            <TableRow key={`${region}-col-${index}`}>
              <TableCell className="text-center">
                {rewardConstant[rewards[index] as keyof typeof rewardConstant]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
