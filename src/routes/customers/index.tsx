import { createFileRoute, Link } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import { Checkbox } from "#/components/ui/checkbox";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "#/components/ui/table";
import { Tabs, TabsList, TabsPanel, TabsTab } from "#/components/ui/tabs";
import { cn } from "#/lib/utils";

export const Route = createFileRoute("/customers/")({
	component: RouteComponent,
});

function RouteComponent() {
	const [toggleTab, setToggleTab] = useState<boolean>(false);
	return (
		<div className="py-4 space-y-6">
			<div className="flex justify-end items-center">
				<Button render={<Link to="/customers/create" />}>
					<PlusIcon />
					<span>Thêm khách hàng</span>
				</Button>
			</div>
			<Tabs defaultValue={"khach"}>
				<div className="border-b">
					<TabsList variant="underline" className="w-full">
						<TabsTab
							value="khach"
							onClick={() => setToggleTab(false)}
							className={cn(
								"w-1/2 font-semibold",
								!toggleTab && "text-primary!",
							)}
						>
							Khách
						</TabsTab>
						<TabsTab
							value="chu"
							onClick={() => setToggleTab(true)}
							className={cn(
								"w-1/2 font-semibold",
								toggleTab && "text-primary!",
							)}
						>
							Chủ
						</TabsTab>
					</TabsList>
				</div>
				<TabsPanel value={"khach"}>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>
									<Checkbox aria-label="Select row" />
								</TableHead>
								<TableHead>Tên</TableHead>
								<TableHead>Trạng thái</TableHead>
								<TableHead>Hành động</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell>
									<Checkbox />
								</TableCell>
								<TableCell>
									<Checkbox />
								</TableCell>
								<TableCell>
									<Checkbox />
								</TableCell>
								<TableCell>
									<Checkbox />
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TabsPanel>
				<TabsPanel value={"chu"}>
					<div>Chủ</div>
				</TabsPanel>
			</Tabs>
		</div>
	);
}
