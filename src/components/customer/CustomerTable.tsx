import { Checkbox } from "#/components/ui/checkbox";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "#/components/ui/table";
import type { ICustomerListItemApi } from "#/types/apis/customer.type";
import type { CustomerType, SelectCustomerType } from "#/types/customer.type";
import { CustomerTableItem } from "./item/CustomerTableItem";

interface CustomerTableProp {
	data: ICustomerListItemApi[] | undefined;
	type: CustomerType;
	selectAll: SelectCustomerType;
	onSelectAll: (value: SelectCustomerType) => void;
}

export const CustomerTable = ({
	data,
	type,
	selectAll,
	onSelectAll,
}: CustomerTableProp) => {
	const list =
		data?.filter((item) => (item.type as CustomerType) === type) || [];

	const handleSelectMultiple = (id: string) => {
		const isExisting = selectAll[type].find((select) => select === id);
		const isGuest = type === "khach";
		let newValues: string[] = [];

		if (isExisting) newValues = selectAll[type].filter((item) => item !== id);
		else newValues = [...selectAll[type], id];

		onSelectAll({
			...selectAll,
			khach: isGuest ? newValues : selectAll.khach,
			chu: !isGuest ? newValues : selectAll.chu,
		});
	};

	const handleSelectAll = () => {
		if (!data || list.length === 0) return;
		let newValues: string[] = [];
		const isGuest = type === "khach";

		if (list.length > selectAll[type].length)
			newValues = list.map((item) => item.id);

		onSelectAll({
			...selectAll,
			khach: isGuest ? newValues : selectAll.khach,
			chu: !isGuest ? newValues : selectAll.chu,
		});
	};

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>
						<Checkbox
							aria-label="Select row"
							onClick={handleSelectAll}
							disabled={!data || list.length === 0}
							checked={
								selectAll[type].length === list.length && list.length > 0
							}
						/>
					</TableHead>
					<TableHead>Tên khách hàng</TableHead>
					<TableHead className="w-40 text-center">Hành động</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{list.length > 0
					? list.map((customer) => {
							const { id } = customer;
							return (
								<CustomerTableItem
									key={id}
									checked={selectAll[type].includes(id)}
									item={customer}
									onSelectMultiple={handleSelectMultiple}
								/>
							);
						})
					: ""}
			</TableBody>
		</Table>
	);
};
