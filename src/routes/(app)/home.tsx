import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DialogReward } from "#/components/dialog/DialogReward";
import { Interactive } from "#/components/home/Interactive";
import { scheduleConstant } from "#/constants/schedule.constant";
import { useGetReward } from "#/hooks/query/useRewardQuery";
import { formatDate } from "#/lib/format-date";
import { DefaultPendingComponent } from "#/pages/DefaultPendingComponent";
import { RewardNotfound } from "#/pages/RewardNotfound";

export const Route = createFileRoute("/(app)/home")({
	staticData: { isSidebar: true },
	component: RouteComponent,
	notFoundComponent: RewardNotfound,
	pendingComponent: DefaultPendingComponent,
});

function RouteComponent() {
	const [date, setDate] = useState<Date>(new Date());
	const [page, setPage] = useState<number>(1);
	const day = date.getDay();
	const schedule = scheduleConstant[day];

	const { data, isPlaceholderData, isFetching } = useGetReward(page);
	const formatedDate = formatDate(date) ?? "";
	const rewards = data?.rewards[1];
	// .filter((item) => item.release === formatedDate)
	// .flatMap((item) => item.rewards);

	useEffect(() => {}, []);

	const centralRewards = rewards?.rewards.filter((item) => item.station === "");
	return (
		<div className="py-4 space-y-4">
			<Interactive date={date} onSelectDate={setDate} />
			{/* {rewards?.map((item) => (
        <div>{item.results}</div>
      ))} */}
			<DialogReward day={day} />
		</div>
	);
}
