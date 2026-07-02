import { createFileRoute } from "@tanstack/react-router";
import { Edit2Icon } from "lucide-react";
import { useCallback, useState } from "react";
import { DatePicker } from "#/components/system/DatePicker";
import { Button } from "#/components/ui/button";

export const Route = createFileRoute("/home")({
	component: RouteComponent,
});

function RouteComponent() {
	const [date, setDate] = useState<Date | undefined>(undefined);
	const [open, setOpen] = useState(false);

	const handleSelect = useCallback((selectedDate: Date | undefined) => {
		setDate(selectedDate);
		setOpen(false);
	}, []);

	return (
		<div className="py-4">
			<div className="flex justify-end items-center gap-1">
				<Button variant={"outline"}>
					<Edit2Icon />
					<span>Cập nhật kết quả</span>
				</Button>
				<DatePicker
					date={date}
					open={open}
					onOpenChange={setOpen}
					onSelect={handleSelect}
				/>
			</div>
		</div>
	);
}
