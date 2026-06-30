import type { ISummaryItem } from "#/lib/transaction";
import { cn } from "#/lib/utils";
import { TransactionItem } from "./TransactionItem";

interface TransactionBoxProps {
	name: string;
	className?: string;
	transactions: ISummaryItem[];
}

export function TransactionBox({
	transactions,
	name,
	className,
}: TransactionBoxProps) {
	return (
		<div className={cn("w-1/3 [&_p]:even:bg-muted/40", className)}>
			{transactions?.map(([syntax, score], index) => {
				const key = `${name}-${syntax}-${score}-${index}`;
				return <TransactionItem key={key} syntax={syntax} score={score} />;
			})}
		</div>
	);
}
