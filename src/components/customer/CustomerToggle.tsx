import type { CustomerCalcType } from "#/types/customer.type";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const toggleSelections = {
	tinhTrungDaT: "Tính trúng Đá thẳng",
	tinhTrungDaX: "Tính trúng Đá xiên",
};

const label = {
	"1_lan": "1 lần",
	ky_ruoi: "ky rưỡi",
	nhieu_cap: "nhiều cặp",
};

export function CustomerToggle({
	item,
	value,
	onChange,
}: {
	item: keyof typeof toggleSelections;
	value: CustomerCalcType;
	onChange: (value: CustomerCalcType) => void;
}) {
	const selections = ["1_lan", "ky_ruoi", "nhieu_cap"];
	return (
		<div className="space-y-2">
			<p className="font-semibold">{toggleSelections[item]}</p>
			<RadioGroup
				defaultValue="ky_ruoi"
				value={value}
				onValueChange={(val) => onChange(val as CustomerCalcType)}
        className="flex items-center gap-8"
			>
				{selections.map((select) => (
					<div key={select + item} className="flex items-center gap-2">
						<RadioGroupItem id={select + item} value={select} />
						<Label htmlFor={select + item}>
							{label[select as keyof typeof label]}
						</Label>
					</div>
				))}
			</RadioGroup>
		</div>
	);
}
