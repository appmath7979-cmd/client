import { Button } from "../ui/button";
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";

interface CloseDialogProps {
	title: string;
	desc?: string;
	content: string;
	showCloseButton?: boolean;
	action: () => void;
	target?: string;
}

export function DialogDelete({
	title,
	desc,
	content,
	showCloseButton = false,
	action,
	target,
}: CloseDialogProps) {
	return (
		<DialogContent showCloseButton={showCloseButton}>
			<DialogHeader>
				<DialogTitle>{title}</DialogTitle>
				<DialogDescription>{desc}</DialogDescription>
			</DialogHeader>
			<div className="space-y-0.5">
				<h2 className="text-center text-xl font-semibold tracking-wide">
					Bạn có muốn xóa {content}?
				</h2>
				<p className="text-destructive font-semibold text-center">{target}</p>
			</div>
			<DialogFooter>
				<DialogClose asChild>
					<Button variant={"outline"}>Hủy bỏ</Button>
				</DialogClose>
				<DialogClose asChild>
					<Button onClick={action}>Xác nhận</Button>
				</DialogClose>
			</DialogFooter>
		</DialogContent>
	);
}
