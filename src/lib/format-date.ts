export function formatDate(value: Date | undefined) {
	if (!value) return;
	const [day, month, year] = value
		.toLocaleDateString("vi-VN", {
			month: "2-digit",
			day: "2-digit",
			year: "numeric",
		})
		.split("/");
	return `${year}-${month}-${day}`;
}
