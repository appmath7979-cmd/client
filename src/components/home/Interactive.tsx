import { PencilLineIcon } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { useClickOutside } from "#/hooks/useClickOutside";
import { DatePicker, type DatePickerProps } from "../DatePicker";
import { Button } from "../ui/button";
import { DialogTrigger } from "../ui/dialog";

export function Interactive({ date, onSelectDate }: DatePickerProps) {
	const [isShowDate, setIsShowDate] = useState<boolean>(false);
	const ref = useRef<HTMLDivElement | null>(null);

	const handleClickOutside = () => {
		setIsShowDate((prev) => !prev);
	};

	useClickOutside(ref, isShowDate, handleClickOutside);

	return (
		<div className="flex justify-end items-center gap-1">
			<DialogTrigger asChild>
				<Button variant={"outline"}>
					<PencilLineIcon weight="bold" />
					<span>Cập nhật kết quả</span>
				</Button>
			</DialogTrigger>
			<DatePicker date={date} onSelectDate={onSelectDate} />
		</div>
	);
}
