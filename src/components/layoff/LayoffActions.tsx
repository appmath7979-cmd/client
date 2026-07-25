import { useAppStore } from "@lavaz/store";
import { CopyIcon, TrashIcon } from "lucide-react";
import { useOrderMutation } from "#/hooks/query/use-order-query";
import { store } from "#/store/store";
import type { OrderItemApiType } from "#/types/apis/message.type";
import { DialogConfirm } from "../system/dialogs/DialogConfirm";
import { DialogSelectCopyLayoff } from "../system/dialogs/DialogSelectCopyLayoff";
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { DialogTrigger } from "../ui/dialog";

interface LayoffActionsProps {
	index: number;
	item: OrderItemApiType;
}

export function LayoffActions({ index, item }: LayoffActionsProps) {
	const { mutate } = useOrderMutation().delete;
	const [, { copy }] = useAppStore(store.copyLayoff, (s) => s);

	return (
		<div className="flex items-center gap-2">
			<DialogTrigger
				render={
					<Button
						variant={"outline"}
						size={"icon-xs"}
						onClick={() => copy(item)}
					/>
				}
			>
				<CopyIcon />
			</DialogTrigger>
			<AlertDialog>
				<AlertDialogTrigger
					render={<Button variant="destructive" size={"icon-xs"} />}
				>
					<TrashIcon />
				</AlertDialogTrigger>
				<DialogConfirm
					title="Xóa tin đã cân bằng"
					description={`Bạn có chắc muốn xóa tin ${index}`}
					onConfirm={() => mutate(item.id)}
				/>
			</AlertDialog>
			<DialogSelectCopyLayoff />
		</div>
	);
}
