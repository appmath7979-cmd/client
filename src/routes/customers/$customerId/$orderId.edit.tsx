import {
	createFileRoute,
	useNavigate,
	useParams,
} from "@tanstack/react-router";
import { Trash2Icon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { CheckMessageBtn } from "#/components/messages/CheckMessageBtn";
import { SyntaxList } from "#/components/messages/SyntaxList";
import { BackBtn } from "#/components/system/BackBtn";
import { DialogConfirm } from "#/components/system/dialogs/DialogConfirm";
import { AlertDialog, AlertDialogTrigger } from "#/components/ui/alert-dialog";
import { Button } from "#/components/ui/button";
import { Label } from "#/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { Textarea } from "#/components/ui/textarea";
import {
	betPairSyntaxes,
	validKeysToCombine,
} from "#/constants/message.constant";
import { useRewardSchedule } from "#/hooks/app/use-reward-schedule";
import { useOrderMutation, useOrderQuery } from "#/hooks/query/use-order-query";
import { useDebounce } from "#/hooks/use-debounce";
import { parseToDayOfWeek } from "#/lib/date-format";
import { formatRawMessage } from "#/lib/format-raw-message";
import { expandChunks } from "#/lib/message-parser";
import { parseMessageChunked } from "#/lib/parse-message-chunked";
import { splitMessageToChunks } from "#/lib/split-message-to-chunks";
import { cn } from "#/lib/utils";
import type { IPatchOrderMessageApi } from "#/types/apis/message.type";
import type { IValidateStatus } from "#/types/message.type";

export const Route = createFileRoute("/customers/$customerId/$orderId/edit")({
	staticData: { title: "Sửa tin nhắn" },
	component: RouteComponent,
});

function RouteComponent() {
	const { customerId, orderId } = useParams({
		from: "/customers/$customerId/$orderId/edit",
	});
	const { data } = useOrderQuery.getById(orderId);
	const order = data?.order;
	const text = data?.order?.message ?? "";

	const navigate = useNavigate();
	const mutation = useOrderMutation();

	const [value, setValue] = useState<string>("");
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [isEdited, setIsEdited] = useState<boolean>(false);
	const [isChecked, setIsChecked] = useState<boolean>(false);
	const [parsedText, setParsedText] = useState<string>("");
	const [chunks, setChunks] = useState<Array<string[]>>([]);
	const [notice, setNotice] = useState<IValidateStatus>({
		message: "Tin nhắn hợp lệ",
		status: "success",
	});
	const [checkedMessage, setCheckedMessage] = useState<Array<string[]>>([]);
	const debounced = useDebounce(value === text ? "" : value);

	const day = parseToDayOfWeek(order?.release ?? "");

	const rewardSchedule = useRewardSchedule({ day });
	const region = order?.region;

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
		if (!region) return;
		const val = expandChunks(chunks, rewardSchedule, region);
		setCheckedMessage(val);
		setIsChecked(text !== value);
	};

	const handleCancel = () => {
		if (value !== text) setValue(text);
		setIsEdit(false);
	};

	const handleSubmit = () => {
		if (!region) return;
		const details = parseMessageChunked(checkedMessage, region);
		const data: IPatchOrderMessageApi = {
			id: orderId,
			details,
			message: value,
			customerId,
		};
		mutation.patch.mutate(data);
	};

	useEffect(() => {
		if (!text) return;
		setValue(text);
	}, [text]);

	useEffect(() => {
		const resultString = formatRawMessage(
			debounced,
			betPairSyntaxes,
			validKeysToCombine,
		);
		if (!resultString) return;
		setParsedText(resultString);
		setValue(resultString);
	}, [debounced]);

	useEffect(() => {
		if (!region) return;

		if (!value || value === text) {
			setNotice({
				message: "Tin nhắn hợp lệ",
				status: "success",
			});
			return;
		}

		if (value === text) return;
		const { status, message, chunks } = splitMessageToChunks(
			parsedText,
			rewardSchedule,
			region,
		);

		setNotice({ message, status });
		setChunks(chunks);
	}, [parsedText, region, rewardSchedule, value, text]);

	useEffect(() => {
		if (mutation.delete.isSuccess)
			navigate({ to: "/customers/$customerId", params: { customerId } });
	}, [mutation, navigate, customerId]);

	return (
		<div className="py-4 space-y-6">
			<div className="space-y-4">
				<div className="flex justify-between items-center">
					<BackBtn />
					<div className="flex items-center gap-2">
						{isEdit ? (
							<>
								<Button variant={"outline"} onClick={handleCancel}>
									Hủy sửa tin
								</Button>
								<CheckMessageBtn
									notice={notice}
									disable={text === value}
									onCheckMessage={handleCheckMessage}
								/>
								<Button
									disabled={!isChecked || mutation.patch.isPending}
									onClick={handleSubmit}
								>
									Xác nhận
								</Button>
							</>
						) : (
							<Button onClick={() => setIsEdit(true)}>
								Chỉnh sửa tin nhắn
							</Button>
						)}
					</div>
				</div>
				<div className="space-y-1">
					<div className="space-y-2">
						<div className="flex justify-between items-center">
							<Label htmlFor="edit-area">Sửa tin nhắn</Label>
							<AlertDialog>
								<AlertDialogTrigger
									render={<Button variant={"outline"} size={"icon-xs"} />}
								>
									<Trash2Icon />
								</AlertDialogTrigger>
								<DialogConfirm
									title="Xóa tin nhắn"
									description={`Bạn có chắc chắn muốn xóa tin này?`}
									onConfirm={() => mutation.delete.mutate(orderId)}
								/>
							</AlertDialog>
						</div>
						<Textarea
							id="edit-area"
							value={value}
							onChange={(e) => setValue(e.target.value)}
							disabled={!isEdit}
							resize={false}
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
