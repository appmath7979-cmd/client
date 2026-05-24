import { LotteryTable } from "#/components/home/LotteryTable";
import type { RegionType } from "#/types/region.type";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/home")({
  component: RouteComponent,
});

function RouteComponent() {
  const regions: RegionType[] = ["mien-bac", "mien-nam", "mien-trung"];
  return (
    <div>
      {regions.map((r) => (
        <LotteryTable key={r} />
      ))}
    </div>
  );
}
