import { useLockBodyScroll } from "#/hooks/use-lock-body-scroll";
import { Spinner } from "../ui/spinner";

export default function Pending() {
	useLockBodyScroll();
	return (
		<div className="fixed inset-0 z-9999 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
			<div className="w-full max-w-md bg-background border shadow-lg p-10 rounded-xl flex flex-col items-center justify-center gap-6 animate-in fade-in zoom-in-95 duration-200">
				<Spinner className="h-8 w-8 text-primary" />

				<div className="text-center space-y-1">
					<p className="text-lg uppercase font-bold tracking-wider text-foreground animate-pulse">
						Đang xử lý...
					</p>
					<p className="text-sm font-medium text-muted-foreground">
						Xin vui lòng đợi trong giây lát
					</p>
				</div>
			</div>
		</div>
	);
}
