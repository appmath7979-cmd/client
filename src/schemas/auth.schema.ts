import { z } from "zod";

const SignUpSchema = z
	.object({
		displayName: z.string().min(1, "Tên hiển thị không được để trống!"),
		username: z.string().min(5, "Tên đăng nhập phải có ít nhất 5 ký tự!"),
		password: z
			.string()
			.min(8, "Mật khẩu phải có ít nhất 8 ký tự!")
			.max(32, "Mật khẩu không được vượt quá 32 ký tự!")
			.regex(/[A-Z]/, "Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa!")
			.regex(/[a-z]/, "Mật khẩu phải chứa ít nhất 1 chữ cái viết thường!")
			.regex(/[0-9]/, "Mật khẩu phải chứa ít nhất 1 chữ số!")
			.regex(/[^A-Za-z0-9]/, "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt!"),
		confirmPassword: z.string(),
		referralCode: z.string().min(6, "Mã mời không hợp lệ!"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Mật khẩu xác nhận không trùng khớp",
		path: ["confirmPassword"], // Đẩy lỗi vào đúng ô nhập confirmPassword trên giao diện
	});

const SignInSchema = z.object({
	username: z.string().min(5, "Tên đăng nhập phải có ít nhất 5 ký tự!"),
	password: z.string(),
	isRemember: z.boolean(),
});

export { SignUpSchema, SignInSchema };
