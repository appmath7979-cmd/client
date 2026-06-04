import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/customer/layout")({
	staticData: { title: "Khách hàng" },
	component: RouteComponent,
});

function RouteComponent() {
	return <Outlet />;
}
