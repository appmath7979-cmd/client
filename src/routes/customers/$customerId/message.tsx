import { useAppStore } from "@lavaz/store";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { SyntaxList } from "#/components/messages/SyntaxList";
import { DropdownRegion } from "#/components/system/dropdowns/DropdownRegion";
import { Button } from "#/components/ui/button";
import { Label } from "#/components/ui/label";
import { Textarea } from "#/components/ui/textarea";
import {
	betPairSyntaxes,
	validKeysToCombine,
} from "#/constants/message.constant";
import { useRewardSchedule } from "#/hooks/app/use-reward-schedule";
import { useDatePicker } from "#/hooks/use-date-picker";
import { useDebounce } from "#/hooks/use-debounce";
import { parseRawMessage } from "#/lib/parse-raw-message";
import { cn } from "#/lib/utils";
import { validateMessage } from "#/lib/validate-message";
import { store } from "#/store/store";
import type { IValidateStatus } from "#/types/message.type";
import { expandChunks } from "#/lib/message-parser";

export const Route = createFileRoute("/customers/$customerId/message")({
	component: RouteComponent,
});

function RouteComponent() {
	const [region] = useAppStore(store.region, (s) => s.region);
	const [value, setValue] = useState<string>("");
	const [parsedText, setParsedText] = useState<string>("");
	const [notice, setNotice] = useState<IValidateStatus>({
		message: "Chưa nhập tin nhắn!",
		status: "error",
	});
	const [chunks, setChunks] = useState<Array<string[]>>([]);
	const [isEdited, setIsEdited] = useState<boolean>(false);

	const { date } = useDatePicker();
	const rewardSchedule = useRewardSchedule(date);
	const debounced = useDebounce(value);

	const handleEditChunks = useCallback(
		(newValue: string[], index: number) => {
			const nextChunks = [...chunks];
			nextChunks[index] = newValue;
			setChunks(nextChunks);
			setIsEdited(true);
		},
		[chunks],
	);

	const handleSubmit = () => {
		const newValue = chunks.map((item) => item.join(" ")).join(" ");
		setValue(newValue);
		setIsEdited(false);
	};

	useEffect(() => {
		const resultString = parseRawMessage(
			debounced,
			betPairSyntaxes,
			validKeysToCombine,
		);
		setParsedText(resultString);
		setValue(resultString);
	}, [debounced]);

	useEffect(() => {
		const { status, message, chunks } = validateMessage(
			parsedText,
			rewardSchedule,
			region,
		);

		setNotice({ message, status });
		setChunks(chunks);
	}, [parsedText, region, rewardSchedule]);

	const handleCheckMessage = () => {
		const value = expandChunks(chunks, rewardSchedule, region);
		console.log(value);
	};

	return (
		<div className="py-4 space-y-6">
			<div className="flex justify-end items-center gap-2">
				<DropdownRegion />
				<Button
					variant={"outline"}
					disabled={notice.status !== "success"}
					onClick={handleCheckMessage}
				>
					Kiểm tra tin nhắn
				</Button>
				<Button>Gửi tin nhắn</Button>
			</div>
			<div className="space-y-2">
				<div className="space-y-1">
					<Label>Nhập tin nhắn</Label>
					<Textarea
						resize={false}
						placeholder="tp 69 b10..."
						value={value}
						onChange={(e) => setValue(e.target.value)}
					/>
				</div>
				<em
					className={cn(
						"text-sm inline-flex px-2 py-1 rounded-md",
						notice.status === "error" &&
							"text-destructive-foreground bg-destructive",
						notice.status === "success" &&
							"text-success-foreground bg-success/30",
						notice.status === "warning" &&
							"text-warning-foreground bg-warning/30",
					)}
				>
					{notice.message}
				</em>
			</div>

			<div className="border rounded-md p-4 space-y-5">
				<div className="flex justify-between items-center">
					<p className="font-semibold">Tin nhắn đã lọc</p>
					<Button disabled={!isEdited} onClick={handleSubmit}>
						Xác nhận sửa tin
					</Button>
				</div>
				<SyntaxList chunks={chunks} onEdit={handleEditChunks} />
			</div>
		</div>
	);
}
