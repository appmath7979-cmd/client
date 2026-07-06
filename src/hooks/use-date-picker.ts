import { useEffect, useState } from "react";

export function useDatePicker() {
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

	return { isMounted, date, open, handleSelect, setOpen };
}
