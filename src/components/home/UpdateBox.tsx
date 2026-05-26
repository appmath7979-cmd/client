import { useAppStore } from "@lavaz/store";
import { UpdateField } from "./UpdateField";
import { store } from "#/store/store";
import type { RegionType } from "#/types/reward.type";

export function UpdateBox({
  stations,
  region,
}: {
  stations: string[] | undefined;
  region: RegionType;
}) {
  const [stationValue] = useAppStore(store.updateReward, (s) => s);

  return (
    <div className="space-y-4 [&_textarea]:resize-none">
      {stations ? (
        stations.map((item) => {
          const value =
            stationValue.find((st) => st.station === item)?.value || "";
          return (
            <UpdateField
              key={`${item}-input-field`}
              region={region}
              station={item}
              value={value}
            />
          );
        })
      ) : (
        <UpdateField
          region={region}
          station={undefined}
          value={
            stationValue.find((st) => st.station === "mien-bac")?.value || ""
          }
        />
      )}
    </div>
  );
}
