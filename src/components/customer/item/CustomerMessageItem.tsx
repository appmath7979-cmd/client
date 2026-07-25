import { cn } from "#/lib/utils";

interface CustomerMessageItemProps {
	type: "XAC" | "CO" | "TRUNG";
	prefix: string;
	content: string;
}

export function CustomerMessageItem({
	type,
	prefix,
	content,
}: CustomerMessageItemProps) {
	// Hàm chuyển đổi các từ khóa viết tắt sang tiếng Việt có dấu
	const formatPrefix = (str: string) => {
		let formatted = str.toLowerCase().replace(/_/g, " ");

		// Thay thế các từ khóa theo yêu cầu
		// Dùng regex boundary \b để đảm bảo thay thế chính xác từ độc lập
		formatted = formatted
			.replace(/\bda\b/g, "đá")
			.replace(/\bdau\b/g, "đầu")
			.replace(/\bduoi\b/g, "đuôi");

		return formatted.toUpperCase();
	};

	return (
		<div
			className={cn(
				"w-full font-semibold py-2 px-2 uppercase",
				type === "XAC" && "text-amber-600",
				type === "CO" && "text-emerald-600",
				type === "TRUNG" && "text-red-600",
			)}
		>
			{formatPrefix(prefix)}: {content}
		</div>
	);
}
