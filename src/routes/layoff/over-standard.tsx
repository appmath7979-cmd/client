import { useAppStore } from "@lavaz/store";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { LayoffList } from "#/components/layoff/LayoffList";
import { BackBtn } from "#/components/system/BackBtn";
import { DatePicker } from "#/components/system/DatePicker";
import { DropdownRegion } from "#/components/system/dropdowns/DropdownRegion";
import { Button } from "#/components/ui/button";
import { Label } from "#/components/ui/label";
import { Textarea } from "#/components/ui/textarea";
import { useOrderMutation, useOrderQuery } from "#/hooks/query/use-order-query";
import { useStandardSettingQuery } from "#/hooks/query/use-setting-query";
import { useDatePicker } from "#/hooks/use-date-picker";
import { convertOrderToText } from "#/lib/convert-order-to-text";
import { formatDate } from "#/lib/date-format";
import { store } from "#/store/store";
import type {
	IOrderDetailFromDb,
	IPostOrderMessageApi,
} from "#/types/apis/message.type";

export const Route = createFileRoute("/layoff/over-standard")({
	component: RouteComponent,
});

function RouteComponent() {
	const [region] = useAppStore(store.region, (s) => s.region);
	const { date, open, setOpen, handleSelect } = useDatePicker();
	const dayIndex = date.getDay();

	const { data: settingData } = useStandardSettingQuery(dayIndex);
	const { data: orderData } = useOrderQuery.getAllByDate(formatDate(date));
	const { mutate } = useOrderMutation().postLayoff;

	// 1. Map tra cứu mức chuẩn (score) từ Setting
	const standardLookup = useMemo(() => {
		const map = new Map<string, number>();
		if (settingData?.settings) {
			settingData.settings.forEach((set) => {
				map.set(`${set.syntax}:${set.provinceCode}`, set.score ?? 0);
			});
		}
		return map;
	}, [settingData]);

	// 2. Lọc danh sách các tin đã cân hàng thuộc Region
	const layoffOrders = useMemo(() => {
		if (!orderData?.orders || !region) return [];
		return orderData.orders.filter(
			(item) => item.region === region && item.isLayoff && item.isSend,
		);
	}, [orderData, region]);

	// 3. Tính toán lượng dư theo Region đã chọn
	const overStandardDetails = useMemo(() => {
		if (!orderData?.orders || !region) return [];

		const groupedMap = new Map<
			string,
			{ baseDetail: IOrderDetailFromDb; normalXac: number; layoffXac: number }
		>();

		orderData.orders.forEach((order) => {
			if (order.region === region && Array.isArray(order.details)) {
				order.details.forEach((detail) => {
					const displaySyntax = detail.type ? detail.type : detail.syntax;
					const groupKey = `${detail.stationCode}-${displaySyntax}-${detail.number}`;
					const currentXac = detail.xac ?? 0;

					const existing = groupedMap.get(groupKey);
					if (existing) {
						if (order.isLayoff) {
							existing.layoffXac += currentXac;
						} else {
							existing.normalXac += currentXac;
						}
					} else {
						groupedMap.set(groupKey, {
							baseDetail: detail,
							normalXac: order.isLayoff ? 0 : currentXac,
							layoffXac: order.isLayoff ? currentXac : 0,
						});
					}
				});
			}
		});

		const surplusList: IOrderDetailFromDb[] = [];

		groupedMap.forEach(({ baseDetail, normalXac, layoffXac }) => {
			let settingKeyProvince = baseDetail.stationCode;
			if (
				(baseDetail.syntax === "2c" || baseDetail.syntax === "3c") &&
				baseDetail.type
			) {
				settingKeyProvince = `${baseDetail.stationCode}-${baseDetail.type}`;
			}
			const searchKey = `${baseDetail.syntax}:${settingKeyProvince}`;
			const mucChuan = standardLookup.get(searchKey) ?? 0;

			const netXac = normalXac - layoffXac;
			const duAmount = netXac - mucChuan;

			if (duAmount > 0) {
				surplusList.push({
					...baseDetail,
					xac: duAmount,
				});
			}
		});

		return surplusList;
	}, [orderData, standardLookup, region]);

	// 4. Render nội dung hiển thị trong Textarea (Có so sánh với tin đã cân)
	const message = useMemo(() => {
		if (overStandardDetails.length === 0) {
			return "Không có tin nào dư chuẩn trong ngày.";
		}

		const mockOrderData = {
			region: region || "MB",
			type: "XAC",
			details: overStandardDetails,
		};

		const calculatedMessage = convertOrderToText(mockOrderData);

		// KIỂM TRA: Nếu tin tính toán đã tồn tại trong danh sách layoffOrders
		const isAlreadyLayoff = layoffOrders.some(
			(layoff) => layoff.message?.trim() === calculatedMessage.trim(),
		);

		if (isAlreadyLayoff) {
			return "Tin dư chuẩn này đã được cân hàng trước đó.";
		}

		return calculatedMessage;
	}, [overStandardDetails, region, layoffOrders]);

	// 5. Tạo Payload gửi lên API (Chỉ tạo nếu chưa trùng với tin đã cân)
	const layoffPayload = useMemo<IPostOrderMessageApi | null>(() => {
		if (
			overStandardDetails.length === 0 ||
			!region ||
			message === "Không có tin nào dư chuẩn trong ngày." ||
			message === "Tin dư chuẩn này đã được cân hàng trước đó."
		) {
			return null;
		}

		return {
			region,
			message,
			release: formatDate(date),
			isLayoff: true,
			details: overStandardDetails.map((detail) => ({
				stationCode: detail.stationCode,
				syntax: detail.syntax,
				type: detail.type,
				number: detail.number,
				xac: detail.xac,
			})),
		};
	}, [overStandardDetails, message, region, date]);

	const handleLayoff = () => {
		if (!layoffPayload) return;
		mutate(layoffPayload);
	};

	return (
		<div className="py-4 space-y-4">
			<div className="flex justify-between items-center">
				<BackBtn />
				<div className="flex justify-end items-center gap-2">
					<DropdownRegion />
					<DatePicker
						date={date}
						open={open}
						onOpenChange={setOpen}
						onSelect={handleSelect}
					/>
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<div className="space-y-4">
					<Label className="font-semibold">Tin đang dư chuẩn</Label>
					<Textarea
						value={message}
						readOnly
						resize={false}
						placeholder="Dữ liệu dư chuẩn tự động hiển thị ở đây..."
						className="text-sm bg-muted/30 whitespace-pre-wrap leading-relaxed min-h-[120px]"
					/>
				</div>

				<Button
					onClick={handleLayoff}
					disabled={!layoffPayload}
					className="w-full"
				>
					Cân hàng
				</Button>
			</div>

			<div className="space-y-2">
				<h3 className="font-semibold text-lg">Tin đã cân bằng</h3>
				<LayoffList data={layoffOrders} />
			</div>
		</div>
	);
}