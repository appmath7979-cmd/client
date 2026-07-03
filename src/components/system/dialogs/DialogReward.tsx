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
import { regionNameList } from "#/constansts/regions.constanst";
import type { IRewardProvince } from "#/types/reward.type";
import { DialogRewardItem } from "./DialogRewardItem";

export function DialogReward({
	day,
	provinces,
}: {
	day: string;
	provinces: Omit<IRewardProvince, "day">;
}) {
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
								<DialogRewardItem key={`${item.code}-${key}`} province={item} />
							))}
						</div>
					);
				})}
			</DialogPanel>

			<DialogFooter variant="default">
				<DialogClose render={<Button variant="ghost" />}>Hủy</DialogClose>
				<Button type="submit">Xác nhận</Button>
			</DialogFooter>
		</DialogPopup>
	);
}
