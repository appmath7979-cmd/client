import { cn } from "#/lib/utils";
import type { CustomerTypeDepartmentType } from "#/types/customer.type";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

export default function CustomerTypeToggle({
	value,
	onChange,
	options,
}: {
	value: CustomerTypeDepartmentType;
	options: Array<CustomerTypeDepartmentType>;
	onChange: (value: CustomerTypeDepartmentType) => void;
}) {
	return (
		<>
			{options.map((opt) => (
				<Label
					key={opt}
					className={cn(
						"w-1/2 rounded-md flex justify-center items-center p-4 border hover:bg-secondary/80 trans-smooth",
						opt === value && "border-primary text-primary bg-secondary",
					)}
				>
					<p className="font-semibold">{opt === "GUEST" ? "Khách" : "Chủ"}</p>
					<Input
						type="radio"
						hidden
						checked={value === opt}
						onChange={() => onChange(opt)}
					/>
				</Label>
			))}
		</>
	);
}
