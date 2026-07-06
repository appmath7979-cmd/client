import { Link } from "@tanstack/react-router";
import { CustomerActions } from "#/components/customer/item/CustomerActions";
import { Badge } from "#/components/ui/badge";
import { Checkbox } from "#/components/ui/checkbox";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "#/components/ui/table";

export function CustomerTable() {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>
						<Checkbox aria-label="Select row" />
					</TableHead>
					<TableHead>Tên khách hàng</TableHead>
					<TableHead className="w-30">Trạng thái</TableHead>
					<TableHead className="text-right">Hành động</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell>
						<Checkbox />
					</TableCell>
					<TableCell>
						<Link
							to="/customers/$customerId"
							params={{ customerId: "1" }}
							className="w-full flex items-center"
						>
							Tên khách hàng
						</Link>
					</TableCell>
					<TableCell>
						<Badge variant={"success"}>Trạng thái</Badge>
					</TableCell>
					<TableCell className="space-x-2 text-right">
						<CustomerActions id={"id"} />
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
}
