import { createFileRoute, Link } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { DatePicker } from "#/components/system/DatePicker";
import { DropdownRegion } from "#/components/system/dropdowns/DropdownRegion";
import { Button } from "#/components/ui/button";
import { useCustomerQuery } from "#/hooks/query/use-customer-query";
import { useDatePicker } from "#/hooks/use-date-picker";
import { useOrderQuery } from "#/hooks/query/use-order-query";
import { formatDate } from "#/lib/date-format";

export const Route = createFileRoute("/customers/$customerId/")({
	loader: ({ params, context }) =>
		context.queryClient.fetchQuery(useCustomerQuery.getById(params.customerId)),
	component: RouteComponent,
});

function RouteComponent() {
	const { date, handleSelect, open, setOpen } = useDatePicker();
	const { customer } = Route.useLoaderData();
	const { data } = useOrderQuery.getByDate(formatDate(date));
	console.log(data?.orders);
	return (
		<div className="py-4">
			<div className="flex justify-between items-center">
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
								params={{ customerId: "1" }}
							/>
						}
					>
						<PlusIcon />
						<span>Thêm lệnh mới</span>
					</Button>
				</div>
			</div>
		</div>
	);
}
