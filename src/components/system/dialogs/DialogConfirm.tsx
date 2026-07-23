import {
	AlertDialogClose,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogPopup,
	AlertDialogTitle,
} from "#/components/ui/alert-dialog";
import { Button } from "#/components/ui/button";

interface DialogConfirmProps {
	title: string;
	description?: string;
	onConfirm: () => void;
}

export function DialogConfirm({
	title,
	description,
	onConfirm,
}: DialogConfirmProps) {
	return (
		<AlertDialogPopup>
			<AlertDialogHeader>
				<AlertDialogTitle>{title}</AlertDialogTitle>
				<AlertDialogDescription>{description}</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter variant="bare">
				<AlertDialogClose>Hủy bỏ</AlertDialogClose>
				<AlertDialogClose
					render={<Button variant="destructive" onClick={onConfirm} />}
				>
					Xác nhận
				</AlertDialogClose>
			</AlertDialogFooter>
		</AlertDialogPopup>
	);
}
