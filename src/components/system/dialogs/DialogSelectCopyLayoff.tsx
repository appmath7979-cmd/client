import { Button } from "#/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogPopup,
	DialogTitle,
	DialogTrigger,
} from "#/components/ui/dialog";
import { useCopyToClipboard } from "#/hooks/use-copy-to-clipboard";
import { DialogSelectCustomer } from "./DialogSelectCustomer";
import { CheckIcon } from "lucide-react";
import { useAppStore } from "@lavaz/store";
import { store } from "#/store/store";

export function DialogSelectCopyLayoff() {
	const [value] = useAppStore(store.copyLayoff, (s) => s.message);
	const { copyToClipboard, isCopied } = useCopyToClipboard();

	return (
		<DialogPopup showCloseButton={false}>
			<DialogHeader>
				<DialogTitle>Chọn phương thức gửi tin</DialogTitle>
				<DialogDescription>
					Copy tin nhắn thành công! Hãy chọn phương thức để gửi tin
				</DialogDescription>
			</DialogHeader>
			<div className="px-6 flex flex-col gap-2">
				<Dialog>
					<DialogTrigger
						render={<Button variant={"outline"} className="w-full" />}
					>
						Chuyển tin cho chủ trong App
					</DialogTrigger>
					<DialogSelectCustomer />
				</Dialog>
				<Button
					variant={"outline"}
					className="w-full"
					onClick={() => copyToClipboard(value)}
				>
					{isCopied ? (
						<>
							<CheckIcon className="text-green-600" />
							<span>Đã sao chép tin</span>
						</>
					) : (
						<span>Chuyển tin bên ngoài</span>
					)}
				</Button>
			</div>
			<DialogFooter variant="bare">
				<DialogClose>Hủy bỏ</DialogClose>
			</DialogFooter>
		</DialogPopup>
	);
}
