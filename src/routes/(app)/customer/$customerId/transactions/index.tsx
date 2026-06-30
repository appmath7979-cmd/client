import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/(app)/customer/$customerId/transactions/",
)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="py-4">
			Hello "/(app)/customer/$customerId/transactions/"!
		</div>
	);
}
