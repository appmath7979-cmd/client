import z from "zod";

const BetPairSchema = z.object({
	label: z.string(),
	c: z.number(),
	t: z.number(),
});

const CustomerSchema = z.object({
	userId: z.string(),
	fullName: z.string().min(1, "Họ tên không được để trống!"),
	phoneNumber: z
		.string()
		.regex(
			/(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
			"Số điện thoại không hợp lệ (10 chữ số)",
		)
		.min(1, "Số điện thoại không được để trống!"),
	type: z.enum(["GUEST", "OWNER"]),
	loaiCo: z.string(),
	xienMB: z.boolean(),
	tinhUi: z.boolean(),
	tinhTrungDaT: z.enum(["1_lan", "ky_ruoi", "nhieu_lan"]),
	tinhTrungDaX: z.enum(["1_lan", "ky_ruoi", "nhieu_lan"]),
	settings: z.object({
		BAC: z.array(BetPairSchema),
		TRUNG: z.array(BetPairSchema),
		NAM: z.array(BetPairSchema),
	}),
});

export { CustomerSchema, BetPairSchema };
