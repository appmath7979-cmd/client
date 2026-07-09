import type { IProvinceItem } from "#/types/province.type";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { AnalysisList } from "./AnalysisList";

interface AnalysProps {
	provinces: IProvinceItem[];
}

export function Analysis({ provinces }: AnalysProps) {
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
					<AnalysisList />
				</TabsContent>
			))}
		</Tabs>
	);
}
