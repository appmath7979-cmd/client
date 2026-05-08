import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(main)/customer")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(main)/customer"!</div>;
}
