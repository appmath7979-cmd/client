import { useAppStore } from "@lavaz/store";
import { PlusIcon } from "@phosphor-icons/react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "#/components/ui/table";
import { regionConstanst } from "#/constants/station.constanst";
import { store } from "#/store/store";
import { useGetCustomerById } from "#/hooks/query/useCustomerQuery";

export const Route = createFileRoute("/(app)/customer/$customerId/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { customerId } = useParams({ from: "/(app)/customer/$customerId/" });
	const { data } = useGetCustomerById(
		customerId,
		"1f42541d-fd97-4c09-8c75-b027fbf497f0",
	);

	const [{ regions, value }, { setValue }] = useAppStore(
		store.regionDropdown,
		(s) => s,
	);

	return (
		<div className="py-4">
			<div className="flex justify-between items-center">
				<p className="font-semibold text-lg">{data?.customer.fullName}</p>
				<div className="flex justify-end items-center gap-1">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant={"outline"}>{regionConstanst[value]}</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							{regions.map((region) => (
								<DropdownMenuItem key={region} onClick={() => setValue(region)}>
									{regionConstanst[region]}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
					<Button asChild>
						<Link to="/customer/$customerId/add" params={{ customerId }}>
							<PlusIcon />
							<span>Nhập lệnh mới</span>
						</Link>
					</Button>
				</div>
			</div>
			<div className="sticky top-0 mt-4 border rounded-lg shadow-md bg-accent">
				<Table>
					<TableHeader>
						<TableRow className="[&_th]:font-semibold [&_th]:text-muted-foreground text-lg uppercase *:text-center">
							<TableHead>Xác</TableHead>
							<TableHead className="border-x">qua cò</TableHead>
							<TableHead>trúng</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>
								<p className="flex justify-between items-center">
									<span>2cb</span>
									<span>113</span>
								</p>
								<p className="flex justify-between items-center">
									<span>2cb</span>
									<span>113</span>
								</p>
								<p className="flex justify-between items-center">
									<span>2cb</span>
									<span>113</span>
								</p>
							</TableCell>
							<TableCell className="border-x">
								<p className="flex justify-between items-center">
									<span>2cb</span>
									<span>113</span>
								</p>
								<p className="flex justify-between items-center">
									<span>2cb</span>
									<span>113</span>
								</p>
								<p className="flex justify-between items-center">
									<span>2cb</span>
									<span>113</span>
								</p>
							</TableCell>
							<TableCell>
								<p className="flex justify-between items-center">
									<span>2cb</span>
									<span>113</span>
								</p>
								<p className="flex justify-between items-center">
									<span>2cb</span>
									<span>113</span>
								</p>
								<p className="flex justify-between items-center">
									<span>2cb</span>
									<span>113</span>
								</p>
							</TableCell>
						</TableRow>
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell colSpan={3}>Thu: 900 x 100% = 900</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</div>

			<div className="mt-8 space-y-4">
				<h2 className="font-semibold text-lg uppercase">chi tiết</h2>

				<div className="border rounded-lg shadow-md bg-background">
					<Table className="">
						<TableHeader>
							<TableRow>
								<TableHead>1. 3d 44 b</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell>
									<div className="flex justify-between items-center">
										<p>2CB</p>
										<p>49</p>
									</div>
								</TableCell>
								<TableCell className="border-x">
									<div className="flex justify-between items-center">
										<p>2CB</p>
										<p>49</p>
									</div>
								</TableCell>
								<TableCell>
									<div className="flex justify-between items-center">
										<p>2CB</p>
										<p>49</p>
									</div>
								</TableCell>
							</TableRow>
						</TableBody>
						<TableFooter>
							<TableRow>
								<TableCell colSpan={3}>Thu: 756 x 100% = 756</TableCell>
							</TableRow>
						</TableFooter>
					</Table>
				</div>
			</div>
		</div>
	);
}
