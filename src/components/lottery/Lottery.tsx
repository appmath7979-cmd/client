import { regionNameList } from "#/constants/regions.constant";
import type { IRewardProvince } from "#/types/reward.type";
import { LotteryItem } from "./LotteryItem";

export function Lottery({ reward }: { reward: Omit<IRewardProvince, "day"> }) {
	return (
		<div className="space-y-6">
			{regionNameList.map((region) => {
				const key = `${region}-table`;
				const provinces = reward[region] ?? [];
				return <LotteryItem key={key} region={region} provinces={provinces} />;
			})}
		</div>
	);
}
