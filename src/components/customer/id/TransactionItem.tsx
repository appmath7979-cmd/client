export function TransactionItem({
	syntax,
	score,
}: {
	syntax: string;
	score: number;
}) {
	return (
		<p className="flex items-center justify-between p-2">
			<span>{syntax}</span>
			<span>{score}</span>
		</p>
	);
}
