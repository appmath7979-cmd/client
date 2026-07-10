import { useAppStore } from "@lavaz/store";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { CheckMessageBtn } from "#/components/messages/CheckMessageBtn";
import { SyntaxList } from "#/components/messages/SyntaxList";
import { DatePicker } from "#/components/system/DatePicker";
import { DropdownRegion } from "#/components/system/dropdowns/DropdownRegion";
import { Button } from "#/components/ui/button";
import { Label } from "#/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { Textarea } from "#/components/ui/textarea";
import {
	betPairSyntaxes,
	validKeysToCombine,
} from "#/constants/message.constant";
import { useRewardSchedule } from "#/hooks/app/use-reward-schedule";
import { usePostCustomer } from "#/hooks/query/use-customer-query";
import { useDatePicker } from "#/hooks/use-date-picker";
import { useDebounce } from "#/hooks/use-debounce";
import { formatDate } from "#/lib/date-format";
import { expandChunks } from "#/lib/message-parser";
import { parseMessageChunked } from "#/lib/parse-message-chunked";
import { parseRawMessage } from "#/lib/parse-raw-message";
import { cn } from "#/lib/utils";
import { validateMessage } from "#/lib/validate-message";
import { store } from "#/store/store";
import type { IValidateStatus } from "#/types/message.type";

export const Route = createFileRoute("/customers/$customerId/message")({
	staticData: { title: "Xử lý tin nhắn" },
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
	const [isChecked, setIsChecked] = useState<boolean>(false);
	const [checkedMessage, setCheckedMessage] = useState<Array<string[]>>([]);

	const { date, open, setOpen, handleSelect } = useDatePicker();
	const rewardSchedule = useRewardSchedule(date);
	const debounced = useDebounce(value);

	const handleEditChunks = useCallback(
		(newValue: string[], index: number) => {
			const nextChunks = [...chunks];
			nextChunks[index] = newValue;
			setChunks(nextChunks);
			setIsEdited(true);
			setIsChecked(false);
		},
		[chunks],
	);

	const handleSubmitEdit = () => {
		const newValue = chunks.map((item) => item.join(" ")).join(" ");
		setValue(newValue);
		setIsEdited(false);
	};

	const handleCheckMessage = () => {
		const value = expandChunks(chunks, rewardSchedule, region);
		setCheckedMessage(value);
		setIsChecked(true);
	};

	const handleSubmit = () => {
		const value = parseMessageChunked(checkedMessage, region);
		const release = formatDate(date);
		const data = {
			region,
			results: value,
			release,
		};
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

	return (
		<div className="py-4 space-y-6">
			<div className="flex justify-end items-center gap-2">
				<DatePicker
					date={date}
					open={open}
					onOpenChange={setOpen}
					onSelect={handleSelect}
				/>
				<DropdownRegion />
				<CheckMessageBtn notice={notice} onCheckMessage={handleCheckMessage} />
				<Button disabled={!isChecked} onClick={handleSubmit}>
					Gửi tin nhắn
				</Button>
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
					<Button disabled={!isEdited} onClick={handleSubmitEdit}>
						Xác nhận sửa tin
					</Button>
				</div>
				<Tabs defaultValue={"Lọc tin nhắn"}>
					<TabsList>
						<TabsTrigger value={"Lọc tin nhắn"}>Lọc tin nhắn</TabsTrigger>
						<TabsTrigger value={"Kiểm tra tin nhắn"}>
							Kiểm tra tin nhắn
						</TabsTrigger>
					</TabsList>
					<TabsContent value={"Lọc tin nhắn"}>
						{chunks.length > 0 ? (
							<SyntaxList chunks={chunks} onEdit={handleEditChunks} />
						) : (
							<p className="text-center border p-4 rounded-md text-muted-foreground">
								Chưa có tin nhắn để lọc
							</p>
						)}
					</TabsContent>
					<TabsContent value={"Kiểm tra tin nhắn"}>
						{checkedMessage.length > 0 ? (
							<ul className="grid md:grid-cols-2 gap-4">
								{checkedMessage.map((check, index) => {
									const key = `${check.join("-")}-${index}`;
									return (
										<li key={key} className="p-2 border rounded-md">
											{check.join(" ")}
										</li>
									);
								})}
							</ul>
						) : (
							<div className="text-center border p-4 rounded-md text-muted-foreground">
								<p>Vui lòng chọn kiểm tra tin nhắn</p>
								<CheckMessageBtn
									notice={notice}
									onCheckMessage={handleCheckMessage}
								/>
							</div>
						)}
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
