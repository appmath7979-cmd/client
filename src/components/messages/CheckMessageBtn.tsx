import type { IValidateStatus } from "#/types/message.type";
import { Button } from "../ui/button";

interface CheckMessageBtnProps {
	notice: IValidateStatus;
	disable?: boolean;
	onCheckMessage: () => void;
}

export function CheckMessageBtn({
	notice,
	disable,
	onCheckMessage,
}: CheckMessageBtnProps) {
	return (
		<Button
			variant={"outline"}
			disabled={
				typeof disable !== "boolean" ? notice.status !== "success" : disable
			}
			onClick={onCheckMessage}
		>
			Kiểm tra tin nhắn
		</Button>
	);
}
