import { SyntaxItem } from "./SyntaxItem";

export function SyntaxList({
	chunks,
	onEdit,
}: {
	chunks: Array<string[]>;
	onEdit: (newValueChunk: string[], index: number) => void;
}) {
	return (
		<ul className="grid md:grid-cols-2 gap-4">
			{chunks.map((chunk, index) => {
				const key = `${chunk}-${index}`;
				return (
					<li key={key}>
						<SyntaxItem
							chunk={chunk}
							onEdit={(newVal) => onEdit(newVal, index)}
						/>
					</li>
				);
			})}
		</ul>
	);
}
