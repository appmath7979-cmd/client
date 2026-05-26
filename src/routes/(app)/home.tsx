import { DialogUpdate } from "#/components/home/DialogUpdate";
import { Interactive } from "#/components/home/Interactive";
import { Lottery } from "#/components/Lottery";
import { Button } from "#/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "#/components/ui/dialog";
import { scheduleConstant } from "#/constants/schedule.constant";

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/(app)/home")({
  component: RouteComponent,
});

function RouteComponent() {
  const [date, setDate] = useState<Date>(new Date());
  const today = new Date();
  const day = date.getDay();

  const schedule = scheduleConstant[day];

  return (
    <Dialog>
      <div className="py-6 space-y-4">
        <Interactive date={date} onSelectDate={setDate} />
        <div className="space-y-8">
          {schedule.map((item) => (
            <Lottery key={`${item.region}-table`} day={day} item={item} />
          ))}
        </div>
        <DialogContent>
          <DialogHeader className="-space-y-2">
            <DialogTitle>Cập nhật kết quả</DialogTitle>
            <DialogDescription className="italic">
              Cập nhật kết quả ngày {today.toLocaleDateString("vi-VN")}
            </DialogDescription>
          </DialogHeader>
          <DialogUpdate schedule={schedule} />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"secondary"}>Hủy bỏ</Button>
            </DialogClose>
            <Button>Xác nhận</Button>
          </DialogFooter>
        </DialogContent>
      </div>
      )
    </Dialog>
  );
}
