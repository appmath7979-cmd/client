import { Link } from "@tanstack/react-router";
import { memo } from "react";
import { Checkbox } from "#/components/ui/checkbox";
import { TableCell, TableRow } from "#/components/ui/table";
import type { ICustomerListItemApi } from "#/types/apis/customer.type";
import { CustomerActions } from "./CustomerActions";

interface CustomerTableItemProps {
	item: ICustomerListItemApi;
	checked: boolean;
	onSelectMultiple: (id: string) => void;
}

export const CustomerTableItem = memo(
	({ item, checked, onSelectMultiple }: CustomerTableItemProps) => {
		const { id, fullName } = item;
		return (
			<TableRow>
				<TableCell>
					<Checkbox checked={checked} onClick={() => onSelectMultiple(id)} />
				</TableCell>
				<TableCell>
					<Link
						to="/customers/$customerId"
						params={{ customerId: id }}
						className="w-full flex items-center"
					>
						{fullName}
					</Link>
				</TableCell>
				<TableCell className="w-40 space-x-2 text-center">
					<CustomerActions id={id} />
				</TableCell>
			</TableRow>
		);
	},
);
