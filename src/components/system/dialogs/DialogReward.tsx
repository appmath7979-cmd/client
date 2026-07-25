import { Button } from "#/components/ui/button";
import {
	DialogClose,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogPanel,
	DialogPopup,
	DialogTitle,
} from "#/components/ui/dialog";
import { Separator } from "#/components/ui/separator";
import { regionNameList } from "#/constants/regions.constant";
import { formatDate } from "#/lib/date-format";
import type { IRewardProvince } from "#/types/reward.type";
import { useAppStore } from "@lavaz/store";
import { DialogRewardItem } from "./DialogRewardItem";
import { store } from "#/store/store";
import { useRewardMutation } from "#/hooks/query/use-reward-query";

export function DialogReward({
	day,
	provinces,
	date,
}: {
	day: string;
	provinces: Omit<IRewardProvince, "day">;
	date: Date;
}) {
	const release = formatDate(date);
	const [values] = useAppStore(store.reward, (s) => s.values);
	const { mutate } = useRewardMutation().post;

	return (
		<DialogPopup showCloseButton={false}>
			<DialogHeader>
				<DialogTitle>Cập nhật Kết quả Xổ số</DialogTitle>
				<DialogDescription>Cập nhật Kết quả Xổ số ngày {day}</DialogDescription>
			</DialogHeader>

			<Separator />

			<DialogPanel className="space-y-4">
				{regionNameList.map((region) => {
					const key = `${region}-dialog-input`;
					const province = provinces[region] ?? [];
					return (
						<div key={key} className="space-y-4">
							{province.map((item) => (
								<DialogRewardItem
									key={`${item.code}-${key}`}
									province={item}
									release={release}
								/>
							))}
						</div>
					);
				})}
			</DialogPanel>

			<DialogFooter variant="default">
				<DialogClose render={<Button variant="ghost" />}>Hủy</DialogClose>
				<Button type="submit" onClick={() => mutate(values)}>
					Xác nhận
				</Button>
			</DialogFooter>
		</DialogPopup>
	);
}
