import type { RegionType } from "#/types/region.type";
import { provinces } from "./provinces.constant";

// 1. Tạo Lookup Map để tìm tỉnh theo code với độ phức tạp O(1)
const provinceMap = provinces.reduce(
	(acc, p) => {
		// Vì có một số tỉnh trùng code (ví dụ: DN của Đồng Nai và Đà Nẵng),
		// ta kết hợp code + region để làm key duy nhất.
		acc[`${p.code}-${p.region}`] = p;
		return acc;
	},
	{} as Record<string, (typeof provinces)[number]>,
);

// Hàm helper lấy nhanh thông tin tỉnh
const getP = (code: string, region: RegionType) =>
	provinceMap[`${code}-${region}`];

// 2. Định nghĩa lịch mở thưởng theo chuẩn cấu trúc dữ liệu của bạn
const schedule = [
	{
		day: "Chủ Nhật",
		MN: [getP("TG", "MN"), getP("KG", "MN"), getP("DL", "MN")], // Đà Lạt
		MB: [getP("MB", "MB")],
		MT: [getP("KH", "MT"), getP("KT", "MT")],
	},
	{
		day: "Thứ 2",
		MN: [getP("HCM", "MN"), getP("DT", "MN"), getP("CM", "MN")],
		MB: [getP("MB", "MB")],
		MT: [getP("TH", "MT"), getP("PY", "MT")],
	},
	{
		day: "Thứ 3",
		MN: [getP("BT", "MN"), getP("VT", "MN"), getP("BLI", "MN")],
		MB: [getP("MB", "MB")],
		MT: [getP("QNA", "MT"), getP("DL", "MT")], // Đắk Lắk
	},
	{
		day: "Thứ 4",
		MN: [getP("DN", "MN"), getP("CT", "MN"), getP("ST", "MN")],
		MB: [getP("MB", "MB")],
		MT: [getP("DN", "MT"), getP("KH", "MT")], // Đà Nẵng, Khánh Hòa
	},
	{
		day: "Thứ 5",
		MN: [getP("TN", "MN"), getP("AG", "MN"), getP("BTH", "MN")],
		MB: [getP("MB", "MB")],
		MT: [getP("BD", "MT"), getP("QB", "MT"), getP("QT", "MT")],
	},
	{
		day: "Thứ 6",
		MN: [getP("VL", "MN"), getP("BD", "MN"), getP("TV", "MN")],
		MB: [getP("MB", "MB")],
		MT: [getP("GL", "MT"), getP("NT", "MT")],
	},
	{
		day: "Thứ 7",
		MN: [
			getP("HCM", "MN"),
			getP("LA", "MN"),
			getP("HG", "MN"),
			getP("BP", "MN"),
		],
		MB: [getP("MB", "MB")],
		MT: [getP("DN", "MT"), getP("QN", "MT"), getP("DNO", "MT")],
	},
];

export { schedule };
