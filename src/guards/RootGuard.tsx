import { useAppStore } from "@lavaz/store";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { store } from "#/store/store";

export function RootGuard({ children }: { children: React.ReactNode }) {
	const _navigate = useNavigate();
	const location = useLocation();
	const _currentPath = location.pathname;

	const [{ isActive, isLock, isLoggedIn }] = useAppStore(store.lock, (s) => s);

	// useEffect(() => {
	// 	if (currentPath !== "/") {
	// 		if (isLock || !isActive) navigate({ to: "/" });
	// 	}

	// 	if (isActive && !isLock && !isLoggedIn) {
	// 		if (
	// 			currentPath !== "/" &&
	// 			currentPath !== "/sign-in" &&
	// 			currentPath !== "/sign-up"
	// 		)
	// 			navigate({ to: "/" });
	// 	}
	// }, [currentPath, isActive, isLock, isLoggedIn, navigate]);
	return <>{children}</>;
}
