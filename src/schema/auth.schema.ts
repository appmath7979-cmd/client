import { z } from "zod";

const AuthSignInSchema = z.object({
	username: z
		.string()
		.trim()
		.min(3, { message: "Username không được để trống!" }),
	password: z.string().trim().min(1, "Mật khẩu không được để trống!"),
});

const AuthSignUpSchema = z
	.object({
		username: z
			.string()
			.trim()
			.min(3, { message: "Username phải có ít nhất 3 ký tự." }),
		password: z
			.string()
			.trim()
			.min(8, "Mật khẩu phải có ít nhất 8 ký tự.")
			.regex(/[a-z]/, "Phải chứa ít nhất một chữ thường.")
			.regex(/[A-Z]/, "Phải chứa ít nhất một chữ hoa.")
			.regex(/\d/, "Phải chứa ít nhất một chữ số.")
			.regex(/[@$!%*?&]/, "Phải chứa ít nhất một ký tự đặc biệt."),
		confirmPassword: z.string(),
		displayName: z
			.string()
			.trim()
			.min(2, "Tên hiển thị phải có ít nhất 2 ký tự.")
			.max(50, "Tên hiển thị quá dài."),
		phoneNumber: z
			.string()
			.trim()
			.regex(/^[0-9]{10}$/, "Số điện thoại không hợp lệ (10 chữ số)"),
		email: z
			.string()
			.email("Định dạng email không hợp lệ")
			.or(z.literal(""))
			.optional(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Mật khẩu không khớp",
		path: ["confirmPassword"],
	});

export { AuthSignInSchema, AuthSignUpSchema };
