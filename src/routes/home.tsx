import { createFileRoute } from "@tanstack/react-router";
import { Edit2Icon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Lottery } from "#/components/lottery/Lottery";
import { DatePicker } from "#/components/system/DatePicker";
import { DialogReward } from "#/components/system/dialogs/DialogReward";
import { Button } from "#/components/ui/button";
import { DialogTrigger } from "#/components/ui/dialog";
import { schedule } from "#/constants/schedule.constant";
import { formatDate } from "#/lib/date-format";

export const Route = createFileRoute("/home")({
	component: RouteComponent,
});

function RouteComponent() {
	const [date, setDate] = useState<Date>(() => new Date());
	const [open, setOpen] = useState(false);
	const [isMounted, setIsMounted] = useState<boolean>(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const handleSelect = (selectedDate: Date | undefined) => {
		if (!selectedDate) return;
		setDate(selectedDate);
		setOpen(false);
	};

	const currentReward = useMemo(() => {
		if (!isMounted) return schedule[0];
		const { day, ...currentReward } = schedule[date.getDay()];
		return currentReward;
	}, [date, isMounted]);

	const formattedDate = useMemo(() => formatDate(date), [date]);

	return (
		<div className="py-4">
			<div className="flex justify-end items-center gap-1">
				<DialogTrigger render={<Button variant="outline" />}>
					<Edit2Icon />
					<span>Cập nhật kết quả</span>
				</DialogTrigger>
				<DatePicker
					date={date}
					open={open}
					onOpenChange={setOpen}
					onSelect={handleSelect}
				/>
			</div>
			<div className="space-y-6">
				<h2 className="text-center text-xl font-semibold text-primary">
					Kết quả Xổ số ngày {formattedDate}
				</h2>
				<Lottery reward={currentReward} />
			</div>
			<DialogReward day={formattedDate} provinces={currentReward} />
		</div>
	);
}
