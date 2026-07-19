import { useAppStore } from "@lavaz/store";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { DatePicker } from "#/components/system/DatePicker";
import { DropdownRegion } from "#/components/system/dropdowns/DropdownRegion";
import { Button } from "#/components/ui/button";
import { toastManager } from "#/components/ui/toast";
import { standard } from "#/constants/standard.constant";
import { toastTimeout } from "#/constants/toast.constant";
import {
	useStandardSettingMutation,
	useStandardSettingQuery,
} from "#/hooks/query/use-setting-query";
import { useDatePicker } from "#/hooks/use-date-picker";
import { store } from "#/store/store";

interface ProvinceConfig {
	code: string;
	name: string;
	score: number;
}

type RegionProvinces = Record<string, ProvinceConfig[]>;

export const Route = createFileRoute("/layoff/settings")({
	staticData: { title: "Thiết lập tiêu chuẩn" },
	component: RouteComponent,
});

function RouteComponent() {
	const { date, handleSelect, open, setOpen } = useDatePicker();
	const [region] = useAppStore(store.region, (s) => s.region);
	const dayIndex = date.getDay();
	const { data } = useStandardSettingQuery(dayIndex);
	const { post, put } = useStandardSettingMutation();

	const [scores, setScores] = useState<Record<string, number | string>>({});

	const dbLookup = useMemo(() => {
		const map = new Map<string, number>();
		if (data?.settings) {
			data.settings.forEach((db) => {
				map.set(`${db.syntax}:${db.provinceCode}`, db.score);
			});
		}
		return map;
	}, [data]);

	const handleScoreChange = (
		syntax: string,
		provinceCode: string,
		value: string,
	) => {
		if (value !== "" && Number.isNaN(Number(value))) return;

		const storageKey = `${syntax}:${dayIndex}:${provinceCode}`;
		setScores((prev) => ({
			...prev,
			[storageKey]: value === "" ? "" : parseInt(value, 10),
		}));
	};

	const listStandard = useMemo(() => {
		return standard.map((item) => {
			const syntaxKey = Object.keys(item)[0];
			const weekData = item[syntaxKey];
			const dayData = weekData ? weekData[dayIndex] : null;
			const provinces =
				dayData && region
					? (dayData as unknown as RegionProvinces)[region]
					: [];

			const provincesWithCurrentScore = Array.isArray(provinces)
				? provinces.map((p: ProvinceConfig) => {
						const storageKey = `${syntaxKey}:${dayIndex}:${p.code}`;
						const dbScore = dbLookup.get(`${syntaxKey}:${p.code}`);
						const currentScore = scores[storageKey] ?? dbScore ?? p.score ?? 0;

						return {
							...p,
							score: currentScore,
						};
					})
				: [];

			return {
				syntax: syntaxKey,
				provinces: provincesWithCurrentScore,
			};
		});
	}, [dayIndex, region, scores, dbLookup]);

	const handleSubmit = () => {
		const currentPayload = listStandard.flatMap((item) =>
			item.provinces.map((p) => ({
				day: dayIndex,
				syntax: item.syntax,
				region: region,
				provinceCode: p.code,
				score: p.score === "" ? 0 : Number(p.score),
			})),
		);

		if (data && data.settings.length > 0) {
			const ids = data.settings.map((item) => item.id);
			put.mutate({ data: currentPayload, ids });
		} else post.mutate(currentPayload);
	};

	if (post.isPending || put.isPending)
		toastManager.add({
			title: "Thiết lập chuẩn",
			description: "Đang thực hiện yêu cầu, Vui lòng đợi...",
			type: "info",
			...toastTimeout,
		});

	return (
		<div className="py-4 space-y-6">
			<div className="flex items-center justify-end gap-2 border-b pb-4">
				<DropdownRegion />
				<DatePicker
					date={date}
					onOpenChange={setOpen}
					onSelect={handleSelect}
					open={open}
				/>
			</div>

			<div className="space-y-4 border rounded-md">
				{listStandard.map((item) => {
					const hasProvinces = item.provinces.length > 0;

					return (
						<div
							key={item.syntax}
							className="rounded-xl p-4 bg-background space-y-4"
						>
							<p className="px-2.5 rounded-md font-bold text-blue-700">
								{item.syntax}
							</p>

							{hasProvinces ? (
								<div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
									{item.provinces.map((p) => (
										<div key={p.code} className="relative">
											<span className="absolute font-semibold z-40 bg-background -top-1/4 left-4 text-primary text-xs px-1">
												{p.name}
											</span>
											<input
												type="number"
												min={0}
												value={p.score}
												onChange={(e) =>
													handleScoreChange(item.syntax, p.code, e.target.value)
												}
												className="w-full py-2 border rounded-md px-4"
											/>
										</div>
									))}
								</div>
							) : (
								<p className="text-sm text-muted-foreground font-semibold">
									Miền {region} không có tỉnh nào áp dụng cú pháp này.
								</p>
							)}
						</div>
					);
				})}
			</div>

			<Button
				disabled={post.isPending || put.isPending}
				size="xl"
				className="w-full uppercase"
				onClick={handleSubmit}
			>
				Lưu
			</Button>
		</div>
	);
}
