import { useNavigate } from "@tanstack/react-router";
import { CopyIcon, EditIcon, Trash2Icon } from "lucide-react";
import { DialogConfirm } from "#/components/system/dialogs/DialogConfirm";
import { AlertDialog, AlertDialogTrigger } from "#/components/ui/alert-dialog";
import { Button } from "#/components/ui/button";
import { Tooltip, TooltipPopup, TooltipTrigger } from "#/components/ui/tooltip";
import { useOrderMutation } from "#/hooks/query/use-order-query";

interface DetailActionsProps {
	customerId: string;
	orderId: string;
	orderName: string;
}

export default function DetailActions({
	customerId,
	orderId,
	orderName,
}: DetailActionsProps) {
	const navigate = useNavigate();
	const { mutate } = useOrderMutation().delete;

	const handleCopy = () => {
		// navigate({ to: "/customers/$customerId/message", params: { customerId } });
	};

	const handleEdit = () => {
		navigate({
			to: "/customers/$customerId/$orderId/edit",
			params: { customerId, orderId },
		});
	};

	const handleDelete = () => {
		mutate(orderId);
	};

	return (
		<div className="flex items-center gap-2">
			<Tooltip>
				<TooltipTrigger
					render={
						<Button variant={"outline"} size={"icon-xs"} onClick={handleCopy} />
					}
				>
					<CopyIcon />
				</TooltipTrigger>
				<TooltipPopup>Sao chép tin nhắn</TooltipPopup>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger
					render={
						<Button variant={"outline"} size={"icon-xs"} onClick={handleEdit} />
					}
				>
					<EditIcon />
				</TooltipTrigger>
				<TooltipPopup>Sửa tin nhắn</TooltipPopup>
			</Tooltip>
			<AlertDialog>
				<AlertDialogTrigger
					render={<Button variant={"destructive"} size={"icon-xs"} />}
				>
					<Trash2Icon />
				</AlertDialogTrigger>
				<DialogConfirm
					title="Xóa tin nhắn"
					description={`Bạn có chắc chắn muốn xóa ${orderName}?`}
					onConfirm={handleDelete}
				/>
			</AlertDialog>
		</div>
	);
}
