import { z } from "zod";

const BetPairSchema = z.object({
	c: z.object({ MB: z.number(), MT: z.number(), MN: z.number() }),
	t: z.object({ MB: z.number(), MT: z.number(), MN: z.number() }),
	type: z.enum(["tile", "thanhtien"]),
});

const CreateCustomerSchema = z.object({
	fullName: z.string().min(1, "Họ và tên không được để trống!"),
	phoneNumber: z
		.string()
		.regex(
			/^(03|05|07|08|09)\d{8}$/,
			"Số điện thoại không hợp lệ (phải gồm 10 số)!",
		),
	type: z.enum(["khach", "chu"]),
	settings: z.array(
		z.union([
			z.object({ b2: BetPairSchema }),
			z.object({ dd2: BetPairSchema }),
			z.object({ da: BetPairSchema }),
			z.object({ dax: BetPairSchema }),
			z.object({ b3: BetPairSchema }),
			z.object({ dd3: BetPairSchema }),
			z.object({ b4: BetPairSchema }),
		]),
	),
	dat: z.enum(["1 lần", "ky rưỡi", "nhiều cặp"]),
	daxt: z.enum(["1 lần", "ky rưỡi", "nhiều cặp"]),
});

export { BetPairSchema, CreateCustomerSchema };
