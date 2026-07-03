import { useState } from "react";
import { Field, FieldError, FieldLabel } from "#/components/ui/field";
import { Textarea } from "#/components/ui/textarea";
import type { IProvinceItem } from "#/types/province.type";

function chunkValue(value: string, chunkSize: number): string[] {
	if (chunkSize <= 0 || !value) return [];
	const regex = new RegExp(`.{1,${chunkSize}}`, "g");
	return value.match(regex) ?? [];
}

export function DialogRewardItem({ province }: { province: IProvinceItem }) {
	const [value, setValue] = useState<string>("");

	const handleFormat = (val: string) => {
		if (!val.trim()) return "";

		const text = val.trim().replaceAll("\t", " ").replaceAll("\n", " ");
		const arrVal = text.split(" ").filter((item) => /^\d+$/.test(item));
		let formattedVal: Array<string[]> = [];
		let formattedTxt: string = "";

		if (province.region === "MB") {
			formattedVal = arrVal.map((item, index) => {
				if (index === 0 || index === 1) return [item];
				if (index === 2 || index === 3) {
					const arr = chunkValue(item, 5);
					return arr;
				}
				if (index === 4 || index === 5) {
					const arr = chunkValue(item, 4);
					console.log(arr);
					return arr;
				}
				if (index === 6) {
					const arr = chunkValue(item, 4);
					return arr;
				}
				const arr = chunkValue(item, 2);
				return arr;
			});

			formattedTxt = formattedVal
				.map((item, index) => {
					console.log(item);
					if (index === 0) return `gdb: ${item.join(" ").trim()}`;
					else return `g${index}: ${item.join(" ").trim()}`;
				})
				.join("\n");

			return formattedTxt;
		}
	};

	const handleBlurOrPaste = (text: string) => {
		const formatted = handleFormat(text);
		if (formatted) {
			setValue(formatted);
		}
	};

	return (
		<Field className="w-full">
			<FieldLabel htmlFor={province.syntax}>{province.name}</FieldLabel>
			<Textarea
				id={province.syntax}
				placeholder="Nhập kết quả..."
				resize={false}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onBlur={(e) => handleBlurOrPaste(e.target.value)}
			/>
			<FieldError>This field is required.</FieldError>
		</Field>
	);
}
