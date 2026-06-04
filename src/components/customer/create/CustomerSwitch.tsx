import { useMemo } from "react";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";

const swichSelections = {
	loaiCo: "Loại cò",
	xienMB: "Xiên 2-3-4 Miền BắcB",
	tinhUi: "Tính Ủi",
};

export default function CustomerSwitch({
	item,
	value,
	onChange,
}: {
	item: keyof typeof swichSelections;
	value: string | boolean;
	onChange: (value: string | boolean) => void;
}) {
	const selections =
		item === "loaiCo"
			? ["ti_le", "thanh_tien"]
			: item === "tinhUi"
				? ["Cho phép", "Không"]
				: ["Cho phép", "Không"];

	const handleChange = (select: string | boolean) => {
		if (item === "loaiCo" && typeof value === "string") onChange(select);
		else {
			if (!value && select === "Cho phép") onChange(true);
			if (value && select === "Không") onChange(false);
		}
	};

	const currentValue = useMemo(() => {
		if (item === "loaiCo") return String(value);
		else return value ? "Cho phép" : "Không";
	}, [item, value]);

	return (
		<div className="space-y-2">
			<p className="font-semibold">{swichSelections[item]}</p>
			<RadioGroup
				defaultValue={item === "loaiCo" ? "ti_le" : "Không"}
				value={currentValue}
				onValueChange={(val) => handleChange(val)}
				className="flex items-center gap-8"
			>
				{selections.map((selection, index) => (
					<div key={item + selection} className="flex items-center gap-2">
						<RadioGroupItem
							value={selections[index]}
							id={item + selections[index]}
							onChange={() => handleChange(selections[index])}
						/>
						<Label htmlFor={item + selections[index]}>
							{selection === "ti_le"
								? "Tỉ lệ"
								: selection === "thanh_tien"
									? "Thành tiền"
									: selection}
						</Label>
					</div>
				))}
			</RadioGroup>
		</div>
	);
}
