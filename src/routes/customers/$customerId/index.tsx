import { createFileRoute, Link } from "@tanstack/react-router";
import { DatePicker } from "#/components/system/DatePicker";
import { DropdownRegion } from "#/components/system/dropdowns/DropdownRegion";
import { useDatePicker } from "#/hooks/use-date-picker";
import { Button } from "#/components/ui/button";
import { PlusIcon } from "lucide-react";

export const Route = createFileRoute("/customers/$customerId/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { date, handleSelect, open, setOpen } = useDatePicker();

	return (
		<div className="py-4">
			<div className="flex justify-end items-center gap-2">
				<DropdownRegion />
				<DatePicker
					date={date}
					onOpenChange={setOpen}
					onSelect={handleSelect}
					open={open}
				/>
				<Button
					render={
						<Link
							to="/customers/$customerId/message"
							params={{ customerId: "1" }}
						/>
					}
				>
					<PlusIcon />
					<span>Thêm lệnh mới</span>
				</Button>
			</div>
		</div>
	);
}
