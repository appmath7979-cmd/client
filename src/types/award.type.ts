import type { AwardRegionType } from "./schedule.type";

interface IValues {
  type: string;
  value: string | string[];
}

interface IAwardData {
  station: string;
  region: AwardRegionType;
  values: IValues[];
}

export type { IValues, IAwardData };
