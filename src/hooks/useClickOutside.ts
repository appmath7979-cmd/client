import { type RefObject, useEffect } from "react";

export function useClickOutside(
	elementRef: RefObject<HTMLElement | null>,
	state: boolean,
	handler: () => void,
) {
	useEffect(() => {
		if (!state) return;

		const handleClickOutside = (e: MouseEvent | TouchEvent) => {
			if (elementRef.current && !elementRef.current.contains(e.target as Node))
				handler();
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("touchstart", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("touchstart", handleClickOutside);
		};
	}, [state, elementRef, handler]);
}
