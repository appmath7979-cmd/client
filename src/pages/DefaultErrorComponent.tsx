import { GlobeXIcon } from "@phosphor-icons/react";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";

export function DefaultErrorComponent({ error, reset }: ErrorComponentProps) {
	return (
		<div className="full-height--header grid place-items-center">
			<div className="max-w-md w-full flex flex-col items-center text-center space-y-6">
				<div className="p-4 bg-destructive/10 rounded-full text-destructive dark:bg-destructive/20 animate-bounce animation-duration-[3s]">
					<GlobeXIcon size={48} weight="duotone" />
				</div>
				<div className="space-y-2">
					<h1 className="font-bold text-xl md:text-2xl tracking-tight text-foreground text-balance">
						Có lỗi xảy ra đột ngột
					</h1>
					<p className="text-sm md:text-base text-muted-foreground text-balance">
						{error?.message ||
							"Kết nối của bạn bị gián đoạn hoặc hệ thống đang quá tải. Vui lòng thử lại!"}
					</p>
				</div>
				<div className="flex items-center gap-4">
					<Button
						onClick={() => reset()}
						size="lg"
						variant="outline"
						className="w-full sm:w-fit px-6 hover:scale-[1.02] transition-transform active:scale-[0.98]"
					>
						Thử lại
					</Button>
					<Button onClick={() => window.location.reload()} className="w-fit">
						Tải lại trang
					</Button>
				</div>
			</div>
		</div>
	);
}
