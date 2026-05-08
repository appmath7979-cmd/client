import { z } from "zod";

export const RegionPatternSchema = z.object({
  CLo2: z.coerce.number(),
  CĐĐ2: z.coerce.number(),
  C8Lo2: z.coerce.number(),
  CDa2: z.coerce.number().optional(),
  CDaT2: z.coerce.number(),
  CDX2: z.coerce.number(),
  CLo3: z.coerce.number(),
  C7Lo3: z.coerce.number(),
  CĐĐ3: z.coerce.number(),
  C4: z.coerce.number(),
});

export const CreateRegionSettingSchema = z.object({
  regionName: z.string().nonempty(),
  coSetting: RegionPatternSchema,
  trungSetting: RegionPatternSchema,
});

export const CreateSettingSchema = z.object({
  loaiCo: z.string().min(1, "Loại cò không được để trống"),
  xienMienBac: z.boolean(),
  tinhUi: z.boolean(),
  tinhTrungDaThang: z
    .string()
    .min(1, "Tỉ lệ trúng đá thẳng không được để trống"),
  tinhTrungDaXien: z.string().min(1, "Tỉ lệ trúng đá xiên không được để trống"),
  regions: z
    .array(CreateRegionSettingSchema)
    .min(1, "Phải có ít nhất 1 cấu hình miền")
    .max(3, "Tối đa 3 miền thôi cha nội"),
});

export const CreateCustomerSchema = z.object({
  fullName: z.string().min(1, "Họ tên không được để trống"),
  phoneNumber: z
    .string()
    // Regex này đã bắt buộc 10 số, bắt đầu bằng 03,05,07,08,09 rồi
    .regex(/^(0[35789])[0-9]{8}$/, "Số điện thoại không hợp lệ"),
  type: z.enum(["GUEST", "OWNER"]), // Nên khớp với Enum trong Prisma của cha nội

  // QUAN TRỌNG: Phải đưa cái setting này vào đây
  setting: CreateSettingSchema,
});
