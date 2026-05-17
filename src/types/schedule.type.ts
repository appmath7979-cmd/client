type AwardRegionType = "mien-bac" | "mien-trung" | "mien-nam";

interface IRegion {
  name: AwardRegionType;
  stations: string;
}

interface ISchedule {
  regions: IRegion[];
}

export type { IRegion, ISchedule, AwardRegionType };
