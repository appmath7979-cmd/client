import type { OrderItemApiType } from "#/types/apis/message.type";
import { LayoffItem } from "./LayoffItem";

export function LayoffList({ data }: { data: OrderItemApiType[] }) {
	return (
		<ul className="space-y-4">
			{data.length > 0 ? (
				data.map((item, index) => (
					<LayoffItem key={item.id} index={index + 1} item={item} />
				))
			) : (
				<li className="text-sm text-muted-foreground">
					Chưa có tin cân bằng nào.
				</li>
			)}
		</ul>
	);
}
