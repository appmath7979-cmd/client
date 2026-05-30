import { CalendarIcon } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export interface DatePickerProps {
	date: Date | undefined;
	onSelectDate: (date: Date) => void;
}

export function DatePicker({ date, onSelectDate }: DatePickerProps) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					data-empty={!date}
					className="text-left font-normal data-[empty=true]:text-muted-foreground"
				>
					<CalendarIcon />
					{date ? date.toLocaleDateString("vi-VN") : "Chọn ngày"}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					required
					mode="single"
					selected={date}
					onSelect={onSelectDate}
				/>
			</PopoverContent>
		</Popover>
	);
}
