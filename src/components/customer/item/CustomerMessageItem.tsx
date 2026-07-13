import { cn } from "#/lib/utils";

interface CustomerMessageItemProps {
	type: "TYPE" | "XAC" | "CO" | "TRUNG";
	content: string;
}

export function CustomerMessageItem({
	type,
	content,
}: CustomerMessageItemProps) {
	return (
		<p
			className={cn(
				"w-1/4 uppercase font-semibold flex items-center justify-center border-l py-2",
				type === "TYPE" && "text-blue-600 border-l-0",
				type === "XAC" && "text-amber-600",
				type === "CO" && "text-emerald-600",
				type === "TRUNG" && "text-red-600",
			)}
		>
			{content}
		</p>
	);
}
