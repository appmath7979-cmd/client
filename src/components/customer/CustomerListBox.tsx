import { CustomerListItem } from "./CustomerListItem";

export function CustomerListBox({ label }: { label: string }) {
	return (
		<div className="customer-layout h-[calc(100%/2-40px)]">
			<h2 className="font-semibold uppercase">{label}</h2>
			<ul className="overflow-y-auto">
				<li className="flex justify-between items-center w-full">
					<CustomerListItem />
				</li>
			</ul>
		</div>
	);
}
