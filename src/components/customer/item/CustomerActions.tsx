import { CopyIcon, EditIcon, Trash2Icon } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Tooltip, TooltipPopup, TooltipTrigger } from "#/components/ui/tooltip";

export function CustomerActions({ id }: { id: string }) {
	return (
		<>
			<Tooltip>
				<TooltipTrigger
					render={<Button variant={"outline"} size={"icon-xs"} />}
				>
					<CopyIcon />
				</TooltipTrigger>
				<TooltipPopup>Sao chép khách hàng</TooltipPopup>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger
					render={<Button variant={"outline"} size={"icon-xs"} />}
				>
					<EditIcon />
				</TooltipTrigger>
				<TooltipPopup>Chỉnh sửa thông tin khách hàng</TooltipPopup>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger
					render={<Button variant={"destructive-outline"} size={"icon-xs"} />}
				>
					<Trash2Icon className="text-destructive" />
				</TooltipTrigger>
				<TooltipPopup>Xóa khách hàng</TooltipPopup>
			</Tooltip>
		</>
	);
}
