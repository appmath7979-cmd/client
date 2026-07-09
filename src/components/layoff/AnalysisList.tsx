import { syntaxTypeList } from "#/constants/syntax-type.constant";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export function AnalysisList() {
	return (
		<Tabs>
			<TabsList className={"w-full"}>
				{syntaxTypeList.map((syntax) => (
					<TabsTrigger key={`${syntax}-trigger`} value={syntax}>
						{syntax}
					</TabsTrigger>
				))}
			</TabsList>
			{syntaxTypeList.map((syntax) => (
				<TabsContent key={`${syntax}-content`} value={syntax}>
					<div className="p-2 text-sm text-muted-foreground">
						Nội dung cho cú pháp: {syntax}
					</div>
				</TabsContent>
			))}
		</Tabs>
	);
}
