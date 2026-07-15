import { useMemo } from "react";
import { schedule } from "#/constants/schedule.constant";
import { useDatePicker } from "../use-date-picker";

export function useRewardSchedule({
	date,
	day,
}: {
	date?: Date;
	day?: number;
}) {
	const { isMounted } = useDatePicker();
	const currentDay = date ? date.getDay() : day ? day : 0;
	const currentReward = useMemo(() => {
		if (!isMounted) return schedule[0];
		const { day, ...currentReward } = schedule[currentDay];
		return currentReward;
	}, [currentDay, isMounted]);

	return currentReward;
}
