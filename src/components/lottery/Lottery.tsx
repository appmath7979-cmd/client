import { regionNameList } from "#/constansts/regions.constanst";
import type { IReward } from "#/types/reward.type";
import { LotteryItem } from "./LotteryItem";

export function Lottery({ reward }: { reward: IReward }) {
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
