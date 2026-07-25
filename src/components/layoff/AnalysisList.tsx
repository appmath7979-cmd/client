import { useMemo } from "react";
import { syntaxTypeList } from "#/constants/syntax-type.constant";
import { useOrderQuery } from "#/hooks/query/use-order-query";
import { useStandardSettingQuery } from "#/hooks/query/use-setting-query";
import { formatDate } from "#/lib/date-format";
import type { IOrderDetailFromDb } from "#/types/apis/message.type";
import type { RegionType } from "#/types/region.type";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { AnalysisItem } from "./AnalysisItem";

export interface IAnalysisSummaryItem {
	stationCode: string;
	syntax: string;
	number: string;
	diem: number;
	daCan: number;
	tong: number;
	dangDu: number;
}

interface AnalysisListProps {
	provinceCode: string;
	region: RegionType;
	date: Date;
}

export function AnalysisList({
	provinceCode,
	region,
	date,
}: AnalysisListProps) {
	const { data } = useOrderQuery.getAll({
		region,
		release: formatDate(date),
		isSend: false,
	});
	const { data: settingsData } = useStandardSettingQuery(date.getDay());

	// 1. Map tra cứu mức chuẩn (score) từ Setting
	// Chuẩn hóa key lưu trong Map: `${syntax}:${provinceCode}` viết thường (VD: "2c:tn-bao", "da:tn")
	const settingLookup = useMemo(() => {
		const map = new Map<string, number>();
		if (settingsData?.settings) {
			settingsData.settings.forEach((set) => {
				const searchKey = `${set.syntax}:${set.provinceCode}`.toLowerCase();
				map.set(searchKey, set.score ?? 0);
			});
		}
		return map;
	}, [settingsData]);

	// 2. Tách riêng đơn thường và đơn cân hàng
	const { normalDetails, layoffDetails } = useMemo(() => {
		if (!data?.orders) return { normalDetails: [], layoffDetails: [] };

		const normalList: IOrderDetailFromDb[] = [];
		const layoffList: IOrderDetailFromDb[] = [];

		data.orders.forEach((order) => {
			if (order.region === region && Array.isArray(order.details)) {
				const isLayoff = Boolean(order.isLayoff);
				const targetList = isLayoff ? layoffList : normalList;

				order.details.forEach((detail) => {
					if (provinceCode && detail.stationCode !== provinceCode) return;
					targetList.push(detail);
				});
			}
		});

		return { normalDetails: normalList, layoffDetails: layoffList };
	}, [data, region, provinceCode]);

	// 3. Gom nhóm TỔNG THEO CON SỐ VÀ CÚ PHÁP
	const getGroupedListBySyntax = (targetSyntax: string) => {
		const map = new Map<
			string,
			{
				baseDetail: IOrderDetailFromDb;
				normalXac: number;
				layoffXac: number;
			}
		>();

		const checkMatchSyntax = (detail: IOrderDetailFromDb) => {
			const currentSyntax = (detail.syntax || "").toLowerCase();
			const currentType = (detail.type || "").toLowerCase();

			if (targetSyntax === "da") {
				return currentSyntax === "da" || currentType === "da";
			}

			if (targetSyntax === "dax") {
				return currentSyntax === "dax" || currentType === "dax";
			}

			if (targetSyntax === "2c") {
				const isDaOrDax =
					currentSyntax === "da" ||
					currentSyntax === "dax" ||
					currentType === "da" ||
					currentType === "dax";

				if (isDaOrDax) return false;

				return (
					currentSyntax === "2c" ||
					(currentSyntax.includes("2") && !currentSyntax.includes("da"))
				);
			}

			return currentSyntax === targetSyntax || currentType === targetSyntax;
		};

		normalDetails.forEach((detail) => {
			if (!checkMatchSyntax(detail)) return;

			const typeOrSyntax = detail.type || detail.syntax;
			const groupKey = `${detail.stationCode}-${typeOrSyntax}-${detail.number}`;
			const currentXac = detail.xac ?? 0;

			const existing = map.get(groupKey);
			if (existing) {
				existing.normalXac += currentXac;
			} else {
				map.set(groupKey, {
					baseDetail: detail,
					normalXac: currentXac,
					layoffXac: 0,
				});
			}
		});

		layoffDetails.forEach((detail) => {
			if (!checkMatchSyntax(detail)) return;

			const typeOrSyntax = detail.type || detail.syntax;
			const groupKey = `${detail.stationCode}-${typeOrSyntax}-${detail.number}`;
			const currentXac = detail.xac ?? 0;

			const existing = map.get(groupKey);
			if (existing) {
				existing.layoffXac += currentXac;
			} else {
				map.set(groupKey, {
					baseDetail: detail,
					normalXac: 0,
					layoffXac: currentXac,
				});
			}
		});

		const result: IAnalysisSummaryItem[] = [];

		map.forEach(({ baseDetail, normalXac, layoffXac }) => {
			const displaySyntax = baseDetail.type
				? baseDetail.type
				: baseDetail.syntax;

			const station = baseDetail.stationCode.toLowerCase();
			const typeStr = displaySyntax.toLowerCase();
			const syntaxStr = (baseDetail.syntax || "").toLowerCase();

			// HÀM TRA CỨU MỨC CHUẨN THÔNG MINH (Khớp đúng cấu trúc TN-bao trong DB)
			const getSettingScore = () => {
				const candidateKeys = [
					// 1. Trường hợp có cả syntax + đài + type (VD: "2c:tn-bao") -> Khớp chính xác DB của bạn!
					`${syntaxStr}:${station}-${typeStr}`,
					// 2. Trường hợp chỉ có syntax + đài (VD: "da:tn", "4c:tn")
					`${syntaxStr}:${station}`,
					// 3. Trường hợp fallback nếu DB dùng type làm syntax (VD: "bao:tn")
					`${typeStr}:${station}`,
				];

				for (const key of candidateKeys) {
					if (settingLookup.has(key)) {
						return settingLookup.get(key);
					}
				}
				return 0;
			};

			const mucChuan = getSettingScore() ?? 0;

			const tong = normalXac;
			const daCan = layoffXac;

			// Điểm thực giữ còn lại
			const diem = Math.max(0, tong - daCan);

			// Đang dư = Điểm thực giữ - Mức chuẩn (Đã cân đủ <= mức chuẩn -> dư = 0)
			const chenhLech = diem - mucChuan;
			const dangDu = chenhLech > 0 ? chenhLech : 0;

			result.push({
				stationCode: baseDetail.stationCode,
				syntax: displaySyntax,
				number: baseDetail.number,
				diem,
				daCan,
				tong,
				dangDu,
			});
		});

		return result;
	};

	return (
		<Tabs defaultValue={syntaxTypeList[0]} className="w-full">
			<TabsList className="w-full flex overflow-x-auto">
				{syntaxTypeList.map((syntax) => (
					<TabsTrigger
						key={`${syntax}-trigger`}
						value={syntax}
						className="flex-1 uppercase font-semibold"
					>
						{syntax}
					</TabsTrigger>
				))}
			</TabsList>

			{syntaxTypeList.map((syntax) => {
				const groupedList = getGroupedListBySyntax(syntax);

				return (
					<TabsContent key={`${syntax}-content`} value={syntax}>
						<div className="p-2 text-sm text-muted-foreground">
							{groupedList.length > 0 ? (
								<div className="overflow-x-auto border rounded-lg">
									<Table className="min-w-full divide-y divide-border text-left">
										<TableHeader className="bg-muted text-muted-foreground uppercase text-xs font-semibold">
											<TableRow className="[&_th]:font-semibold [&_th]:text-center">
												<TableHead>STT</TableHead>
												<TableHead>Đài</TableHead>
												<TableHead>Cú pháp</TableHead>
												<TableHead>Số đánh</TableHead>
												<TableHead>Điểm</TableHead>
												<TableHead>Đã cân</TableHead>
												<TableHead>Tổng</TableHead>
												<TableHead>Đang dư</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody className="divide-y divide-border bg-background text-foreground">
											{groupedList.map((item, idx) => {
												const key = `${item.stationCode}-${item.syntax}-${item.number}-${idx}`;
												return <AnalysisItem key={key} idx={idx} item={item} />;
											})}
										</TableBody>
									</Table>
								</div>
							) : (
								<p className="text-center py-4">Chưa có thông tin</p>
							)}
						</div>
					</TabsContent>
				);
			})}
		</Tabs>
	);
}
