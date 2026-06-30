import { useState } from "react";
import { stationConstanst } from "#/constants/station.constanst";
import type { RegionType } from "#/types/reward.type";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { formatReward } from "#/lib/format-reward";

interface DialogRewardItemProps {
  station: string;
  region: RegionType;
}

export default function DialogRewardItem({
  station,
  region,
}: DialogRewardItemProps) {
  const [value, setValue] = useState<string>("");

  const currentValue = () => {
    if (!value) return;
    // const formatted = formatReward(value);
  };

  return (
    <div className="space-y-1">
      <Label htmlFor={`${station}-id`}>
        {region !== "mien-bac" || !region
          ? stationConstanst[station as keyof typeof stationConstanst]
          : "Miền Bắc"}
      </Label>
      <Textarea
        id={`${station}-id`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="resize-none"
      />
    </div>
  );
}
