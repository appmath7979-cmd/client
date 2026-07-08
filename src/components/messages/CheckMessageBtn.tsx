import type { IValidateStatus } from "#/types/message.type";
import { Button } from "../ui/button";

interface CheckMessageBtnProps {
	notice: IValidateStatus;
	onCheckMessage: () => void;
}

export function CheckMessageBtn({
	notice,
	onCheckMessage,
}: CheckMessageBtnProps) {
	return (
		<Button
			variant={"outline"}
			disabled={notice.status !== "success"}
			onClick={onCheckMessage}
		>
			Kiểm tra tin nhắn
		</Button>
	);
}
