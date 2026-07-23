import type { OrderItemApiType } from "#/types/apis/message.type";
import { LayoffActions } from "./LayoffActions";

interface LayoffItemProps {
	item: OrderItemApiType;
	index: number;
}

export function LayoffItem({ item, index }: LayoffItemProps) {
	return (
		<li className="p-3 border rounded-md bg-muted/20 text-sm whitespace-pre-wrap space-y-1">
			<div className="flex justify-between items-center py-1">
				<p className="px-2 rounded-md border font-semibold text-sm">
					Tin {index}
				</p>
				<LayoffActions index={index} item={item} />
			</div>
			<p className="py-2 px-2 border rounded-md bg-muted text-muted-foreground">
				{item.message}
			</p>
		</li>
	);
}
