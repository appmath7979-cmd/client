import type { RegionPattenType } from "#/types/create-customer.type";

// --- 1. CẤU HÌNH MIỀN BẮC (Khớp ảnh 6, 9) ---
const regionStateNorthCo: RegionPattenType = {
  CLo2: 0.75,
  CĐĐ2: 0.75,
  CDaT2: 0.75,
  CDX2: 0.75,
  CLo3: 0.65,
  CĐĐ3: 0.65,
  C4: 0.65,
  CDa2: 0.75, // Riêng miền Bắc có thêm Đá
};

const regionStateNorthTrung: RegionPattenType = {
  CLo2: 75,
  CĐĐ2: 75,
  CDaT2: 700,
  CDX2: 550,
  CLo3: 650,
  CĐĐ3: 650,
  C4: 5500,
  CDa2: 650,
};

// --- 2. CẤU HÌNH MIỀN NAM (Khớp ảnh 7, 8, 11) ---
const regionStateSouthCo: RegionPattenType = {
  CLo2: 0.75,
  CĐĐ2: 0.75,
  CDaT2: 0.75,
  CDX2: 0.75,
  CLo3: 0.65,
  CĐĐ3: 0.65,
  C4: 0.65,
  CDa2: 0,
};

const regionStateSouthTrung: RegionPattenType = {
  CLo2: 75,
  CĐĐ2: 75,
  CDaT2: 700,
  CDX2: 550,
  CLo3: 650,
  CĐĐ3: 650,
  C4: 5500,
  CDa2: 0,
};

// --- 3. CẤU HÌNH MIỀN TRUNG (Đồng bộ giống Miền Nam) ---
const regionStateCentralCo: RegionPattenType = { ...regionStateSouthCo };
const regionStateCentralTrung: RegionPattenType = { ...regionStateSouthTrung };

// Bộ label chuẩn cho Miền Nam & Miền Trung
const labelSouthCentral = [
  { key: "CLo2", label: "2C lô" },
  { key: "CĐĐ2", label: "2C ĐĐ" },
  { key: "CDaT2", label: "2C ĐaT" },
  { key: "CDX2", label: "2C DX" },
  { key: "CLo3", label: "3C lô" },
  { key: "CĐĐ3", label: "3C ĐĐ" },
  { key: "C4", label: "4C" },
];

// Bộ label cho Miền Bắc (Thường có thêm Đá hoặc thứ tự khác xíu)
const labelNorth = [
  { key: "CLo2", label: "2C lô" },
  { key: "CĐĐ2", label: "2C ĐĐ" },
  { key: "CDa2", label: "2C Đá" }, // Miền Bắc hay có món này
  { key: "CDaT2", label: "2C ĐaT" },
  { key: "CDX2", label: "2C DX" },
  { key: "CLo3", label: "3C lô" },
  { key: "CĐĐ3", label: "3C ĐĐ" },
  { key: "C4", label: "4C" },
];

export {
  labelNorth,
  labelSouthCentral,
  regionStateCentralCo,
  regionStateCentralTrung,
  regionStateNorthCo,
  regionStateNorthTrung,
  regionStateSouthCo,
  regionStateSouthTrung,
};
