import { useAppStore } from "@lavaz/store";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { CustomerMessageList } from "#/components/customer/item/CustomerMessageList";
import { DetailList } from "#/components/customer/item/detail/DetailList";
import { DatePicker } from "#/components/system/DatePicker";
import { DropdownRegion } from "#/components/system/dropdowns/DropdownRegion";
import { Button } from "#/components/ui/button";
import { useCustomerQuery } from "#/hooks/query/use-customer-query";
import { useOrderQuery } from "#/hooks/query/use-order-query";
import { useDatePicker } from "#/hooks/use-date-picker";
import { formatDate } from "#/lib/date-format";
import { store } from "#/store/store";
import { useScroll } from "#/hooks/use-scroll";
import { cn } from "#/lib/utils";

export const Route = createFileRoute("/customers/$customerId/")({
	loader: ({ params, context }) =>
		context.queryClient.fetchQuery(useCustomerQuery.getById(params.customerId)),
	component: RouteComponent,
});

function RouteComponent() {
	const { customerId } = useParams({ from: "/customers/$customerId/" });
	const [region] = useAppStore(store.region, (s) => s.region);
	const { date, handleSelect, open, setOpen } = useDatePicker();
	const { customer } = Route.useLoaderData();
	const dateFormatted = formatDate(date);
	const { data } = useOrderQuery.getByDateWithCustomerId(
		customerId,
		dateFormatted,
	);
	const orders = data?.orders;

	const { isScrolling } = useScroll();

	return (
		<div className="py-4 space-y-6 relative">
			<div
				className={cn(
					"flex justify-between items-center sticky top-16 z-999",
					isScrolling && "bg-background/50 backdrop-blur-sm py-4",
				)}
			>
				<p>{customer.fullName}</p>
				<div className="flex items-center gap-2">
					<DropdownRegion />
					<DatePicker
						date={date}
						onOpenChange={setOpen}
						onSelect={handleSelect}
						open={open}
					/>
					<Button
						render={
							<Link
								to="/customers/$customerId/message"
								params={{ customerId: customer.id }}
							/>
						}
					>
						<PlusIcon />
						<span>Thêm lệnh mới</span>
					</Button>
				</div>
			</div>
			<div
				className={cn(
					"border rounded-md shadow-xs overflow-hidden sticky top-30 z-999",
					isScrolling && "bg-background"
				)}
			>
				<div className="flex items-center [&_p]:w-1/3 [&_p]:py-1 [&>*:not(:first-child)]:border-l text-center bg-muted text-muted-foreground uppercase font-semibold">
					<p>Cú pháp</p>
					<p>Xác</p>
					<p>Cò</p>
					<p>Trúng</p>
				</div>
				<CustomerMessageList data={orders} region={region} />
			</div>
			<div className="space-y-4">
				<h3 className="font-semibold">Chi tiết</h3>
				<DetailList data={orders} region={region} customerId={customerId} />
			</div>
		</div>
	);
}
