import { useAppStore } from "@lavaz/store";
import { QuestionMarkIcon } from "@phosphor-icons/react";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { TutorialDialog } from "#/components/tutorials/TutorialDialog";
import { Button } from "#/components/ui/button";
import { Dialog, DialogTrigger } from "#/components/ui/dialog";
import { Label } from "#/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "#/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "#/components/ui/tooltip";
import { Textarea } from "#/components/ui/textarea";
import {
  centralStationList,
  fourTargetForSyntaxList,
  southStationList,
  stationList,
  threeTargetForSyntaxList,
  twoTargetForSyntaxList,
} from "#/constants/content-parse.contant";
import { useDebounce } from "#/hooks/useDebounce";
import { cn } from "#/lib/utils";
import { formatDate } from "#/lib/format-date";
import type { ITransContent } from "#/types/transaction.type";
import { store } from "#/store/store";
import { usePostTrans } from "#/hooks/query/useTransQuery";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import { regionConstanst } from "#/constants/station.constanst";
import { validateMessage } from "#/lib/validateMessage";
import type { MessageInputType } from "#/types/common.type";

export const Route = createFileRoute("/(app)/customer/$customerId/add")({
  component: RouteComponent,
});

function RouteComponent() {
  const { customerId } = useParams({ from: "/(app)/customer/$customerId/add" });
  const [{ regions, value: regionValue }, { setValue: onSetValue }] =
    useAppStore(store.regionDropdown, (s) => s);
  const [value, setValue] = useState<string>("");
  const [messages, setMessage] = useState<MessageInputType>({
    message: "Chưa nhập tin nhắn!",
    status: "error",
  });
  const [valueValidated, setValueValidated] = useState<Array<string[]>>([]);
  const [parsed, setParsed] = useState<Array<Array<string | number>>>([]);
  const { mutate } = usePostTrans(customerId);

  const debounce = useDebounce(value);

  function checkValue(values: Array<string[]>) {
    const result = values.flatMap((subArr) => {
      const station = subArr[0]; // 'dn'
      const pairs = [];

      // Duyệt từ phần tử thứ 2 (index 1) đến cuối
      // Chúng ta nhảy bước 2 để lấy cặp (số, cú pháp)
      for (let i = 1; i < subArr.length; i += 2) {
        const number = subArr[i];
        const syntax = subArr[i + 1];

        // Nếu có đủ cặp thì thêm vào kết quả
        if (number !== undefined && syntax !== undefined) {
          pairs.push([station, number, syntax]);
        }
      }
      return pairs;
    });

    console.log(result);

    const parseValue = result.map((subArr) =>
      subArr.map((item) => {
        if (!item || item.trim() === "") return item;

        if (/[a-zA-Z]/.test(item) && /\d/.test(item)) {
          const letter = item.replace(/\d/g, "");
          const number = item.replace(/[a-zA-Z]/g, "");
          return [letter, number] as const;
        } else if (/^\d+$/.test(item)) return Number(item);
        else return item;
      }),
    );

    // 2. Bước Format (xử lý tổ hợp số)
    // Sử dụng flatMap để làm phẳng các cặp tổ hợp ngay lập tức
    const processed = parseValue.flatMap((subArray) => {
      const numbers = subArray.filter(
        (val): val is number => typeof val === "number",
      );
      const nested = subArray.filter((val) => Array.isArray(val)) as (
        | string
        | number
      )[][];
      const others = subArray.filter(
        (val) => typeof val !== "number" && !Array.isArray(val) && val !== "",
      );

      if (numbers.length >= 2) {
        const combinations: any[] = [];
        for (let i = 0; i < numbers.length; i++) {
          for (let j = i + 1; j < numbers.length; j++) {
            combinations.push([...others, [numbers[i], numbers[j]], ...nested]);
          }
        }
        return combinations;
      }
      return [[...others, ...numbers, ...nested]];
    });

    const finalResults = processed.map((item) => {
      if (!Array.isArray(item)) return item;

      return item.flatMap((element) => {
        // 1. Nếu là mảng số [10, 20] -> giữ nguyên
        if (
          Array.isArray(element) &&
          element.every((e) => typeof e === "number")
        ) {
          return [element];
        }

        // 2. Nếu là mảng KHÔNG PHẢI số (như ["b", 5]) -> trải phẳng nó ra
        if (Array.isArray(element)) {
          return element;
        }

        // 3. Các thành phần đơn lẻ (như "tp", 10) -> trả về dưới dạng mảng để flatMap trải ra
        return element;
      });
    });
    setParsed(finalResults);
    // const finalResults = values.flatMap((subArr) => {
    // 	const station = subArr[0];
    // 	const results: any[] = [];

    // 	// Duyệt theo cặp [số, cú pháp]
    // 	for (let i = 1; i < subArr.length; i += 2) {
    // 		const numRaw = subArr[i];
    // 		const synRaw = subArr[i + 1];
    // 		if (!numRaw || !synRaw) continue;

    // 		// 1. Tách cú pháp: 'b10' -> ['b', '10']
    // 		const synMatch = synRaw.match(/([a-zA-Z]+)(\d+)?/);
    // 		const syntax = synMatch ? synMatch[1] : synRaw;

    // 		// 2. Tách số (nếu có nhiều số được ngăn cách bởi dấu chấm/khoảng trắng)
    // 		const numbers = numRaw
    // 			.split(/[\s.]+/)
    // 			.map(Number)
    // 			.filter((n) => !isNaN(n));

    // 		// 3. Xử lý tổ hợp (nếu có từ 2 số trở lên)
    // 		if (numbers.length >= 2) {
    // 			for (let idx1 = 0; idx1 < numbers.length; idx1++) {
    // 				for (let idx2 = idx1 + 1; idx2 < numbers.length; idx2++) {
    // 					results.push([station, [numbers[idx1], numbers[idx2]], syntax]);
    // 				}
    // 			}
    // 		} else {
    // 			results.push([station, numbers[0], syntax]);
    // 		}
    // 	}
    // 	return results;
    // });

    // console.log("Kết quả cuối cùng:", finalResults);
  }

  async function handleSave() {
    const date = formatDate(new Date());
    if (!date) return;

    const regionName =
      regionValue === "mien-bac"
        ? "NORTH"
        : regionValue === "mien-nam"
          ? "SOUTH"
          : "CENTRAL";

    if (parsed.length === 0) return;

    const data: ITransContent[] = parsed.map((item) => {
      return {
        region: regionName,
        score: Number(item[3]),
        station: String(item[0]),
        syntax: String(item[2]),
        target: Array.isArray(item[1])
          ? item[1].map((item) => Number(item))
          : Number(item[1]),
      };
    });

    await mutate({ release: date, content: data, customerId });
  }

  useEffect(() => {
    if (!debounce.trim()) {
      setMessage({ message: "Chưa nhập tin nhắn!", status: "error" });
      return;
    }
    const { messages } = validateMessage({
      value: debounce,
      region: regionValue,
    });

    setMessage(messages);
  }, [debounce, regionValue]);

  useEffect(() => {
    if (valueValidated.length === 0) {
      setParsed([]);
      return;
    }
  }, [valueValidated]);

  return (
    <Dialog>
      <div className="py-2">
        <div className="flex justify-end items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"}>
                {regionConstanst[regionValue]}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {regions.map((region) => (
                <DropdownMenuItem
                  key={region}
                  onClick={() => onSetValue(region)}
                >
                  {regionConstanst[region]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant={"outline"}
            disabled={
              valueValidated.length === 0 || messages.status === "error"
            }
            onClick={() => checkValue(valueValidated)}
          >
            Kiểm tra
          </Button>
          <Button
            disabled={messages.status === "error" || parsed.length === 0}
            onClick={handleSave}
          >
            Lưu tin
          </Button>
        </div>
        <div className="mt-4 space-y-8">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Button
                variant={"outline"}
                size={"sm"}
                asChild
                className="uppercase"
              >
                <Label htmlFor="text-area">nhập tin nhắn</Label>
              </Button>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Button variant={"ghost"} size={"icon-sm"}>
                      <QuestionMarkIcon weight="fill" />
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent side="left">Hướng dẫn</TooltipContent>
              </Tooltip>
            </div>
            <Textarea
              id="text-area"
              placeholder="VD: tp 10 b10..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="resize-none"
            />
          </div>
          <em
            className={cn(
              "px-2 py-1.5 rounded-md border block text-sm",
              messages.message && messages.status === "error"
                ? "text-destructive"
                : "text-green-600",
            )}
          >
            {messages.message}
          </em>
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="*:text-center">
                  <TableHead>Tên đài</TableHead>
                  <TableHead>Số/Cặp đánh</TableHead>
                  <TableHead>Cú pháp</TableHead>
                  <TableHead>Điểm</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parsed.length > 0 ? (
                  parsed.map((parse, i) => {
                    const keyName = `${parse.join("-")}-${i}`;
                    return (
                      <TableRow key={keyName}>
                        {parse.map((item, index) => {
                          const key =
                            typeof item === "number"
                              ? `${item * index}-${i}-${index}`
                              : Array.isArray(item)
                                ? `${item.join("-")}-${i}-${index}`
                                : `${item}-${i}`;
                          return (
                            <TableCell key={key} className="text-center">
                              {Array.isArray(item) ? item.join("-") : item}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center font-semibold text-muted-foreground"
                    >
                      Chưa có tin nhắn
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <TutorialDialog />
    </Dialog>
  );
}
