import { useAppStore } from "@lavaz/store";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import { regionConstanst } from "#/constants/station.constanst";
import { store } from "#/store/store";
import { Button } from "../ui/button";

export function RegionDropdown() {
	const [{ regions, value }, { setValue }] = useAppStore(
		store.regionDropdown,
		(s) => s,
	);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={"outline"}>{regionConstanst[value]}</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{regions.map((region) => (
					<DropdownMenuItem key={region} onClick={() => setValue(region)}>
						{regionConstanst[region]}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
