import { Table, TableHead, TableHeader, TableRow } from "./ui/table";

export function Lottery() {
  return (
    <div>
      <h2 className="rounded-lg bg-primary py-2 font-bold text-lg text-primary-foreground text-center">Kết quả</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Thứ ngày</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </div>
  );
}
