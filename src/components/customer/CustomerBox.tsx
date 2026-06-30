import { PlusIcon, TrashIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";
import {
	useDeleteCustomer,
	useDeleteManyCustomer,
} from "#/hooks/query/useCustomerQuery";
import { cn } from "#/lib/utils";
import type { ICustomerListInfoApi } from "#/types/customer.type";
import { DialogDelete } from "../dialog/DialogDelete";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { DialogTrigger } from "../ui/dialog";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { CustomerItem } from "./CustomerItem";

export function CustomerBox({
	customers,
}: {
	customers: ICustomerListInfoApi[] | undefined;
}) {
	const [selectCustomers, setSelectCustomers] = useState<string[]>([]);
	const [selectOneCustomer, setSelectOneCustomer] = useState<string>("");

	const { mutate: onDeleteMany } = useDeleteManyCustomer();
	const { mutate: onDelete } = useDeleteCustomer();

	const handleSelectItems = useCallback(
		(id: string) => {
			const isExistingId = selectCustomers.includes(id);
			if (isExistingId) {
				const newArr = selectCustomers.filter((item) => item !== id);
				setSelectCustomers(newArr);
			} else {
				const newArr = [...selectCustomers, id];
				setSelectCustomers(newArr);
			}
		},
		[selectCustomers],
	);

	const handleSelectAll = () => {
		if (!customers) return;

		if (selectCustomers.length < customers.length)
			setSelectCustomers(customers.map((item) => item.id));
		else setSelectCustomers([]);
	};

	const handleDelete = useCallback(() => {
		if (selectCustomers.length === 0) {
			onDeleteMany(selectCustomers);
			setSelectCustomers([]);
		} else {
			onDelete(selectOneCustomer);
			setSelectOneCustomer("");
		}
	}, [selectCustomers, selectOneCustomer, onDeleteMany, onDelete]);

	const targets = useMemo(() => {
		const names = customers
			?.filter((customer) =>
				selectCustomers.find((item) => item === customer.id),
			)
			.map((item) => item.fullName);

		if (names && names.length > 0) return names.join(", ");
		else if (selectOneCustomer) {
			const name =
				customers?.find((item) => item.id === selectOneCustomer)?.fullName ??
				"";
			return name;
		}
	}, [selectCustomers, customers, selectOneCustomer]);

	return (
		<div className="p-4 border rounded-md space-y-2">
			<div
				className={cn(
					"p-2 flex items-center justify-between trans-smooth",
					!customers ||
						(customers.length === 0 && "opacity-50 pointer-events-none"),
				)}
			>
				<FieldGroup>
					<Field orientation="horizontal" className="gap-1">
						<Checkbox
							id="select-all"
							name="select-all"
							checked={
								customers && customers.length > 0
									? selectCustomers.length === customers.length
									: false
							}
							onClick={handleSelectAll}
						/>
						<FieldLabel htmlFor="select-all">Chọn tất cả</FieldLabel>
					</Field>
				</FieldGroup>

				<div className="flex items-center gap-3">
					<DialogTrigger asChild>
						<Button
							variant={"destructive"}
							disabled={selectCustomers.length === 0}
						>
							<TrashIcon />
							<span>Xóa khách hàng</span>
						</Button>
					</DialogTrigger>
				</div>
			</div>
			<ul className="border rounded-md ">
				{customers && customers.length > 0 ? (
					customers.map((customer) => (
						<li
							key={customer.id}
							className="px-2 py-0.5 flex justify-between items-center trans-smooth hover:bg-muted"
						>
							<CustomerItem
								customer={customer}
								isCheck={selectCustomers.includes(customer.id)}
								onSelectCustomer={handleSelectItems}
								onSelect={setSelectOneCustomer}
							/>
						</li>
					))
				) : (
					<li className="p-10 text-center space-y-2">
						<p>Chưa có khách hàng! Vui lòng thêm khách hàng mới.</p>
						<Button asChild>
							<Link to="/create-customer">
								<PlusIcon /> <span>Thêm khách hàng</span>
							</Link>
						</Button>
					</li>
				)}
			</ul>
			<DialogDelete
				title="Xóa khách hàng"
				desc="Xác nhận xóa một hoặc nhiều khách hàng"
				content="Khách hàng"
				action={handleDelete}
				target={targets}
			/>
		</div>
	);
}
