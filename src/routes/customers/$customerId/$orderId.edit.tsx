import {
	createFileRoute,
	useNavigate,
	useParams,
} from "@tanstack/react-router";
import { ChevronLeft, Trash2Icon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { CheckMessageBtn } from "#/components/messages/CheckMessageBtn";
import { SyntaxList } from "#/components/messages/SyntaxList";
import { Button } from "#/components/ui/button";
import { Label } from "#/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { Textarea } from "#/components/ui/textarea";
import { Tooltip, TooltipPopup, TooltipTrigger } from "#/components/ui/tooltip";
import {
	betPairSyntaxes,
	validKeysToCombine,
} from "#/constants/message.constant";
import { useRewardSchedule } from "#/hooks/app/use-reward-schedule";
import { useOrderMutation, useOrderQuery } from "#/hooks/query/use-order-query";
import { useDebounce } from "#/hooks/use-debounce";
import { convertOrderToText } from "#/lib/convert-order-to-text";
import { parseToDayOfWeek } from "#/lib/date-format";
import { expandChunks } from "#/lib/message-parser";
import { parseMessageChunked } from "#/lib/parse-message-chunked";
import { parseRawMessage } from "#/lib/parse-raw-message";
import { cn } from "#/lib/utils";
import { validateMessage } from "#/lib/validate-message";
import type { IPatchOrderMessageApi } from "#/types/apis/message.type";
import type { IValidateStatus } from "#/types/message.type";
import { AlertDialog, AlertDialogTrigger } from "#/components/ui/alert-dialog";
import { DialogConfirm } from "#/components/system/dialogs/DialogConfirm";

export const Route = createFileRoute("/customers/$customerId/$orderId/edit")({
	staticData: { title: "Sửa tin nhắn" },
	component: RouteComponent,
	loader: ({ context, params }) =>
		context.queryClient.fetchQuery(useOrderQuery.getById(params.orderId)),
});

function RouteComponent() {
	const { customerId, orderId } = useParams({
		from: "/customers/$customerId/$orderId/edit",
	});
	const { order } = Route.useLoaderData();
	const text = convertOrderToText(order);

	const navigate = useNavigate();
	const mutation = useOrderMutation();

	const [value, setValue] = useState<string>(text);
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

	const day = parseToDayOfWeek(order.release);

	const rewardSchedule = useRewardSchedule({ day });
	const region = order.region;

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
		const val = expandChunks(chunks, rewardSchedule, region);
		setCheckedMessage(val);
		setIsChecked(text !== value);
	};

	const handleCancel = () => {
		if (value !== text) setValue(text);
		setIsEdit(false);
	};

	const handleSubmit = () => {
		const value = parseMessageChunked(checkedMessage, region);
		const data: IPatchOrderMessageApi = {
			id: orderId,
			results: value,
			customerId,
		};
		mutation.patch.mutate(data);
	};

	useEffect(() => {
		const resultString = parseRawMessage(
			debounced,
			betPairSyntaxes,
			validKeysToCombine,
		);
		if (!resultString) return;
		setParsedText(resultString);
		setValue(resultString);
	}, [debounced]);

	useEffect(() => {
		if (value === text) return;
		const { status, message, chunks } = validateMessage(
			parsedText,
			rewardSchedule,
			region,
		);

		setNotice({ message, status });
		setChunks(chunks);
	}, [parsedText, region, rewardSchedule, value, text]);

	useEffect(() => {
		if (mutation.patch.isSuccess) {
			const orderUpdated = mutation.patch.data.order;
			const newText = convertOrderToText(orderUpdated);
			setValue(newText);
			setIsChecked(false);
			setIsEdit(false);
		}
	}, [mutation]);

	useEffect(() => {
		if (mutation.delete.isSuccess)
			navigate({ to: "/customers/$customerId", params: { customerId } });
	}, [mutation, navigate, customerId]);

	return (
		<div className="py-4 space-y-6">
			<div className="space-y-4">
				<div className="flex justify-between items-center">
					<Tooltip>
						<TooltipTrigger
							render={
								<Button
									variant={"outline"}
									size={"icon-sm"}
									onClick={() =>
										navigate({
											to: "/customers/$customerId",
											params: { customerId },
										})
									}
								/>
							}
						>
							<ChevronLeft />
						</TooltipTrigger>
						<TooltipPopup>Quay lại</TooltipPopup>
					</Tooltip>
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
