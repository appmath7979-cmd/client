import type { ISchedule } from "#/types/schedule.type";

export const schedule: ISchedule[] = [
  {
    regions: [
      {
        name: "mien-nam",
        stations: ["tien-giang", "kien-giang", "da-lat"],
      },
      { name: "mien-bac", stations: ["mien-bac"] },
      { name: "mien-trung", stations: ["khanh-hoa", "kon-tum"] },
    ],
  },
  {
    regions: [
      {
        name: "mien-nam",
        stations: ["tp-hcm", "dong-thap", "ca-mau"],
      },
      { name: "mien-bac", stations: ["mien-bac"] },
      { name: "mien-trung", stations: ["thua-thien-hue", "phu-yen"] },
    ],
  },
  {
    regions: [
      {
        name: "mien-nam",
        stations: ["ben-tre", "vung-tau", "bac-lieu"],
      },
      { name: "mien-bac", stations: ["mien-bac"] },
      { name: "mien-trung", stations: ["quang-nam", "dak-lak"] },
    ],
  },
  {
    regions: [
      {
        name: "mien-nam",
        stations: ["dong-nai", "can-tho", "soc-trang"],
      },
      { name: "mien-bac", stations: ["mien-bac"] },
      { name: "mien-trung", stations: ["da-nang", "khanh-hoa"] },
    ],
  },
  {
    regions: [
      {
        name: "mien-nam",
        stations: ["tay-ninh", "an-giang", "binh-thuan"],
      },
      { name: "mien-bac", stations: ["mien-bac"] },
      {
        name: "mien-trung",
        stations: ["binh-dinh", "quang-binh", "quang-tri"],
      },
    ],
  },
  {
    regions: [
      {
        name: "mien-nam",
        stations: ["vinh-long", "binh-duong", "tra-vinh"],
      },
      { name: "mien-bac", stations: ["mien-bac"] },
      { name: "mien-trung", stations: ["gia-lai", "ninh-thuan"] },
    ],
  },
  {
    regions: [
      {
        name: "mien-nam",
        stations: ["tp-hcm", "long-an", "hau-giang", "binh-phuoc"],
      },
      { name: "mien-bac", stations: ["mien-bac"] },
      { name: "mien-trung", stations: ["da-nang", "quang-ngai", "dak-nong"] },
    ],
  },
];
