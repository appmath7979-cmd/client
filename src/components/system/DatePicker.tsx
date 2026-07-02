import { CalendarIcon } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { formatDate } from "#/lib/date-format";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverPopup, PopoverTrigger } from "../ui/popover";
import { Skeleton } from "../ui/skeleton";

interface DatePickerProps {
	date: Date | undefined;
	open: boolean;
	onOpenChange: (isOpen: boolean) => void;
	// Cho phép undefined để khớp với hàm handleSelect ở component cha
	onSelect: (selectedDate: Date | undefined) => void;
}

export function DatePicker({
	date,
	open,
	onOpenChange,
	onSelect,
}: DatePickerProps) {
	const [isMounted, setIsMounted] = useState<boolean>(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	// Xác định ngày hiển thị: Ưu tiên `date` được chọn, nếu không có thì lấy ngày hôm nay
	const displayDate = date ?? new Date();

	// Cache lại chuỗi ngày đã format để tránh chạy lại hàm format vô ích
	const formattedDate = useMemo(() => {
		if (!isMounted) return "";
		return formatDate(displayDate);
	}, [displayDate, isMounted]);

	return (
		<Popover onOpenChange={onOpenChange} open={open}>
			<PopoverTrigger
				render={<Button className="justify-start gap-2" variant="outline" />}
			>
				<CalendarIcon className="h-4 w-4 opacity-50" />
				{isMounted ? (
					<span>{formattedDate}</span>
				) : (
					<Skeleton className="h-4 w-20" />
				)}
			</PopoverTrigger>
			<PopoverPopup>
				<Calendar mode="single" onSelect={onSelect} selected={date} />
			</PopoverPopup>
		</Popover>
	);
}