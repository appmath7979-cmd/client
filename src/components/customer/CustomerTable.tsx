import { Checkbox } from "#/components/ui/checkbox";
import {
	Table,
	TableBody,
	TableCell,
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
	const selectedList = selectAll[type];
	const isGuest = type === "khach";

	const handleSelectMultiple = (id: string) => {
		const isExisting = selectedList.includes(id);
		const newValues = isExisting
			? selectedList.filter((item) => item !== id)
			: [...selectedList, id];

		onSelectAll({
			...selectAll,
			khach: isGuest ? newValues : selectAll.khach,
			chu: !isGuest ? newValues : selectAll.chu,
		});
	};

	const handleSelectAll = () => {
		if (list.length === 0) return;

		// Nếu đã chọn tất cả thì bỏ chọn, ngược lại thì chọn tất cả danh sách hiện tại
		const isAllSelected = selectedList.length === list.length;
		const newValues = isAllSelected ? [] : list.map((item) => item.id);

		onSelectAll({
			...selectAll,
			khach: isGuest ? newValues : selectAll.khach,
			chu: !isGuest ? newValues : selectAll.chu,
		});
	};

	const isAllSelected = list.length > 0 && selectedList.length === list.length;
	const isIndeterminate =
		selectedList.length > 0 && selectedList.length < list.length;

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-12">
						<Checkbox
							aria-label="Select all rows"
							checked={isAllSelected || isIndeterminate}
							onCheckedChange={handleSelectAll}
							disabled={list.length === 0}
						/>
					</TableHead>
					<TableHead>Tên khách hàng</TableHead>
					<TableHead className="w-40 text-center">Hành động</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{list.length > 0 ? (
					list.map((customer) => (
						<CustomerTableItem
							key={customer.id}
							checked={selectedList.includes(customer.id)}
							item={customer}
							onSelectMultiple={handleSelectMultiple}
						/>
					))
				) : (
					<TableRow>
						<TableCell
							colSpan={3}
							className="h-24 text-center text-muted-foreground"
						>
							Không có dữ liệu khách hàng.
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};
