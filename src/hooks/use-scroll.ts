import { useEffect, useState } from "react";

export function useScroll(threshold: number = 20) {
	const [isScrolling, setIsScrolling] = useState<boolean>(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > threshold) setIsScrolling(true);
			else setIsScrolling(false);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [threshold]);

	return { isScrolling };
}
