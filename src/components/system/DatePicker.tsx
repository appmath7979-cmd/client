import { CalendarIcon } from "lucide-react";
import { formatDate } from "#/lib/date-format";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverPopup, PopoverTrigger } from "../ui/popover";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

interface DatePickerProps {
	date: Date | undefined;
	open: boolean;
	onOpenChange: (isOpen: boolean) => void;
	onSelect: (selectedDate: Date | undefined) => void;
}

export function DatePicker({
	date,
	open,
	onOpenChange,
	onSelect,
}: DatePickerProps) {
	const [isMount, setIsMount] = useState<boolean>(false);

	useEffect(() => {
		setIsMount(true);
	}, []);

	const currentDate = isMount ? new Date() : undefined;

	return (
		<Popover onOpenChange={onOpenChange} open={open}>
			<PopoverTrigger
				render={<Button className="justify-start" variant="outline" />}
			>
				<CalendarIcon />
				{currentDate ? (
					formatDate(currentDate)
				) : (
					<Skeleton className="w-15 h-4 rounded-full" />
				)}
			</PopoverTrigger>
			<PopoverPopup>
				<Calendar mode="single" onSelect={onSelect} selected={date} />
			</PopoverPopup>
		</Popover>
	);
}
