import { QuestionMarkIcon } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { TutorialDialog } from "#/components/tutorials/TutorialDialog";
import { Button } from "#/components/ui/button";
import { Dialog, DialogTrigger } from "#/components/ui/dialog";
import { Label } from "#/components/ui/label";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "#/components/ui/table";
import { Textarea } from "#/components/ui/textarea";
import {
	fourTargetForSyntaxList,
	stationList,
	threeTargetForSyntaxList,
	twoTargetForSyntaxList,
} from "#/constants/content-parse.contant";
import { useDebounce } from "#/hooks/useDebounce";
import { cn } from "#/lib/utils";

export const Route = createFileRoute("/(app)/customer/$customerId/add")({
	component: RouteComponent,
});

function RouteComponent() {
	const [value, setValue] = useState<string>("");
	const [messages, setMessage] = useState<{
		msg: string;
		status: "success" | "error";
	}>({ msg: "Chưa nhập tin nhắn!", status: "error" });
	const debounce = useDebounce(value);

	useEffect(() => {
		function validateValue() {
			const text = debounce.trim();
			if (!text) {
				setMessage({ msg: "Chưa nhập tin nhắn!", status: "error" });
				return;
			}

			const arrayValue = text.split(/\s+/);
			const stations = arrayValue.filter((item) => /^[a-zA-Z]+$/.test(item));

			if (stations.length === 0) {
				setMessage({ msg: "Chưa nhập tên đài!", status: "error" });
				return;
			}

			const stationListCompare = new Set(stationList);
			for (const station of stations) {
				if (!stationListCompare.has(station)) {
					setMessage({
						msg: `Tên đài ${station} không hợp lệ!`,
						status: "error",
					});
					return;
				}
			}

			const indexesOfStations = stations.map((station) =>
				arrayValue.indexOf(station),
			);
			const splitArray: Array<string[]> = [];

			if (indexesOfStations.length > 1) {
				for (let i = 0; i < indexesOfStations.length; i++) {
					splitArray.push(
						arrayValue.slice(indexesOfStations[i], indexesOfStations[i + 1]),
					);
				}
			} else {
				splitArray.push(arrayValue);
			}

			const syntaxCompares = {
				2: new Set(twoTargetForSyntaxList),
				3: new Set(threeTargetForSyntaxList),
				4: new Set(fourTargetForSyntaxList),
			};

			// 3. Vừa kiểm tra vừa quét lỗi
			for (const item of splitArray) {
				const stationName = item[0]; // Tên đài là phần tử đầu tiên

				// Lấy danh sách số đánh (chỉ chứa số)
				const targetArr = item.filter((fil) => /^\d+$/.test(fil)).map(Number);
				if (targetArr.length === 0) {
					setMessage({
						msg: `Đài ${stationName} chưa có số đánh!`,
						status: "error",
					});
					return;
				}

				// THAY ĐỔI CHIẾN THUẬT: Cú pháp là những từ KHÔNG PHẢI tên đài và KHÔNG PHẢI là số đánh thuần túy
				const syntaxArr = item.filter(
					(fil) => fil !== stationName && !/^\d+$/.test(fil),
				);

				// Lọc bỏ sạch số trong cú pháp, chỉ giữ lại phần chữ cái để so sánh với Set (Ví dụ: "d10" -> "d")
				const letters = syntaxArr.map((s) => s.replace(/\d+/g, ""));

				// BẮT LỖI: Nếu nhập "tp 10", mảng letters sẽ rỗng vì không tìm thấy từ nào làm cú pháp -> Báo lỗi ngay!
				if (letters.length === 0) {
					setMessage({
						msg: `Đài ${stationName} chưa có cú pháp đánh (Ví dụ: dd, xdui, b, lo,...)!`,
						status: "error",
					});
					return;
				}

				// Kiểm tra từng số đánh
				for (const target of targetArr) {
					const numStr = target.toString();
					const len = numStr.length;

					if (len > 4 || len <= 1) {
						setMessage({
							msg: `Số đánh ${numStr} không hợp lệ!`,
							status: "error",
						});
						return;
					}

					// Kiểm tra phần chữ cái (letters) có khớp với độ dài số đánh không
					const currentCompareSet = syntaxCompares[len as 2 | 3 | 4];

					for (const letter of letters) {
						if (!currentCompareSet || !currentCompareSet.has(letter)) {
							setMessage({
								msg: `Cú pháp ${letter} không hợp lệ với ${len} càng!`,
								status: "error",
							});
							return;
						}
					}
				}
			}

			// Nếu mọi thứ đều đúng, không lỗi
			setMessage({ msg: "Tin nhắn hợp lệ.", status: "success" });
			console.log("a");
		}

		validateValue();
	}, [debounce]);

	return (
		<Dialog>
			<div className="py-2">
				<div className="flex justify-end items-center gap-2">
					<Button disabled={messages.status === "error"}>Lưu tin</Button>
				</div>
				<div className="mt-4 space-y-8">
					<div className="space-y-2">
						<div className="flex justify-between items-center">
							<Button
								variant={"outline"}
								size={"sm"}
								asChild
								className="uppercase"
							>
								<Label htmlFor="text-area">nhập tin nhắn</Label>
							</Button>
							<DialogTrigger asChild>
								<Button variant={"ghost"} size={"icon-sm"}>
									<QuestionMarkIcon weight="fill" />
								</Button>
							</DialogTrigger>
						</div>
						<Textarea
							id="text-area"
							placeholder="VD: tp 10 b10..."
							value={value}
							onChange={(e) => setValue(e.target.value)}
							className="resize-none"
						/>
					</div>
					<em
						className={cn(
							"px-2 py-1.5 rounded-md border block text-sm",
							messages.msg && messages.status === "error"
								? "text-destructive"
								: "text-green-600",
						)}
					>
						{messages.msg}
					</em>
					<div className="border rounded-md overflow-hidden">
						<Table>
							<TableHeader>
								<TableRow className="*:text-center">
									<TableHead>Tên đài</TableHead>
									<TableHead>Số/Cặp đánh</TableHead>
									<TableHead>Cú pháp</TableHead>
									<TableHead>Điểm</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow></TableRow>
							</TableBody>
						</Table>
					</div>
				</div>
			</div>
			<TutorialDialog />
		</Dialog>
	);
}
