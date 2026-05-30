import type { IRegionApi } from "#/types/reward.type";

export function formatReward(value: IRegionApi[] | undefined) {
	if (!value) return;

	let values: Array<string | string[]> = [];
	return value.map((item) => {
		const { region, results, station } = item;
		if (region === "NORTH") {
			const value1 = results[0];
			const value2 = results[1];
			const value3 = results.slice(2, 4);
			const value4 = results.slice(4, 10);
			const value5 = results.slice(10, 14);
			const value6 = results.slice(14, 20);
			const value7 = results.slice(20, 23);
			const value8 = results.slice(23, 27);
			values = [value1, value2, value3, value4, value5, value6, value7, value8];
			return {
				station,
				region: "mien-bac",
				values,
			};
		} else {
			const value1 = results[0];
			const value2 = results[1];
			const value3 = results.slice(2, 5);
			const value4 = results[5];
			const value5 = results.slice(6, 13);
			const value6 = results.slice(13, 15);
			const value7 = results[15];
			const value8 = results[16];
			const value9 = results[17];
			values = [
				value1,
				value2,
				value3,
				value4,
				value5,
				value6,
				value7,
				value8,
				value9,
			];
			return {
				station,
				region: region === "CENTRAL" ? "mien-trung" : "mien-nam",
				values,
			};
		}
	});
}
