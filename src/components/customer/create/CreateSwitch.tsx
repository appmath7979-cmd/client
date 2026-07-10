import { Label } from "#/components/ui/label";
import { Switch } from "#/components/ui/switch";
import type { ICreateTypeSettingBet } from "#/types/customer.type";

interface CreateSwitchProps {
	value: "tile" | "thanhtien";
	onValueChange: (val: "tile" | "thanhtien") => void;
}

export function CreateSwitch({ value, onValueChange }: CreateSwitchProps) {
	const createTypeBet: ICreateTypeSettingBet = {
		tile: { value: "tile", label: "Tỉ lệ" },
		thanhtien: { value: "thanhtien", label: "Thành tiền" },
	};

	const handleSwitch = () => {
		if (value === "tile") onValueChange("thanhtien");
		else onValueChange("tile");
	};

	return (
		<Label onClick={handleSwitch}>
			<Switch defaultChecked />
			{createTypeBet[value].label}
		</Label>
	);
}
