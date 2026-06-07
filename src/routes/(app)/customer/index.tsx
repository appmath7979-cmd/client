import { PlusIcon } from "@phosphor-icons/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CustomerListBox } from "#/components/customer/CustomerListBox";
import { Button } from "#/components/ui/button";
import { useGetCustomer } from "#/hooks/query/useCustomerQuery";

export const Route = createFileRoute("/(app)/customer/")({
	staticData: { title: "Danh sách khách hàng" },
	component: RouteComponent,
});

function RouteComponent() {
	const { data } = useGetCustomer("749b56f7-d81b-46e1-8dbc-618e295f5855");

	const customerOwner = data
		? data.customers?.filter((item) => item.type === "OWNER")
		: [];
	const customerGuest = data
		? data.customers?.filter((item) => item.type === "GUEST")
		: [];

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
				<CustomerListBox label="Khách" item={customerGuest || undefined} />
				<CustomerListBox label="Chủ" item={customerOwner || undefined} />
			</div>
		</div>
	);
}
