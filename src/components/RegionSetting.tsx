import type { RegionPattenType } from "#/types/create-customer.type";
import { useMemo } from "react";

export const RegionSetting = ({ settings }: { settings: RegionPattenType }) => {
  const displayItems = useMemo(() => {
    return Object.entries(settings).map(([key, value]) => ({ key, value }));
  }, [settings]);
  return <div>
    {
        displayItems.map(item =>)
    }
  </div>;
};
