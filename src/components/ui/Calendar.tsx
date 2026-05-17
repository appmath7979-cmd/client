import {
  CalendarIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from "@phosphor-icons/react";
import { Button } from "./Button";
import { useState } from "react";
import { cn } from "#/lib/utils";

const sideXCalendar = {
  left: "left-0",
  right: "-translate-x-[107px]",
};

const sideYCalendar = {
  top: "bottom-[calc(100%+8px)]",
  bottom: "top-[calc(100%+8px)]",
};

export function Calendar({
  sideX = "left",
  sideY = "bottom",
}: {
  sideX?: keyof typeof sideXCalendar;
  sideY?: keyof typeof sideYCalendar;
}) {
  const [isShowPicker, setIsShowPicker] = useState<boolean>(false);
  const [selectDate, setSelectDate] = useState<Date>(new Date());

  const [currentViewDate, setCurrentViewDate] = useState<Date>(new Date());

  const currentYear = currentViewDate.getFullYear();
  const currentMonth = currentViewDate.getMonth();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanksArray = Array.from({ length: firstDayIndex }, (_, i) => i);

  const handlePrevMonth = () => {
    // Set lùi lại 1 tháng. JavaScript tự động lùi năm nếu tháng < 0
    setCurrentViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    // Set tiến lên 1 tháng. JavaScript tự động tăng năm nếu tháng > 11
    setCurrentViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const hanndleSelect = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    setSelectDate(newDate);
    setCurrentViewDate(newDate);
    setIsShowPicker(false);
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setIsShowPicker((prev) => !prev)}
        className="gap-4"
      >
        <span>
          {selectDate.toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
        <CalendarIcon weight="bold" />
      </Button>

      {isShowPicker && (
        <div
          className={cn(
            "absolute left-0 z-50 w-66.75 rounded-lg shadow-md bg-box text-box-foreground",
            sideXCalendar[sideX],
            sideYCalendar[sideY],
          )}
        >
          <div className="rounded-t-lg bg-primary text-primary-foreground text-sm flex justify-center items-center gap-1">
            <Button size="icon-sm" onClick={handlePrevMonth}>
              <CaretLeftIcon weight="bold" />
            </Button>
            <h3 className="font-semibold">
              Tháng {currentMonth + 1}, {currentYear}
            </h3>
            <Button size="icon-sm" onClick={handleNextMonth}>
              <CaretRightIcon weight="bold" />
            </Button>
          </div>
          <div className="p-1">
            <div className="grid grid-cols-7 [&_div]:p-2 [&_div]:font-semibold text-sm">
              <div className="text-primary">CN</div>
              <div>T2</div>
              <div>T3</div>
              <div>T4</div>
              <div>T5</div>
              <div>T6</div>
              <div>T7</div>
            </div>
            <div className="grid grid-cols-7 text-center text-sm">
              {blanksArray.map((b) => (
                <div key={`blank-${b}`} />
              ))}

              {daysArray.map((d) => {
                const isToday =
                  d === new Date().getDate() &&
                  currentMonth === new Date().getMonth() &&
                  currentYear === new Date().getFullYear();

                const isSelect = d === selectDate.getDate();
                return (
                  <Button
                    key={`day-${d}`}
                    type="button"
                    variant={isSelect ? "primary" : "ghost"}
                    size="icon-sm"
                    onClick={() => hanndleSelect(d)}
                    className={cn(
                      "",
                      !isSelect && !isToday && "hover:text-primary",
                    )}
                  >
                    {d}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
