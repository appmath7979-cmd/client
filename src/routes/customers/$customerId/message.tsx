import { useAppStore } from "@lavaz/store";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DropdownRegion } from "#/components/system/dropdowns/DropdownRegion";
import { Button } from "#/components/ui/button";
import { Label } from "#/components/ui/label";
import { Textarea } from "#/components/ui/textarea";
import { useDebounce } from "#/hooks/use-debounce";
import { store } from "#/store/store";
import { useRewardSchedule } from "#/hooks/app/use-reward-schedule";
import { useDatePicker } from "#/hooks/use-date-picker";
import { cn } from "#/lib/utils";
import { parseRawMessage } from "#/lib/parse-raw-message";
import {
	betPairSyntaxes,
	validKeysToCombine,
} from "#/constants/message.constant";
import { validateMessage } from "#/lib/validate-message";
import type { IValidateStatus } from "#/types/message.type";

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

	const { date } = useDatePicker();
	const rewardSchedule = useRewardSchedule(date);
	const debounced = useDebounce(value);

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
	}, [parsedText, region, rewardSchedule]);

	return (
		<div className="py-4">
			<div className="flex justify-end items-center gap-2">
				<DropdownRegion />
				<Button variant={"outline"} disabled={notice.status !== "success"}>
					Kiểm tra tin nhắn
				</Button>
				<Button>Gửi tin nhắn</Button>
			</div>
			<div className="space-y-1">
				<div>
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
						notice.status === "success" && "text-success-foreground bg-success",
						notice.status === "warning" &&
							"text-warning-foreground bg-warning/50",
					)}
				>
					{notice.message}
				</em>
			</div>
			{parsedText && (
				<div className="border rounded-md p-4">
					<p>Tin nhắn đã lọc</p>
					<div></div>
				</div>
			)}
		</div>
	);
}
