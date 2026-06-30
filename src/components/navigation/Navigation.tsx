import {
	ChartLineUpIcon,
	HouseIcon,
	RobotIcon,
	ScalesIcon,
	SquaresFourIcon,
	UserCircleIcon,
	UsersThreeIcon,
} from "@phosphor-icons/react";
import { Link, useMatches } from "@tanstack/react-router";
import { useState } from "react";
import { cn } from "#/lib/utils";
import { Button } from "../ui/button";

export default function Navigation() {
	const match = useMatches();

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const currentPathname = match[1]?.pathname?.replace(/\//g, "");

	return (
		<>
			<Button
				size={"icon-lg"}
				className={cn(
					"fixed -bottom-4 left-4 rounded-full size-15! [&_svg]:size-8! trans-smooth opacity-0 invisible",
					!isOpen && "bottom-4 opacity-100 visible",
				)}
				onClick={() => setIsOpen((prev) => !prev)}
			>
				<SquaresFourIcon weight="fill" />
			</Button>
			<nav
				className={cn(
					"fixed -bottom-4 left-1/2 opacity-0 invisible -translate-x-1/2 z-50 bg-primary text-primary-foreground rounded-lg trans-smooth",
					isOpen && "opacity-100 visible bottom-4",
				)}
			>
				<ul className="flex items-center">
					<li>
						<Button asChild className="flex-col gap-0.5 h-auto [&_svg]:size-8!">
							<Link to="/home">
								<HouseIcon
									weight={currentPathname === "home" ? "fill" : "bold"}
								/>
								<p>Trang chủ</p>
							</Link>
						</Button>
					</li>
					<li>
						<Button asChild className="flex-col gap-0.5 h-auto [&_svg]:size-8!">
							<Link to="/chatbot">
								<RobotIcon
									weight={currentPathname === "chatbot" ? "fill" : "bold"}
								/>
								<p>Chatbot</p>
							</Link>
						</Button>
					</li>
					<li>
						<Button asChild className="flex-col gap-0.5 h-auto [&_svg]:size-8!">
							<Link to="/customer">
								<UsersThreeIcon
									weight={currentPathname === "customer" ? "fill" : "bold"}
								/>
								<p>Khách hàng</p>
							</Link>
						</Button>
					</li>
					<li>
						<Button
							size={"icon-lg"}
							className="rounded-full size-15! [&_svg]:size-8!"
							onClick={() => setIsOpen((prev) => !prev)}
							asChild
						>
							<SquaresFourIcon weight="fill" />
						</Button>
					</li>
					<li>
						<Button asChild className="flex-col gap-0.5 h-auto [&_svg]:size-8!">
							<Link to="/scale">
								<ScalesIcon
									weight={currentPathname === "scale" ? "fill" : "bold"}
								/>
								<p>Cân hàng</p>
							</Link>
						</Button>
					</li>
					<li>
						<Button asChild className="flex-col gap-0.5 h-auto [&_svg]:size-8!">
							<Link to="/report">
								<ChartLineUpIcon
									weight={currentPathname === "report" ? "fill" : "bold"}
								/>
								<p>Báo cáo</p>
							</Link>
						</Button>
					</li>
					<li>
						<Button asChild className="flex-col gap-0.5 h-auto [&_svg]:size-8!">
							<Link to="/user">
								<UserCircleIcon />
								<p>Cá nhân</p>
							</Link>
						</Button>
					</li>
				</ul>
			</nav>
		</>
	);
}
