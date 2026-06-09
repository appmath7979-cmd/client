import type { MessageInputType } from "#/types/common.type";
import type { RegionType } from "#/types/reward.type";

interface IFuncReturn {
  messages: MessageInputType;
  validated: string[];
}

function validateMessage(opts: {
  value: string;
  region: RegionType;
}): IFuncReturn {
  const { value, region } = opts;
  const text = value.trim();

  const arrValue = text.split(/\s/);
  const checkHasStation = arrValue.find((item) => /[a-zA-Z]+$/.test(item));
  let messageTxt = "";

  if (region === "mien-bac" && checkHasStation)
    return {
      messages: {
        message: "Miền Bắc không nhập tên đài hoặc Cú pháp không hợp lệ!",
        status: "error" as "error",
      },
      validated: [],
    };

  if (region !== "mien-bac" && !checkHasStation) {
    if (region === "mien-nam")
      messageTxt = "Miền Nam không được để trống tên đài!";
    else messageTxt = "Miền Trung không được để trống tên đài!";
    return {
      messages: {
        message: messageTxt,
        status: "error" as "error",
      },
      validated: [],
    };
  }

  let splitValues: Array<string[]> = [];
  let prevData: string = "";
  let nextData: string = "";

  if (region === "mien-bac") {
    let stackNumber: string[] = [];
    let stackStringAndNumber: string[] = [];
    for (let i = 0; i < arrValue.length; i++) {
      const currentVal = arrValue[i];
      prevData = arrValue[i - 1] || "";
      nextData = arrValue[i + 1] || "";
      const isNumber = /^\d+$/.test(currentVal);

      if (currentVal === ";") continue;

      if (isNumber) {
        if (!nextData) {
          return {
            messages: {
              message: "Chưa nhập Cú pháp và Điểm!",
              status: "error",
            },
            validated: [],
          };
        }
        if (nextData === ";" && /^\d+$/.test(arrValue[i + 2]))
          stackNumber = [...stackNumber, `${currentVal + nextData}`];
        else
          return {
            messages: {
              message: "Cú pháp không hợp lệ!",
              status: "error",
            },
            validated: [],
          };
        stackNumber = [...stackNumber, currentVal];
      }
      if (/^[a-zA-Z]+\d+$/.test(currentVal)) {
        if (!prevData)
          return {
            messages: {
              message:
                "Chưa nhập Số/Cặp đánh! Số/Cặp đánh phải đứng trước cú pháp.",
              status: "error",
            },
            validated: [],
          };
        stackStringAndNumber = [...stackStringAndNumber, currentVal];
      }

      if (!nextData || /^\d+$/.test(nextData)) {
        if (stackNumber.length > 0 && stackStringAndNumber.length > 0) {
          const group = [];
          for (const str of stackStringAndNumber) {
            for (const num of stackNumber) {
              group.push([str, num]);
            }
          }
          splitValues.push(group.flat());

          // Reset stack sau khi đã đẩy dữ liệu
          stackNumber = [];
          stackStringAndNumber = [];
        }
      }
    }
  } else {
    let stackNumber: string[] = [];
    let stackStringAndNumber: string[] = [];
    let stackString: string = "";
    for (let i = 0; i < arrValue.length; i++) {
      const currentVal = arrValue[i];
      prevData = arrValue[i - 1] || "";
      nextData = arrValue[i + 1] || "";

      if (currentVal === ";") continue;

      const isChar = /^[a-zA-Z]+$/.test(currentVal);

      if (isChar) {
        if (!prevData) stackString = currentVal;
        if (!nextData || !/^\d+$/.test(nextData))
          return {
            messages: {
              message:
                "Chưa nhập Số/Cặp đánh! Số/Cặp đánh phải đứng trước cú pháp.",
              status: "error",
            },
            validated: [],
          };
        if (/^[a-zA-Z]+\d+$/.test(prevData)) stackString = currentVal;
      }

      if (/^\d+$/.test(currentVal)) {
        if (!nextData || /^[a-zA-Z]+$/.test(nextData))
          return {
            messages: {
              message: "Chưa nhập Cú pháp và Điểm!",
              status: "error",
            },
            validated: [],
          };
      }
    }
  }

  console.log(splitValues);

  return {
    messages: {
      message: "Tin nhắn hợp lệ.",
      status: "success" as "success",
    },
    validated: [],
  };
}

export { validateMessage };
