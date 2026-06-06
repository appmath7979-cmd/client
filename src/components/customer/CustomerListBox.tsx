import { Link } from "@tanstack/react-router";
import type { ICustomer } from "#/types/customer.type";
import { Button } from "../ui/button";
import { CustomerListItem } from "./CustomerListItem";
import { PlusIcon } from "@phosphor-icons/react";

export function CustomerListBox({
	label,
	item,
}: {
	label: string;
	item: ICustomer[] | undefined;
}) {
	return (
		<div className="customer-layout h-[calc(100%/2-40px)]">
			<h2 className="font-semibold uppercase">{label}</h2>
			<ul className="h-full overflow-y-auto">
				{!item || item.length === 0 ? (
					<li className="flex flex-col justify-center items-center gap-2 size-full">
						<p className="font-semibold text-muted-foreground">
							Không có khách hàng nào!
						</p>
						<Button asChild>
							<Link to="/create-customer">
								<PlusIcon />
								<span>Thêm khách hàng ngay</span>
							</Link>
						</Button>
					</li>
				) : (
					item.map((dt) => (
						<li
							key={dt.id}
							className="flex justify-between items-center w-full"
						>
							<CustomerListItem customerId={dt.id} name={dt.fullName} />
						</li>
					))
				)}
			</ul>
		</div>
	);
}
