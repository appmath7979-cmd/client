import z from "zod";

export const BetPairSchema = z.object({
  label: z.string(),
  c: z.number(),
  t: z.number(),
});

export const CreateCustomerSchema = z.object({
  fullName: z.string().min(1, { message: "Họ tên không dược để trống" }),
  phoneNumber: z
    .string()
    .min(1, { message: "Số điện thoại không dược để trống" })
    .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, {
      message: "Số điện thoại không hợp lệ",
    }),
  type: z.enum(["GUEST", "OWNER"]),
  loaiCo: z.enum(["ti_le", "thanh_tien"]),
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
