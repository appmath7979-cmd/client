import type { RegionType } from "./reward.type";

interface IRewardSchedule {
	region: RegionType;
	stations?: string[];
}

type ScheduleListType = Array<IRewardSchedule[]>;

export type { ScheduleListType, IRewardSchedule };
