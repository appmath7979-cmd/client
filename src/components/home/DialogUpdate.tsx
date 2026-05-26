import { regionConstanst } from "#/constants/station.constanst";
import type { RegionType } from "#/types/reward.type";
import type { IRewardSchedule } from "#/types/schedule.type";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { UpdateBox } from "./UpdateBox";

export function DialogUpdate({ schedule }: { schedule: IRewardSchedule[] }) {
  const regions: RegionType[] = ["mien-bac", "mien-trung", "mien-nam"];
  return (
    <Tabs className="h-85.5 gap-4">
      <TabsList className="w-full">
        {regions.map((re) => (
          <TabsTrigger key={`${re}-tabs-trigger`} value={re}>
            {regionConstanst[re]}
          </TabsTrigger>
        ))}
      </TabsList>
      {regions.map((re) => (
        <TabsContent key={`${re}-tabs-content`} value={re}>
          <UpdateBox
            region={re}
            stations={schedule.find((item) => item.region === re)?.stations}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
