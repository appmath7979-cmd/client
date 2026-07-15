import type { IProvinceItem } from "#/types/province.type";
import type { RegionType } from "#/types/region.type";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { AnalysisList } from "./AnalysisList";

interface AnalysProps {
	provinces: IProvinceItem[];
	region: RegionType;
}

export function Analysis({ provinces, region }: AnalysProps) {
	return (
		<Tabs className={"space-y-1"}>
			<TabsList className={"w-full"}>
				{provinces.map((item) => (
					<TabsTrigger
						key={`${item.code}-${item.region}--trigger`}
						value={item.code}
					>
						{item.name}
					</TabsTrigger>
				))}
			</TabsList>
			{provinces.map((item) => (
				<TabsContent
					key={`${item.code}-${item.region}--content`}
					value={item.code}
				>
					<AnalysisList provinceCode={item.code} region={region} />
				</TabsContent>
			))}
		</Tabs>
	);
}
