import { stationConstanst } from "#/constants/station.constanst";
import { useState } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useAppStore } from "@lavaz/store";
import { store } from "#/store/store";
import { useDebounce } from "#/hooks/useDebounce";
import type { RegionType } from "#/types/reward.type";

export function UpdateField({
  station,
  value,
  region,
}: {
  region: RegionType;
  station: string | undefined;
  value: string;
}) {
  const [, { setStationValue }] = useAppStore(store.updateReward, (s) => s);
  const [currentValue, setCurrentValue] = useState<string>(value);

  const debounce = useDebounce(currentValue);

  const handleValue = () => {
    let results: string = "";
    if (!station) {
      const cleanValue = debounce
        .replace(/[^0-9]/g, " ")
        .split(/\s+/)
        .filter(Boolean);

      const formattedItems = cleanValue.map((item, index) => {
        if (index === 0 || index === 1) return item;

        let matchLength = 0;
        if (index === 2 || index === 3) matchLength = 5;
        else if (index === 4 || index === 5) matchLength = 4;
        else if (index === 6) matchLength = 3;
        else if (index === 7) matchLength = 2;

        if (matchLength > 0) {
          const regex = new RegExp(`\\d{${matchLength}}`, "g");
          const matches = item.match(regex);
          return matches ? matches.join("-") : "";
        }
        return item;
      });

      results = formattedItems.join("-");
    } else {
      results = debounce
        .split(/[\n\s]+/)
        .filter(Boolean)
        .join("-");
    }

    setCurrentValue(results);
    setStationValue({
      station: station || "mien-bac",
      value: results,
      region,
    });
  };

  return (
    <div className="space-y-2">
      {station ? (
        <div className="space-y-2">
          <Label>
            {stationConstanst[station as keyof typeof stationConstanst]}
          </Label>
          <Textarea
            value={currentValue}
            onBlur={handleValue}
            onChange={(e) => setCurrentValue(e.target.value)}
          />
        </div>
      ) : (
        <Textarea
          value={currentValue}
          onBlur={handleValue}
          onChange={(e) => setCurrentValue(e.target.value)}
        />
      )}
    </div>
  );
}
