import { PlusIcon } from "@phosphor-icons/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CustomerBox } from "#/components/customer/CustomerBox";
import { Button } from "#/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { useGetCustomers } from "#/hooks/query/useCustomerQuery";

export const Route = createFileRoute("/(app)/customer/")({
	staticData: { title: "Danh sách khách hàng" },
	component: RouteComponent,
});

function RouteComponent() {
	const { data, isError } = useGetCustomers(
		"749b56f7-d81b-46e1-8dbc-618e295f5855",
	);

	if (isError) return;

	const guest = data?.customers.filter((item) => item.type === "GUEST");
	const owner = data?.customers.filter((item) => item.type === "OWNER");

	return (
		<div className="py-6">
			<div className="flex justify-end items-center gap-2">
				<Button asChild>
					<Link to="/create-customer">
						<PlusIcon />
						<span>Thêm khách hàng</span>
					</Link>
				</Button>
			</div>
			<div className="h-[calc(100dvh-160px)] mt-4 space-y-10">
				<Tabs defaultValue="guest">
					<TabsList className="ms-auto">
						<TabsTrigger value="guest">Khách</TabsTrigger>
						<TabsTrigger value="owner">Chủ</TabsTrigger>
					</TabsList>
					<TabsContent value="guest">
						<CustomerBox customers={guest} />
					</TabsContent>
					<TabsContent value="owner">
						<CustomerBox customers={owner} />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
