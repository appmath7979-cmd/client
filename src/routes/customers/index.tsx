import { createFileRoute, Link } from "@tanstack/react-router";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { CustomerTable } from "#/components/customer/CustomerTable";
import { Button } from "#/components/ui/button";
import { Tabs, TabsList, TabsPanel, TabsTab } from "#/components/ui/tabs";
import { useGetCustomer } from "#/hooks/query/use-customer-query";
import { cn } from "#/lib/utils";
import type { SelectCustomerType } from "#/types/customer.type";

export const Route = createFileRoute("/customers/")({
	staticData: { title: "Khách hàng" },
	component: RouteComponent,
});

function RouteComponent() {
	const { data } = useGetCustomer();
	const [toggleTab, setToggleTab] = useState<boolean>(false);
	const [selectAll, setSelectAll] = useState<SelectCustomerType>({
		chu: [],
		khach: [],
	});

	return (
		<div className="py-4 space-y-6">
			<div className="flex justify-end items-center gap-2">
				<Button
					variant={"outline"}
					disabled={selectAll.chu.length === 0 && selectAll.khach.length === 0}
				>
					<Trash2Icon />
					<span>Xóa tất cả</span>
				</Button>
				<Button render={<Link to="/customers/create" />}>
					<PlusIcon />
					<span>Thêm khách hàng</span>
				</Button>
			</div>
			<Tabs defaultValue={"khach"}>
				<div className="border-b">
					<TabsList variant="underline" className="w-full">
						<TabsTab
							value="khach"
							onClick={() => setToggleTab(false)}
							className={cn(
								"w-1/2 font-semibold",
								!toggleTab && "text-primary!",
							)}
						>
							Khách
						</TabsTab>
						<TabsTab
							value="chu"
							onClick={() => setToggleTab(true)}
							className={cn(
								"w-1/2 font-semibold",
								toggleTab && "text-primary!",
							)}
						>
							Chủ
						</TabsTab>
					</TabsList>
				</div>
				<TabsPanel value={"khach"}>
					<CustomerTable
						selectAll={selectAll}
						data={data?.customers || undefined}
						type="khach"
						onSelectAll={setSelectAll}
					/>
				</TabsPanel>
				<TabsPanel value={"chu"}>
					<CustomerTable
						selectAll={selectAll}
						data={data?.customers || undefined}
						type="chu"
						onSelectAll={setSelectAll}
					/>
				</TabsPanel>
			</Tabs>
		</div>
	);
}
