import { useMemo } from "react";
import { schedule } from "#/constants/schedule.constant";
import { useDatePicker } from "../use-date-picker";

export function useRewardSchedule(date: Date) {
	const { isMounted } = useDatePicker();
	const currentReward = useMemo(() => {
		if (!isMounted) return schedule[0];
		const { day, ...currentReward } = schedule[date.getDay()];
		return currentReward;
	}, [date, isMounted]);

	return currentReward;
}
