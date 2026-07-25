import { createFileRoute } from "@tanstack/react-router";
import { DatePicker } from "#/components/system/DatePicker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { useDatePicker } from "#/hooks/use-date-picker";

export const Route = createFileRoute("/report")({
	staticData: { title: "Báo cáo" },
	component: RouteComponent,
});

function RouteComponent() {
	const { date, handleSelect, open, setOpen } = useDatePicker();
	return (
		<div className="py-4">
			<div>
				<div>
					<DatePicker
						date={date}
						onSelect={handleSelect}
						open={open}
						onOpenChange={setOpen}
					/>
				</div>
			</div>
			<div>
				<Tabs>
					<TabsList>
						<TabsTrigger value={"quick-view"}>Tổng quan</TabsTrigger>
						<TabsTrigger value={"region"}>Miền</TabsTrigger>
					</TabsList>
					<TabsContent value={"quick-view"}>
						
					</TabsContent>
					<TabsContent value={"region"}></TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
