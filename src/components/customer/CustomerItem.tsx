import {
	CopyIcon,
	DotsThreeVerticalIcon,
	NotePencilIcon,
	TrashIcon,
} from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import type { ICustomerListInfoApi } from "#/types/customer.type";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { DialogTrigger } from "../ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function CustomerItem({
	customer,
	isCheck,
	onSelectCustomer,
	onSelect,
}: {
	customer: ICustomerListInfoApi;
	isCheck: boolean;
	onSelectCustomer: (id: string) => void;
	onSelect: (id: string) => void;
}) {
	const { id, fullName } = customer;

	return (
		<>
			<div className="flex items-center gap-4 w-full">
				<Checkbox checked={isCheck} onClick={() => onSelectCustomer(id)} />
				<Link
					to="/customer/$customerId"
					params={{ customerId: id }}
					className="font-semibold w-full"
				>
					{fullName}
				</Link>
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant={"ghost"} size={"icon"}>
						<DotsThreeVerticalIcon />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>
						<CopyIcon />
						<span>Sao chép</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<NotePencilIcon />
						<span>Sửa</span>
					</DropdownMenuItem>
					<DialogTrigger asChild>
						<DropdownMenuItem onClick={() => onSelect(customer.id)}>
							<TrashIcon />
							<span>Xóa</span>
						</DropdownMenuItem>
					</DialogTrigger>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
