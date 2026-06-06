import { EditIcon } from "lucide-react";
import { CopyIcon, DotsThreeOutlineVerticalIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { TrashIcon } from "@phosphor-icons/react/dist/ssr";

export function CustomerListItem({
	name,
	customerId,
}: {
	name: string;
	customerId: string;
}) {
	return (
		<>
			<Button
				asChild
				variant={"ghost"}
				size={"lg"}
				className="w-[calc(100%-40px)] justify-start"
			>
				<Link to={"/customer/$customerId"} params={{ customerId }}>
					{name}
				</Link>
			</Button>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<DotsThreeOutlineVerticalIcon weight="fill" />
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>
						<span>Sửa</span>
						<EditIcon />
					</DropdownMenuItem>
					<DropdownMenuItem>
						<span>Copy</span>
						<CopyIcon weight="bold" />
					</DropdownMenuItem>
					<DropdownMenuItem>
						<span>Xóa</span>
						<TrashIcon weight="bold" />
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
