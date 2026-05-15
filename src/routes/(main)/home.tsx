import { LotteryBox } from "#/components/home/LotteryBox";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(main)/home")({
  staticData: { title: "Trang chủ" },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <LotteryBox />
    </div>
  );
}
