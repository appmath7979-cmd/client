import { awardStations, awardType } from "#/constants/award.constants";
import { useGetLotteData } from "#/hooks/useGetLotteData";
import { cn } from "#/lib/utils";
import type { AwardRegionType } from "#/types/schedule.type";
import { useAppStore } from "@lavaz/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Table";
import { store } from "#/store/store";

export function LotteryBox({ region }: { region: AwardRegionType }) {
  const [{ data }] = useAppStore(store.awardData, (s) => s);
  const { setElementRef } = useGetLotteData(region);
  const day = new Date().getDay();

  const days = {
    0: "chủ nhật",
    1: "thứ Hai",
    2: "thứ ba",
    3: "thứ tư",
    4: "thứ năm",
    5: "thứ sáu",
    6: "thứ bảy",
  };

  const titleAwardRegion =
    region === "mien-bac"
      ? "Miền Bắc"
      : region === "mien-nam"
        ? "Miền Nam"
        : "Miền Trung";

  return (
    <div aria-details="table-aria" className="rounded-md bg-primary">
      <div ref={setElementRef} className="h-0 opacity-0 invisible" />
      <h2 className="p-2 font-semibold text-lg text-center text-primary-foreground">
        Kết quả {titleAwardRegion}
      </h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="capitalize">
              {days[day as keyof typeof days]}
            </TableHead>
            {data.map(
              (item) =>
                item.region === region && (
                  <TableHead key={item.station} className="py-1">
                    {awardStations[item.station as keyof typeof awardStations]}
                  </TableHead>
                ),
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 9 }).map((_, index) => (
            <TableRow key={`${region}-row-${index}`}>
              <TableCell>
                {
                  awardType[
                    data[0]?.values[index].type as keyof typeof awardType
                  ]
                }
              </TableCell>
              {data.map((st, i) => {
                return (
                  <TableCell
                    key={`${st}-cell-${i}`}
                    className={cn(
                      st.values[index].type === "giaidb" ||
                        st.values[index].type === "giai8"
                        ? "font-semibold text-primary"
                        : "",
                    )}
                  >
                    {Array.isArray(st.values[index].value)
                      ? st.values[index].value.map((val) => <p>{val}</p>)
                      : st.values[index].value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
