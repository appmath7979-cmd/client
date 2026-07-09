import { useAppStore } from "@lavaz/store";
import {
	Select,
	SelectItem,
	SelectPopup,
	SelectTrigger,
} from "#/components/ui/select";
import { regionDropdownList } from "#/constants/regions.constant";
import { store } from "#/store/store";

export function DropdownRegion() {
	const [defaultRegion, { setRegion }] = useAppStore(
		store.region,
		(s) => s.default,
	);
	const [region] = useAppStore(store.region, (s) => s.region);

	return (
		<Select
			aria-label="Select Region"
			defaultValue={defaultRegion}
			items={regionDropdownList}
		>
			<SelectTrigger className={"w-fit"}>
				{regionDropdownList.find((item) => item.value === region)?.label}
			</SelectTrigger>
			<SelectPopup>
				{regionDropdownList.map((item) => (
					<SelectItem
						key={`${item.value}-dropdown`}
						value={item}
						onClick={() => setRegion(item.value)}
					>
						{item.label}
					</SelectItem>
				))}
			</SelectPopup>
		</Select>
	);
}
