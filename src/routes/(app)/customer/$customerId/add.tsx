import { useAppStore } from "@lavaz/store";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { RegionDropdown } from "#/components/dropdowns/RegionDropdown";
import { MessagItem } from "#/components/messages/MessagItem";
import { Button } from "#/components/ui/button";
import { Label } from "#/components/ui/label";
import { Spinner } from "#/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { Textarea } from "#/components/ui/textarea";
import { stationList } from "#/constants/content-parse.contant";
import { useGetCustomerById } from "#/hooks/query/useCustomerQuery";
import { usePostTrans } from "#/hooks/query/useTransQuery";
import { useDebounce } from "#/hooks/useDebounce";
import { flattenMessage } from "#/lib/flattenMessage";
import { formatDate } from "#/lib/format-date";
import { cn } from "#/lib/utils";
import { validateMessage } from "#/lib/validateMessage";
import { store } from "#/store/store";
import type {
	MessageInputType,
	StatusValidatedType,
} from "#/types/common.type";

export const Route = createFileRoute("/(app)/customer/$customerId/add")({
	staticData: { title: "Thêm tin nhắn" },
	component: RouteComponent,
	context: ({ params }) => params,
});

function RouteComponent() {
	const { customerId } = Route.useParams();
	const [value, setValue] = useState<string>("");
	const [region] = useAppStore(store.regionDropdown, (s) => s.value);
	const [notice, setNotice] = useState<MessageInputType>({
		message: "",
		status: "error",
	});
	const [listValues, setListValues] = useState<Array<string[]>>([]);
	const [statusValidate, setStatusValidate] = useState<StatusValidatedType>({
		status: "error",
	});
	const [canSubmit, setCanSubmit] = useState<boolean>(false);
	const [flatMessage, setFlatMessage] = useState<Array<string[]>>([]);

	const debounced = useDebounce(value, 500);

	const { data } = useGetCustomerById(customerId);
	const { mutate, isPending } = usePostTrans(customerId);

	const handleEditValue = useCallback(
		(edited: string, staleValueIndex: number) => {
			if (listValues[staleValueIndex].join(" ") === edited) return;
			const updatedList = [...listValues];
			updatedList[staleValueIndex] = edited.split(" ");
			setValue(updatedList.join(" "));
		},
		[listValues],
	);

	const handleMessage = (arrValue: Array<string[]>) => {
		const flatten = flattenMessage(arrValue);
		setFlatMessage(flatten);
		setCanSubmit(true);
	};

	const handleSubmit = async () => {
		const date = formatDate(new Date());
		if (!date || !data) return;

		const currentTime = new Date().toLocaleTimeString();

		const regionMapper: Record<string, "NORTH" | "SOUTH" | "CENTRAL"> = {
			"mien-bac": "NORTH",
			"mien-nam": "SOUTH",
			"mien-trung": "CENTRAL",
		};

		const apiRegion = regionMapper[region];
		if (!apiRegion) return;

		await mutate({
			region: apiRegion,
			customerId,
			release: date,
			type: "XAC",
			createTime: currentTime,
			content: flatMessage,
		});
	};

	useEffect(() => {
		const formatMessage = () => {
			if (!debounced.trim()) return;

			const text = debounced.trim().toLocaleLowerCase();
			let arrayValue = text
				.replace(/[^a-zA-Z0-9\s;à-ỹÀ-ỸđĐ]]/g, " ")
				.replaceAll(/[,._+=]/g, " ")
				.split(/\s+/g);

			const replaceMap = {
				da: ["đá", "đa", "đã", "dã", "dat"],
				dau: ["đầu", "đau", "đâu", "dầu", "dàu"],
				duoi: ["đuôi", "đui", "đb", "đề", "db", "de", "dê", "dề", "đê"],
				b: ["bao", "bl", "baolo", "blo", "baol", "blô", "bo", "lo", "lô"],
				k: ["đến", "den", "đén", "đen", "kéo", "keo", "dén"],
				bd: ["baodao", "đảo", "đao"],
				xduoi: ["xdui", "xduoi", "xđuôi", "xđui", "xđuoi"],
				xdau: ["xdau", "xđầu", "xđau"],
			};

			const allWords = Object.values(replaceMap).flat();
			const globalRegex = new RegExp(`(${allWords.join("|")})`, "gi");

			const wordLookup: Record<string, string> = {};
			for (const [correct, wrongs] of Object.entries(replaceMap)) {
				wrongs.forEach((wrong) => {
					wordLookup[wrong.toLowerCase()] = correct;
				});
			}

			arrayValue = arrayValue.map((item) =>
				item.replace(
					globalRegex,
					(match) => wordLookup[match.toLowerCase()] || match,
				),
			);

			for (let i = 0; i < arrayValue.length; i++) {
				const currentValue = arrayValue[i];

				if (
					!stationList.includes(currentValue) &&
					currentValue !== "mb" &&
					/^[a-zA-Z]+$/.test(currentValue) &&
					currentValue !== "k" &&
					currentValue !== "n"
				) {
					if (
						/^\d+$/.test(arrayValue[i + 1]) ||
						/^\d+n$/.test(arrayValue[i + 1])
					) {
						arrayValue[i + 1] = currentValue + arrayValue[i + 1];
						arrayValue.splice(i, 1);
						i--;
					}
				}

				if (arrayValue[i + 1] === "n") {
					arrayValue[i + 1] = currentValue + arrayValue[i + 1];
					arrayValue.splice(i, 1);
					i--;
				}
			}

			// Đã tối ưu biến formatted gọn gàng hơn
			const formatted =
				/\s$/.test(debounced) || /\[,.]$/.test(debounced)
					? `${arrayValue.join(" ")} `
					: arrayValue.join(" ");

			setValue(formatted);
		};

		formatMessage();
		setCanSubmit(false);
		setFlatMessage([]);
	}, [debounced]);

	useEffect(() => {
		const { validatedValue, notice, statusValidated } = validateMessage({
			value: debounced,
			region,
		});

		setNotice(notice);
		setListValues(validatedValue);
		setStatusValidate(statusValidated);
	}, [debounced, region]);

	return (
		<div className="py-4 space-y-4">
			<div className="flex justify-end items-center gap-2">
				<RegionDropdown />
				<Button
					variant={"outline"}
					disabled={notice.status !== "success"}
					onClick={() => handleMessage(listValues)}
				>
					Xử lý tin nhắn
				</Button>
				<Button disabled={!canSubmit} onClick={() => handleSubmit()}>
					Lưu tin nhắn
				</Button>
			</div>
			<div>
				<div className="space-y-2">
					<Label htmlFor="msgInput">Nhập tin nhắn</Label>
					<Textarea
						id="msgInput"
						value={value}
						onChange={(e) => setValue(e.target.value)}
						placeholder="Nhập tin nhắn, ví dụ: dn 79 b100,..."
						className="min-h-20"
					/>
				</div>
				<p
					className={cn(
						"font-semibold mt-2",
						notice.status === "error" && "text-destructive",
						notice.status === "success" && "text-green-600",
					)}
				>
					{notice.message ?? "Chưa nhập tin nhắn!"}
				</p>
			</div>
			<Tabs defaultValue="message">
				<TabsList className="w-full flex justify-center h-10">
					<TabsTrigger value="message">Chỉnh sửa tin nhắn</TabsTrigger>
					<TabsTrigger value="flatten">Kiểm tra tin nhắn</TabsTrigger>
				</TabsList>
				<TabsContent value="message">
					<ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{listValues.length > 0 &&
							listValues.map((item, index) => {
								const key = `value-${index}`;
								return (
									<li key={key}>
										<MessagItem
											content={item.join(" ")}
											statusValidated={statusValidate}
											isCurrentError={index === listValues.length - 1}
											index={index}
											onEditValue={handleEditValue}
										/>
									</li>
								);
							})}
					</ul>
				</TabsContent>
				<TabsContent
					value="flatten"
					className="rounded-md overflow-hidden text-center shadow-md dark:shadow-gray-800"
				>
					<div className="flex justify-between items-center bg-secondary px-4 py-2 [&_p]:first-letter:uppercase [&_p]:w-1/4 text-center">
						<p>Đài</p>
						<p>Số/Cặp</p>
						<p>Cú pháp</p>
						<p>Điểm</p>
					</div>
					<ul className="flex flex-col [&_>_li:nth-child(even)]:bg-secondary/20">
						{(flatMessage.length > 0 &&
							flatMessage.map((item, index) => {
								const key = `${item.join("-")}-${index}`;
								return (
									<li
										key={key}
										className="flex justify-between items-center px-4 py-2 rounded-md"
									>
										{item.map((val, i) => {
											const keyChild = `${key}-${i}`;
											return (
												<p key={keyChild} className="w-1/4 text-center">
													{val}
												</p>
											);
										})}
									</li>
								);
							})) || (
							<li className="text-muted-foreground font-semibold text-center p-2">
								Tin nhắn chưa có hoặc đã thay đổi, vui lòng kiểm tra lại tin
								nhắn!
							</li>
						)}
					</ul>
				</TabsContent>
			</Tabs>
			{isPending && (
				<div className="fixed w-full h-dvh top-0 left-0 bg-background/80 z-1000 grid place-items-center">
					<div className="bg-background shadow-md dark:shadow-gray-800 p-8 rounded-md w-md text-center space-y-4">
						<h2 className="text-2xl font-bold text-primary">TOANHOC</h2>
						<div className="flex justify-center items-center gap-1 text-lg">
							<Spinner />
							<p className="font-semibold">Đang xử lý...</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
