import { ChevronLeft } from "lucide-react";
import { Tooltip, TooltipPopup, TooltipTrigger } from "#/components/ui/tooltip";
import { Button } from "../ui/button";

export function BackBtn() {
	return (
		<Tooltip>
			<TooltipTrigger
				render={
					<Button
						variant={"outline"}
						size={"icon-sm"}
						onClick={() => window.history.back()}
					/>
				}
			>
				<ChevronLeft />
			</TooltipTrigger>
			<TooltipPopup>Quay lại</TooltipPopup>
		</Tooltip>
	);
}
