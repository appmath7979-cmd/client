import { useAppStore } from "@lavaz/store";
import { useState } from "react";
import { Field, FieldError, FieldLabel } from "#/components/ui/field";
import { Textarea } from "#/components/ui/textarea";
import { store } from "#/store/store";
import type { IPostRewardItemApi } from "#/types/apis/reward.type";
import type { IProvinceItem } from "#/types/province.type";

function chunkValue(value: string, chunkSize: number): string[] {
	if (chunkSize <= 0 || !value) return [];
	const regex = new RegExp(`.{1,${chunkSize}}`, "g");
	return value.match(regex) ?? [];
}

export function DialogRewardItem({
	province,
	release,
}: {
	province: IProvinceItem;
	release: string;
}) {
	const [, { setReward }] = useAppStore(store.reward, (s) => s.values);
	const [value, setValue] = useState<string>("");

	const handleFormat = (val: string) => {
		if (!val.trim()) return null;

		const text = val.trim().replaceAll("\t", " ").replaceAll("\n", " ");
		const arrVal = text.split(" ").filter((item) => /^\d+$/.test(item));

		const payload: IPostRewardItemApi = {
			provinceCode: province.syntax,
			region: province.region,
			release,
			gdb: [],
			g1: [],
			g2: [],
			g3: [],
			g4: [],
			g5: [],
			g6: [],
			g7: [],
			g8: [],
		};

		let formattedTxt = "";

		if (province.region === "MB") {
			payload.gdb = arrVal[0] ? [arrVal[0]] : [];
			payload.g1 = arrVal[1] ? [arrVal[1]] : [];
			payload.g2 = arrVal[2] ? chunkValue(arrVal[2], 5) : [];
			payload.g3 = arrVal[3] ? chunkValue(arrVal[3], 5) : [];
			payload.g4 = arrVal[4] ? chunkValue(arrVal[4], 4) : [];
			payload.g5 = arrVal[5] ? chunkValue(arrVal[5], 4) : [];
			payload.g6 = arrVal[6] ? chunkValue(arrVal[6], 3) : [];
			payload.g7 = arrVal[7] ? chunkValue(arrVal[7], 2) : [];

			formattedTxt = [
				`gdb: ${payload.gdb.join(" ")}`,
				`g1: ${payload.g1.join(" ")}`,
				`g2: ${payload.g2.join(" ")}`,
				`g3: ${payload.g3.join(" ")}`,
				`g4: ${payload.g4.join(" ")}`,
				`g5: ${payload.g5.join(" ")}`,
				`g6: ${payload.g6.join(" ")}`,
				`g7: ${payload.g7.join(" ")}`,
			]
				.filter((line) => !line.endsWith(": "))
				.join("\n");
		} else {
			payload.g8 = arrVal[0] ? [arrVal[0]] : [];
			payload.g7 = arrVal[1] ? [arrVal[1]] : [];
			payload.g6 = arrVal[2] ? chunkValue(arrVal[2], 4) : [];
			payload.g5 = arrVal[3] ? [arrVal[3]] : [];
			payload.g4 = arrVal[4] ? chunkValue(arrVal[4], 5) : [];
			payload.g3 = arrVal[5] ? chunkValue(arrVal[5], 5) : [];
			payload.g2 = arrVal[6] ? [arrVal[6]] : [];
			payload.g1 = arrVal[7] ? [arrVal[7]] : [];
			payload.gdb = arrVal[8] ? [arrVal[8]] : [];

			formattedTxt = [
				`g8: ${payload.g8.join(" ")}`,
				`g7: ${payload.g7.join(" ")}`,
				`g6: ${payload.g6.join(" ")}`,
				`g5: ${payload.g5.join(" ")}`,
				`g4: ${payload.g4.join(" ")}`,
				`g3: ${payload.g3.join(" ")}`,
				`g2: ${payload.g2.join(" ")}`,
				`g1: ${payload.g1.join(" ")}`,
				`gdb: ${payload.gdb.join(" ")}`,
			]
				.filter((line) => !line.endsWith(": "))
				.join("\n");
		}

		return { formattedTxt, payload };
	};

	const handleBlurOrPaste = (text: string) => {
		const res = handleFormat(text);
		if (res) {
			setValue(res.formattedTxt);
			setReward(res.payload);
		}
	};

	return (
		<Field className="w-full">
			<FieldLabel htmlFor={province.syntax}>{province.name}</FieldLabel>
			<Textarea
				id={province.syntax}
				placeholder="Nhập hoặc dán KQXS..."
				resize={false}
				rows={6}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onBlur={(e) => handleBlurOrPaste(e.target.value)}
			/>
			<FieldError>This field is required.</FieldError>
		</Field>
	);
}
