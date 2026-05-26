import { WrenchIcon } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="h-[calc(100dvh-60px)] grid place-items-center gap-y-1">
      <div className="flex flex-col items-center gap-y-1">
        <WrenchIcon size={60} className="text-gray-400" />
        <h2 className="font-bold text-xl tracking-wide text-primary">
          Đang bảo trì. Vui lòng quay lại sau!
        </h2>
      </div>
    </div>
  );
}
