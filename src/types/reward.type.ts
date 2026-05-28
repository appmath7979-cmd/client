type RegionType = "mien-bac" | "mien-trung" | "mien-nam";
type RegionApiType = "SOUTH" | "NORTH" | "CENTRAL";

interface IRegionApi {
  region: RegionApiType;
  station: string;
  results: string[];
}

interface IRewardApi {
  release: string;
  rewards: IRegionApi[];
}


interface IRewardApiRes {
  message: string;
  reward: {
    id: string;
    release: string;
    createdAt: string;
    updatedAt: string;
    rewards: [
      {
        id: string;
        region: RegionApiType;
        station: string;
        results: string[];
        createdAt: string;
        updatedAt: string;
        rewardId: string;
      },
    ];
  };
}

export type {
  RegionType,
  IRegionApi,
  IRewardApi,
  RegionApiType,
  IRewardApiRes,
};
