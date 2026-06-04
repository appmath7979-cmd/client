import { CustomerListBox } from "#/components/customer/CustomerListBox";
import { Button } from "#/components/ui/button";
import { PlusIcon } from "@phosphor-icons/react";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/customer/")({
	staticData: {title: "Danh sách khách hàng"},
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="py-6">
			<div className="flex justify-end items-center gap-2">
				<Button variant={"outline"} asChild>
					<Link to="/create-customer">
						<PlusIcon />
						<span>Thêm khách hàng</span>
					</Link>
				</Button>
			</div>
			<div className="h-[calc(100dvh-160px)] mt-4 space-y-10">
				<CustomerListBox label="Khách" />
				<CustomerListBox label="Chủ" />
			</div>
		</div>
	);
}
