import { CheckIcon, NotePencilIcon } from "@phosphor-icons/react";
import { type KeyboardEvent, memo, useState } from "react";
import { cn } from "#/lib/utils";
import type { StatusValidatedType } from "#/types/common.type";
import { Button } from "../ui/button";

export const MessagItem = memo(
	({
		content,
		statusValidated,
		isCurrentError,
		index,
		onEditValue,
	}: {
		content: string;
		statusValidated: StatusValidatedType;
		isCurrentError: boolean;
		index: number;
		onEditValue: (edited: string, staleValueIndex: number) => void;
	}) => {
		const [value, setValue] = useState<string>(content);
		const [isEdit, setIsEdit] = useState<boolean>(false);
		const { itemError, status } = statusValidated;
		const statusColor =
			itemError && isCurrentError
				? status === "error"
					? "[&_div]:bg-red-500 text-red-500 [&_input]:border-red-500 [&_input]:focus:ring-red-500"
					: "[&_div]:bg-orange-500 text-orange-500 [&_input]:border-orange-500"
				: "[&_div]:bg-green-500 text-green-500 [&_input]:border-green-500 [&_input]:border-green-500";

		const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter" || e.key === "Tab" || e.key === "Escape") {
				onEditValue(value, index);
				setIsEdit(false);
			} else return;
		};

		return (
			<div
				className={cn(
					"flex justify-between items-center gap-4 p-4 bg-secondary rounded-md overflow-hidden relative",
					statusColor,
				)}
			>
				{isEdit ? (
					<>
						<input
							value={value}
							onChange={(e) => setValue(e.target.value)}
							onKeyDown={(e) => handleKeyDown(e)}
							className="w-full border-b-2 focus:outline-0 py-0.5"
						/>
						<Button
							variant={"outline"}
							size={"icon-sm"}
							onClick={() => {
								onEditValue(value, index);
								setIsEdit(false);
							}}
						>
							<CheckIcon weight="bold" />
						</Button>
					</>
				) : (
					<>
						<p onDoubleClick={() => setIsEdit(true)} className="w-full">
							{content}
						</p>
						<Button
							variant={"outline"}
							size={"icon-sm"}
							onClick={() => setIsEdit(true)}
						>
							<NotePencilIcon weight="bold" />
						</Button>
					</>
				)}
				<div className="absolute w-1 h-full top-0 left-0" />
			</div>
		);
	},
);
