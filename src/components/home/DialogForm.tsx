import { useAppStore } from "@lavaz/store";
import { toast } from "sonner";
import { DialogUpdate } from "#/components/home/DialogUpdate";
import { Button } from "#/components/ui/button";
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "#/components/ui/dialog";
import { useRewardQuery } from "#/hooks/query/useRewardQuery";
import { store } from "#/store/store";
import type { IRegionApi, RegionApiType } from "#/types/reward.type";
import type { IRewardSchedule } from "#/types/schedule.type";
import { Spinner } from "../ui/spinner";

interface DialogFormProps {
	today: Date;
	schedule: IRewardSchedule[];
}

export function DialogForm({ today, schedule }: DialogFormProps) {
	const [updateReward] = useAppStore(store.updateReward, (s) => s);
	const [, { setReward }] = useAppStore(store.getReward, (s) => s);

	const { data, mutate, isPending, isSuccess, isError, error } =
		useRewardQuery().post;

	const handleSubmit = () => {
		const [day, month, year] = today
			.toLocaleDateString("vi-VN", {
				month: "2-digit",
				day: "2-digit",
				year: "numeric",
			})
			.split("/");

		const release = `${year}-${month}-${day}`;

		const rewards: IRegionApi[] = updateReward.map((item) => {
			const regionParsed: RegionApiType =
				item.region === "mien-bac"
					? "NORTH"
					: item.region === "mien-nam"
						? "SOUTH"
						: "CENTRAL";

			return {
				region: regionParsed,
				results: item.value.split("-"),
				station: item.station,
			};
		});

		mutate({ release, rewards });
	};

	if (isSuccess) {
		toast.success(data.message);
		const { release, rewards } = data.reward;

		if (rewards.length === 0) return;

		const newData = rewards.map((item) => {
			const { region, station, results } = item;
			const parseResults = results.map((re) => Number(re));

			return {
				region,
				stations: {
					station,
					values: parseResults,
				},
			};
		});

		const regionsFromData = [...new Set(newData.map((item) => item.region))];

		const getRewards = regionsFromData.map((reg) => {
			const rewards = newData
				.filter((nd) => nd.region === reg)
				.map((item) => ({
					station: item.region,
					values: item.stations.values,
				}));
			return {
				region: reg,
				stations: rewards,
			};
		});

		setReward(release, getRewards);
	}

	if (isError) {
		toast.error(error.message);
	}

	return (
		<DialogContent>
			<DialogHeader className="-space-y-2">
				<DialogTitle>Cập nhật kết quả</DialogTitle>
				<DialogDescription className="italic">
					Cập nhật kết quả ngày {today.toLocaleDateString("vi-VN")}
				</DialogDescription>
			</DialogHeader>
			<DialogUpdate schedule={schedule} />
			<DialogFooter>
				<DialogClose asChild>
					<Button variant={"secondary"}>Đóng</Button>
				</DialogClose>
				<Button
					disabled={updateReward.length === 0 || isPending}
					onClick={handleSubmit}
				>
					{isPending ? (
						<>
							<Spinner />
							<span>Đang xử lý...</span>
						</>
					) : (
						"Xác nhận"
					)}
				</Button>
			</DialogFooter>
		</DialogContent>
	);
}
