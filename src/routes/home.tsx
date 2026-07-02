import { Button } from "#/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { Edit2Icon } from "lucide-react";

export const Route = createFileRoute("/home")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="py-4">
			<div>
				<Button variant={"outline"}>
					<Edit2Icon />
					<span>Cập nhật kết quả</span>
				</Button>
        
			</div>
		</div>
	);
}
