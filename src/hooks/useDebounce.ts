import { useEffect, useState } from "react";

export function useDebounce(value: string, delay: number = 300) {
	const [debounceValue, setDebounceValue] = useState<string>("");

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebounceValue(value);
		}, delay);

		return () => clearTimeout(handler);
	}, [value, delay]);

	return debounceValue;
}
