import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { DialogForm } from "#/components/home/DialogForm";
import { Interactive } from "#/components/home/Interactive";
import { Lottery } from "#/components/Lottery";
import { Dialog } from "#/components/ui/dialog";
import { scheduleConstant } from "#/constants/schedule.constant";
import { useRewardQuery } from "#/hooks/query/useRewardQuery";
import { DefaultPendingComponent } from "#/pages/DefaultPendingComponent";
import { RewardNotfound } from "#/pages/RewardNotfound";

export const Route = createFileRoute("/(app)/home")({
	staticData: { isSidebar: true },
	component: RouteComponent,
	notFoundComponent: RewardNotfound,
});

function RouteComponent() {
	const [date, setDate] = useState<Date>(new Date());
	const day = date.getDay();
	const schedule = scheduleConstant[day];

	const { data, isPending, isError, error } = useRewardQuery(date).get;

	if (isPending) {
		return <DefaultPendingComponent />;
	}

	if (isError) {
		toast.error(error.message);
	}

	return (
		<Dialog>
			<div className="py-6 space-y-4">
				<Interactive date={date} onSelectDate={setDate} />
				<div className="space-y-8">
					{schedule.map((item) => {
						const values = data
							? data.reward.rewards.filter((dt) => {
									const parsed =
										dt.region === "NORTH"
											? "mien-bac"
											: dt.region === "CENTRAL"
												? "mien-trung"
												: "mien-nam";
									return parsed === item.region;
								})
							: undefined;
						return (
							<Lottery
								key={`${item.region}-table`}
								day={day}
								item={item}
								data={values}
							/>
						);
					})}
				</div>
				<DialogForm schedule={schedule} today={date} />
			</div>
		</Dialog>
	);
}
