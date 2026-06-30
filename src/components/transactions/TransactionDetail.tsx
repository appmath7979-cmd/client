import { CopyIcon, NotePencilIcon, TrashIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { evaluateExpression } from "#/lib/transaction";
import { cn } from "#/lib/utils";
import { Button } from "../ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../ui/collapsible";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface TransactionDetailProps {
	transactionId: string;
	index: number;
	contents: Array<string[]>;
	coContents: Array<string[]> | undefined;
	customerId: string;
}

export function TransactionDetail({
	contents,
	index,
	coContents,
	transactionId,
	customerId,
}: TransactionDetailProps) {
	const [open, setOpen] = useState<boolean>(false);

	const calcCo = useMemo(() => {
		const calcItem = coContents?.map((item) => {
			const newScore = evaluateExpression(item[3]);
			const newItem = item;
			newItem[3] = String(newScore);
			return newItem;
		});
		return calcItem;
	}, [coContents]);

	return (
		<>
			<div className="flex justify-between border-b p-2 bg-secondary/80">
				<div className="flex gap-2">
					<p className="font-semibold">{index + 1}</p>
					<p>{contents.map((item) => item.join(" ")).join(" ")}</p>
				</div>
				<div className="flex">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant={"ghost"} size={"icon-sm"}>
								<CopyIcon />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Sao chép tin nhắn</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant={"ghost"} size={"icon-sm"} asChild>
								<Link
									to="/customer/$customerId/transactions/$transactionId"
									params={{ customerId: customerId ?? "", transactionId }}
								>
									<NotePencilIcon />
								</Link>
							</Button>
						</TooltipTrigger>
						<TooltipContent>Sửa tin nhắn</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant={"ghost"}
								size={"icon-sm"}
								className="text-destructive hover:text-destructive"
							>
								<TrashIcon />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Xóa tin nhắn</TooltipContent>
					</Tooltip>
				</div>
			</div>
			<div>
				<Collapsible open={open} onOpenChange={setOpen}>
					<CollapsibleTrigger asChild>
						<Button variant={"ghost"} className="w-full justify-start">
							Thu:
						</Button>
					</CollapsibleTrigger>
					<CollapsibleContent className="flex">
						<div className="w-1/3">
							{contents.map((content, i) => {
								const key = `xac-${content.join("-")}-${i}`;
								return (
									<div
										key={key}
										className={cn(
											"flex justify-between items-center p-2",
											i % 2 !== 0 && "bg-muted/50",
										)}
									>
										<p>{`${content[1]} ${content[2]}`}</p>
										<p>{content[3]}</p>
									</div>
								);
							})}
						</div>
						<div className="w-1/3 border-x">
							{calcCo?.map((content, i) => {
								const key = `co-${content.join("-")}-${i}`;
								return (
									<div
										key={key}
										className={cn(
											"flex justify-between items-center p-2",
											i % 2 !== 0 && "bg-muted/50",
										)}
									>
										<p>{`${content[1]} ${content[2]}`}</p>
										<p>{content[3]}</p>
									</div>
								);
							})}
						</div>
					</CollapsibleContent>
				</Collapsible>
			</div>
		</>
	);
}
