function formatDate(date: Date, data: boolean = false) {
	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear();

	return data ? `${year}-${month}-${day}` : `${day}/${month}/${year}`;
}

function parseToDayOfWeek(dateStr: string): number {
	let date: Date;

	if (dateStr.includes("-")) {
		const [year, month, day] = dateStr.split("-").map(Number);
		date = new Date(year, month - 1, day);
	} else if (dateStr.includes("/")) {
		const [day, month, year] = dateStr.split("/").map(Number);
		date = new Date(year, month - 1, day);
	} else {
		date = new Date(dateStr);
	}

	return date.getDay();
}

export { formatDate, parseToDayOfWeek };
