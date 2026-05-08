import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(main)/customer")({
  staticData: {
    title: "danh sách khách hàng",
    showBack: false,
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(main)/customer"!</div>;
}
