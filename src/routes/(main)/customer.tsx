import { Button } from "#/components/ui/Button";
import { Tooltip } from "#/components/ui/Tooltip";
import { PlusIcon } from "@phosphor-icons/react";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/(main)/customer")({
  staticData: {
    title: "danh sách khách hàng",
    showBack: false,
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="py-2">
      <div className="rounded-md shadow-md bg-box text-box-foreground">
        <div className="flex justify-end items-center gap-4 p-1">
          <Tooltip content="Thêm khách hàng">
            <Link to="/create-customer">
              <Button variant="ghost" size="icon">
                <PlusIcon weight="bold" />
              </Button>
            </Link>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
