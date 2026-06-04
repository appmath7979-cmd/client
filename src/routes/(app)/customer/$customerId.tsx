import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/customer/$customerId")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Outlet />;
}
