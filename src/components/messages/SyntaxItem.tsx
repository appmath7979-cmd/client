import { CheckIcon, EditIcon, Trash2Icon, XIcon } from "lucide-react";
import { memo, useState } from "react";
import { Button } from "../ui/button";
import { Tooltip, TooltipPopup, TooltipTrigger } from "../ui/tooltip";

export const SyntaxItem = memo(
	({
		chunk,
		onEdit,
	}: {
		chunk: string[];
		onEdit: (newVal: string[]) => void;
	}) => {
		const [isEdit, setIsEdit] = useState<boolean>(false);
		const [value, setValue] = useState<string>(chunk.join(" "));

		const handleClose = () => {
			setValue(chunk.join(" "));
			setIsEdit(false);
		};

		const handleSubmit = () => {
			onEdit([value]);
			setIsEdit(false);
		};

		const handleInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Escape") handleClose();
			if (e.key === "Enter" || e.key === "Tab") handleSubmit();
		};

		return (
			<div className="relative px-3 py-1 border rounded-md">
				{isEdit ? (
					<>
						<input
							className={"border-b w-full ring-0 outline-0 border-b-primary"}
							value={value}
							onChange={(e) => setValue(e.target.value)}
							onKeyDown={(e) => handleInputKey(e)}
						/>
						<div className="absolute right-3 top-1/2 -translate-y-1/2">
							<Tooltip>
								<TooltipTrigger
									render={
										<Button
											variant={"ghost"}
											size={"icon-xs"}
											className="text-destructive hover:bg-destructive/30 hover:text-destructive"
											onClick={handleClose}
										/>
									}
								>
									<XIcon />
								</TooltipTrigger>
								<TooltipPopup>Hủy bỏ</TooltipPopup>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger
									render={
										<Button
											variant={"ghost"}
											size={"icon-xs"}
											className="text-success-foreground hover:bg-success/30"
											onClick={handleSubmit}
										/>
									}
								>
									<CheckIcon />
								</TooltipTrigger>
								<TooltipPopup>Xác nhận</TooltipPopup>
							</Tooltip>
						</div>
					</>
				) : (
					<div className="flex justify-between justify-items-center">
						<p onDoubleClick={() => setIsEdit((prev) => !prev)}>
							{chunk.join(" ")}
						</p>
						<div className="flex items-center gap-1">
							<Tooltip>
								<TooltipTrigger
									render={
										<Button
											variant={"ghost"}
											size={"icon-xs"}
											onClick={() => setIsEdit(true)}
										/>
									}
								>
									<EditIcon />
								</TooltipTrigger>
								<TooltipPopup>Sửa đoạn tin nhắn</TooltipPopup>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger
									render={<Button variant={"ghost"} size={"icon-xs"} />}
								>
									<Trash2Icon />
								</TooltipTrigger>
								<TooltipPopup>Xóa đoạn tin nhắn</TooltipPopup>
							</Tooltip>
						</div>
					</div>
				)}
			</div>
		);
	},
);
