import { z } from "zod";

export const SignInSchema = z.object({
  username: z.string().min(5, { message: "Username không được để trống" }),
  password: z.string().min(1, { message: "Mật khẩu không được để trống" }),
  isRemember: z.boolean(),
});

export const SignUpSchema = z
  .object({
    username: z
      .string()
      .min(1, "Username không được để trống")
      .min(5, "Username phải có ít nhất 5 ký tự")
      .trim(), // Thay cho @Trim()

    phoneNumber: z
      .string()
      .min(1, "Số điện thoại không được để trống")
      // Dùng regex đơn giản cho số điện thoại VN để nhanh gọn
      .regex(
        /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
        "Số điện thoại VN không hợp lệ",
      ),

    password: z
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      // Cách nhanh nhất để bắt đủ 4 loại ký tự mà không cần viết nhiều .refine()
      .regex(/[a-z]/, "Thiếu chữ thường")
      .regex(/[A-Z]/, "Thiếu chữ hoa")
      .regex(/[0-9]/, "Thiếu số")
      .regex(/[^A-Za-z0-9]/, "Thiếu ký tự đặc biệt"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });
