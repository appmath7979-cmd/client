import { regionMapper } from "#/constants/regions.constant";
import { rewardTypeList } from "#/constants/reward.constant";
import { cn } from "#/lib/utils";
import type { IProvinceItem } from "#/types/province.type";
import type { RegionType } from "#/types/region.type";

interface LotteryItemProps {
	provinces: IProvinceItem[];
	region: RegionType;
}

export function LotteryItem({ provinces, region }: LotteryItemProps) {
	const widthEachTitle = {
		1: "[&_p:nth-child(n+2)]:w-[calc(100%-120px)]",
		2: "[&_p:nth-child(n+2)]:w-[calc((100%-120px)/2)]",
		3: "[&_p:nth-child(n+2)]:w-[calc((100%-120px)/3)]",
		4: "[&_p:nth-child(n+2)]:w-[calc((100%-120px)/4)]",
	};

	const currentPrizes = rewardTypeList.filter((item) => {
		if (region === "MB") {
			return item.region === "MB";
		}
		return item.region === "MN_MT";
	});

	return (
		<div className="bg-accent rounded-md border shadow-xs">
			<h3 className="text-lg font-semibold bg-primary text-primary-foreground text-center py-4 border-b rounded-t-md">
				Kết quả {regionMapper[region]}
			</h3>
			<div
				className={cn(
					"flex items-center w-full text-center font-semibold [&_p]:py-2",
					widthEachTitle[provinces.length as keyof typeof widthEachTitle],
				)}
			>
				<p className="w-30 border-b">Giải</p>
				{provinces.map((provicne) => (
					<p
						key={`${regionMapper[region]}-${provicne.code}`}
						className="border-b"
					>
						{provicne.name}
					</p>
				))}
			</div>
			<div className="text-center">
				{currentPrizes.map((item, index) => (
					<p
						key={`${regionMapper[region]}-${item.code}`}
						className={cn("py-2 w-30", index % 2 !== 0 && "bg-muted")}
					>
						{item.name}
					</p>
				))}
			</div>
		</div>
	);
}
