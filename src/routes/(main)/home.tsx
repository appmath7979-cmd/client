import { Calendar } from "#/components/ui/Calendar";
import { LotteryBox } from "#/components/home/LotteryBox";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(main)/home")({
  staticData: { title: "Trang chủ" },
  component: RouteComponent,
});

function RouteComponent() {
  const time = new Date().getHours();
  return (
    <div className="space-y-4">
      <div className="w-fit ms-auto py-2">
        <Calendar sideX="right" />
      </div>
      <p>{time}</p>
      <LotteryBox region="mien-nam" />
    </div>
  );
}
