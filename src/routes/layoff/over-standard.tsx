import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/layoff/over-standard")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/layoff/over-standard"!</div>;
}
