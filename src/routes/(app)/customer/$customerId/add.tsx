import { createFileRoute } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import { Textarea } from "#/components/ui/textarea";

export const Route = createFileRoute("/(app)/customer/$customerId/add")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="py-4 space-y-8">
			<div className="flex items-center rounded-lg overflow-hidden border *:w-1/3 *:outline-0 *:border-0 *:rounded-none *:uppercase">
				<Button variant={"outline"} size={"lg"}>
					lọc tin
				</Button>
				<Button variant={"outline"} size={"lg"}>
					kiểm tra
				</Button>
				<Button variant={"outline"} size={"lg"}>
					lưu
				</Button>
			</div>
			<div className="rounded-lg p-4 bg-secondary space-y-4">
				<p className="font-semibold uppercase">tin nhắn</p>
				<Textarea className="h-40 bg-background resize-none" />
			</div>
		</div>
	);
}
