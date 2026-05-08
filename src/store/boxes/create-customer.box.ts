import type { CreateCustomerType } from "#/types/create-customer.type";
import { createBox } from "@lavaz/store";
import {
  regionStateCentralCo,
  regionStateCentralTrung,
  regionStateNorthCo,
  regionStateNorthTrung,
  regionStateSouthCo,
  regionStateSouthTrung,
} from "#/constants/create-customer.constant";

const initialState = {
  fullName: "",
  phoneNumber: "",
  type: "GUEST",
  setting: {
    loaiCo: "",
    tinhTrungDaThang: "",
    tinhTrungDaXien: "",
    tinhUi: false,
    xienMienBac: false,
    regions: [
      {
        regionName: "MienBac",
        coSetting: regionStateNorthCo,
        trungSetting: regionStateNorthTrung,
      },
      {
        regionName: "MienBTrung",
        coSetting: regionStateCentralCo,
        trungSetting: regionStateCentralTrung,
      },
      {
        regionName: "MienNam",
        coSetting: regionStateSouthCo,
        trungSetting: regionStateSouthTrung,
      },
    ],
  },
} satisfies CreateCustomerType as CreateCustomerType;

export const createCustomerBox = createBox(initialState, (set) => ({
  setCreateCopy: (copyData: CreateCustomerType) =>
    set((prev) => ({ ...prev, ...copyData })),
})).create();
