import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { cn } from "#/lib/utils";
import { Button } from "../ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../ui/collapsible";

export function TutorialCollapse({
	name,
	items,
}: {
	name: string;
	items: string[];
}) {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<Collapsible className="w-full">
			<CollapsibleTrigger asChild>
				<Button
					variant={"outline"}
					onClick={() => setIsOpen((prev) => !prev)}
					className="w-full relative"
				>
					{name}
					{isOpen ? (
						<CaretUpIcon weight="bold" className="absolute right-4" />
					) : (
						<CaretDownIcon weight="bold" className="absolute right-4" />
					)}
				</Button>
			</CollapsibleTrigger>
			<CollapsibleContent
				className={cn(
					"border p-2 rounded-md",
					name === "Thành phố" && "grid grid-cols-2 gap-2",
				)}
			>
				{items.map((item) => (
					<p key={item}>{item}</p>
				))}
			</CollapsibleContent>
		</Collapsible>
	);
}
