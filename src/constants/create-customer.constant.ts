import type { BetPairType, RegionType } from "#/types/create-customer.type";

// export const RegionPatternSchema = z.object({
//   CLo2: z.coerce.number(), // shortcut: b
//   CĐĐ2: z.coerce.number(), // shortcut: cân: dd, lệch: d(x)d(x), dau, duoi: mb: giải db + 8;
//   CDa2: z.coerce.number().optional(), // shortcut: da
//   CDaT2: z.coerce.number(), // shortcut: dat
//   CDX2: z.coerce.number(), // shortcut: dx
//   CLo3: z.coerce.number(), // shortcut: b
//   CĐĐ3: z.coerce.number(), // shortcut: xc: mb: giải đb + 6, mn: giải  7 + đb; xdau xduoi: giải 7 + db
//   C4: z.coerce.number(), // shortcut: b
// });

export const southRegion: BetPairType[] = [
  {
    label: "2C Lô",
    c: 0.75,
    t: 75,
  },
  {
    label: "2C ĐĐ",
    c: 0.75,
    t: 75,
  },
  {
    label: "2C ĐáT",
    c: 0.75,
    t: 700,
  },
  {
    label: "2C DX",
    c: 0.75,
    t: 550,
  },
  {
    label: "3C Lô",
    c: 0.65,
    t: 650,
  },
  {
    label: "3C ĐĐ",
    c: 0.65,
    t: 650,
  },
  {
    label: "4C",
    c: 0.65,
    t: 5500,
  },
];

export const northRegion: BetPairType[] = [
  {
    label: "2C Lô",
    c: 0.75,
    t: 75,
  },
  {
    label: "2C ĐĐ",
    c: 0.75,
    t: 75,
  },
  {
    label: "2C 8Lô",
    c: 0.75,
    t: 75,
  },
  {
    label: "2C Đá",
    c: 0.75,
    t: 650,
  },
  {
    label: "3C Lô",
    c: 0.65,
    t: 650,
  },
  {
    label: "3C ĐĐ",
    c: 0.65,
    t: 650,
  },
  {
    label: "4C",
    c: 0.65,
    t: 5500,
  },
];

export const centralRegion: BetPairType[] = [...southRegion];

export const regions: RegionType = [
  {
    key: "BAC-REGION",
    label: "Miền Bắc",
    value: "BAC",
  },
  {
    key: "TRUNG-REGION",
    label: "Miền Trung",
    value: "TRUNG",
  },
  {
    key: "NAM-REGION",
    label: "Miền NAM",
    value: "NAM",
  },
];
