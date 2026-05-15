import { useGetLotteData } from "#/hooks/useGetLotteData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Table";

export function LotteryBox() {
  const { data, setElementRef } = useGetLotteData("mien-nam");
  console.log(data);
  return (
    <div aria-details="table">
      <div id="box_kqxs_minhngoc" ref={setElementRef} className="opacity-0" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Giải</TableHead>
            <TableHead>Tỉnh</TableHead>
            <TableHead>Tỉnh</TableHead>
            <TableHead>TỈnh</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-table">
          <TableRow>
            <TableCell scope="col">a</TableCell>
            <TableCell scope="col">a</TableCell>
            <TableCell scope="col">a</TableCell>
            <TableCell scope="col">a</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
