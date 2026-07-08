import { z } from "zod";

// 1. Định nghĩa Schema cho các ô nhập liệu số (MB, MT, MN) để tái sử dụng
const RegionValuesSchema = z.object({
	MB: z.number(),
	MT: z.number(),
	MN: z.number(),
});

// 2. Định nghĩa cấu trúc chuẩn cho một mục cấu hình
const BetPairSchema = z.object({
	// Thêm trường 'name' để phân biệt cấu hình này thuộc loại nào (b2, dd2, da...)
	name: z.enum(["b2", "dd2", "da", "dax", "b3", "dd3", "b4"]),
	c: RegionValuesSchema,
	t: RegionValuesSchema,
	type: z.enum(["tile", "thanhtien"]),
});

// 3. Schema tổng để Validate Form tạo khách hàng
const CreateCustomerSchema = z.object({
	fullName: z.string().min(1, "Họ và tên không được để trống!"),
	phoneNumber: z
		.string()
		.regex(
			/^(03|05|07|08|09)\d{8}$/,
			"Số điện thoại không hợp lệ (phải gồm 10 số)!",
		),
	type: z.enum(["khach", "chu"]),
	tinhUi: z.boolean(),
	xienMienBac: z.boolean(),
	settings: z.array(BetPairSchema),
	dat: z.enum(["1 lần", "ky rưỡi", "nhiều cặp"]),
	daxt: z.enum(["1 lần", "ky rưỡi", "nhiều cặp"]),
});

export type CreateCustomerType = z.infer<typeof CreateCustomerSchema>;
export type BetPairType = z.infer<typeof BetPairSchema>;

export { BetPairSchema, CreateCustomerSchema };
