import { Button } from "#/components/ui/button";
import { DotsThreeOutlineVerticalIcon, PlusIcon } from "@phosphor-icons/react";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/customer")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="py-6 space-y-8">
			<div className="flex justify-end items-center gap-2">
				<Button variant={"outline"} asChild>
					<Link to="/create-customer">
						<PlusIcon />
						<span>Thêm khách hàng</span>
					</Link>
				</Button>
			</div>
			<div className="customer-layout">
				<h2>Khách</h2>
				<ul>
					<li className="flex justify-between items-center w-full">
						<Button
							asChild
							variant={"ghost"}
							size={"lg"}
							className="w-[calc(100%-40px)] justify-start"
						>
							<Link>Khách hàng 1</Link>
						</Button>
						<Button variant={"ghost"} size={"icon"}>
							<DotsThreeOutlineVerticalIcon weight="fill" />
						</Button>
					</li>
				</ul>
			</div>
			<div className="customer-layout">
				<h2>Chủ</h2>
				<ul>
					<li>Khách hàng 1</li>
				</ul>
			</div>
		</div>
	);
}
