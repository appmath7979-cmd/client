type RegionType = "mien-bac" | "mien-trung" | "mien-nam";

interface IRegion {
  name: RegionType;
  stations: string[];
}

interface ISchedule {
  regions: IRegion[];
}

export type { IRegion, ISchedule };
