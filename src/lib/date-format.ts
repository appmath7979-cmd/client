export function formatDate(date: Date, data: boolean = false) {
	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear();

	return data ? `${year}-${month}-${day}` : `${day}/${month}/${year}`;
}
