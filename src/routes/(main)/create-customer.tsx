import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { CreateCustomerSchema } from "#/schemas/create-customer.schema";
import { Label } from "#/components/ui/Label";
import { Input } from "#/components/ui/Input";
import type {
  CreateCustomerType,
  RegionPattenType,
} from "#/types/create-customer.type";
import {
  regionStateNorthCo,
  regionStateNorthTrung,
  regionStateCentralCo,
  regionStateCentralTrung,
  regionStateSouthCo,
  regionStateSouthTrung,
  labelNorth,
  labelSouthCentral,
} from "#/constants/create-customer.constant";
import { CheckIcon } from "@phosphor-icons/react";
import { cn } from "#/lib/utils";
import {
  TabContent,
  Tabs,
  TabTrigger,
  TabTriggerGroup,
} from "#/components/ui/Tabs";
import { useCallback, useMemo, useState } from "react";
import { Button } from "#/components/ui/Button";

export const Route = createFileRoute("/(main)/create-customer")({
  component: RouteComponent,
});

function RouteComponent() {
  const [regionSelect, setRegionSelect] = useState<0 | 1 | 2>(2);

  const handleSelectRegion = useCallback(
    (regionName: string) => {
      console.log(regionName);
      if (regionName === "MienBac") setRegionSelect(0);
      if (regionName === "MienTrung") setRegionSelect(1);
      if (regionName === "MienNam") setRegionSelect(2);
    },
    [setRegionSelect],
  );

  const currentSetting = useMemo(() => {
    if (regionSelect === 0) return labelNorth;
    return labelSouthCentral;
  }, [regionSelect]);

  const form = useForm({
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      type: "GUEST",
      setting: {
        loaiCo: "ti_le",
        tinhTrungDaThang: "ky_ruoi",
        tinhTrungDaXien: "ky_ruoi",
        tinhUi: false,
        xienMienBac: false,
        regions: [
          {
            regionName: "MienBac",
            coSetting: regionStateNorthCo,
            trungSetting: regionStateNorthTrung,
          },
          {
            regionName: "MienTrung",
            coSetting: regionStateCentralCo,
            trungSetting: regionStateCentralTrung,
          },
          {
            regionName: "MienNam",
            coSetting: regionStateSouthCo,
            trungSetting: regionStateSouthTrung,
          },
        ],
      },
    } as CreateCustomerType,
    validators: {
      onChange: CreateCustomerSchema,
    },
    onSubmit: async (data) => {
      console.log(data);
    },
  });

  return (
    <div className="py-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <h2 className="font-semibold text-xl uppercase">
          thông tin khách hàng
        </h2>
        <div className="rounded-lg shadow-md px-6 py-4 bg-box text-box-foreground space-y-4">
          <form.Field
            name="fullName"
            children={({ name, state, handleChange }) => (
              <div className="input-type--field">
                <Label htmlFor={name}>Họ và tên</Label>
                <div className="w-full">
                  <Input
                    id={name}
                    placeholder="Nguyen Van A"
                    value={state.value}
                    onChange={(e) => handleChange(e.target.value)}
                    danger={state.meta.errors.length > 0}
                  />
                  {state.meta.isDirty && state.meta.errors.length > 0 && (
                    <em className="text-sm text-destructive">
                      {state.meta.errors[0]?.message}
                    </em>
                  )}
                </div>
              </div>
            )}
          />
          <hr />
          <form.Field
            name="phoneNumber"
            children={({ name, state, handleChange }) => (
              <div className="input-type--field">
                <Label htmlFor={name}>Số điện thoại</Label>
                <div className="w-full">
                  <Input
                    id={name}
                    type="tel"
                    placeholder="Số điện thoại"
                    value={state.value}
                    onChange={(e) => handleChange(e.target.value)}
                    danger={state.meta.errors.length > 0}
                  />
                  {state.meta.isDirty && state.meta.errors.length > 0 && (
                    <em className="text-sm text-destructive">
                      {state.meta.errors[0]?.message}
                    </em>
                  )}
                </div>
              </div>
            )}
          />
        </div>

        <form.Field
          name="type"
          children={({ state, handleChange }) => (
            <div className="flex justify-between items-center gap-3 mt-4">
              <Label
                className={cn(
                  "w-1/2 border border-transparent rounded-md shadow-md flex justify-center gap-1 items-center bg-box p-4 transition-smooth",
                  state.value === "GUEST" && "border-primary text-primary",
                )}
              >
                <Input
                  type="radio"
                  hidden
                  checked={state.value === "GUEST"}
                  onChange={() => handleChange("GUEST")}
                />
                {state.value === "GUEST" && (
                  <CheckIcon size={20} weight="bold" />
                )}
                <p>Khách</p>
              </Label>
              <Label
                className={cn(
                  "w-1/2 border border-transparent rounded-md shadow-md p-4 flex justify-center gap-1 items-center bg-box transition-smooth",
                  state.value === "OWNER" && "border-primary text-primary",
                )}
              >
                <Input
                  type="radio"
                  hidden
                  checked={state.value === "OWNER"}
                  onChange={() => handleChange("OWNER")}
                />
                {state.value === "OWNER" && (
                  <CheckIcon size={20} weight="bold" />
                )}
                <p>Chủ</p>
              </Label>
            </div>
          )}
        />

        <div className="rounded-lg shadow-md px-6 py-4 space-y-8 bg-box mt-8">
          <form.Field
            name="setting.loaiCo"
            children={({ state, handleChange }) => (
              <div className="space-y-2">
                <p className="font-semibold text-lg">Loại cò</p>
                <div className="flex items-center gap-8">
                  <Label className="w-fit flex justify-center items-center gap-1">
                    <Input
                      type="radio"
                      hidden
                      checked={state.value === "ti_le" ? true : false}
                      onChange={() => handleChange("ti_le")}
                    />
                    <div
                      className={cn(
                        "relative size-5 rounded-full border-2 transition-smooth",
                        state.value === "ti_le" && "border-primary",
                      )}
                    >
                      <div
                        className={cn(
                          state.value === "ti_le" &&
                            "absolute size-3.5 top-1/2 left-1/2 -translate-1/2 rounded-full bg-primary",
                        )}
                      />
                    </div>
                    <p
                      className={cn(state.value === "ti_le" && "text-primary")}
                    >
                      Tỉ lệ
                    </p>
                  </Label>
                  <Label className="w-fit flex justify-center items-center gap-1">
                    <Input
                      type="radio"
                      hidden
                      checked={state.value === "thanh_tien" ? true : false}
                      onChange={() => handleChange("thanh_tien")}
                    />
                    <div
                      className={cn(
                        "relative size-5 rounded-full border-2 transition-smooth",
                        state.value === "thanh_tien" && "border-primary",
                      )}
                    >
                      <div
                        className={cn(
                          state.value === "thanh_tien" &&
                            "absolute size-3.5 top-1/2 left-1/2 -translate-1/2 rounded-full bg-primary",
                        )}
                      />
                    </div>
                    <p
                      className={cn(
                        state.value === "thanh_tien" && "text-primary",
                      )}
                    >
                      Thành tiền
                    </p>
                  </Label>
                </div>
              </div>
            )}
          />
          <form.Field
            name="setting.xienMienBac"
            children={({ state, handleChange }) => (
              <div className="space-y-2">
                <p className="font-semibold text-lg">Xiên 2-3-4 Miền Bắc</p>
                <div className="flex items-center gap-8">
                  <Label className="w-fit flex justify-center items-center gap-1">
                    <Input
                      type="radio"
                      hidden
                      checked={state.value ? true : false}
                      onChange={() => handleChange(true)}
                    />
                    <div
                      className={cn(
                        "relative size-5 rounded-full border-2 transition-smooth",
                        state.value && "border-primary",
                      )}
                    >
                      <div
                        className={cn(
                          state.value &&
                            "absolute size-3.5 top-1/2 left-1/2 -translate-1/2 rounded-full bg-primary",
                        )}
                      />
                    </div>
                    <p className={cn(state.value && "text-primary")}>
                      Cho phép
                    </p>
                  </Label>
                  <Label className="w-fit flex justify-center items-center gap-1">
                    <Input
                      type="radio"
                      hidden
                      checked={!state.value}
                      onChange={() => handleChange(false)}
                    />
                    <div
                      className={cn(
                        "relative size-5 rounded-full border-2 transition-smooth",
                        !state.value && "border-primary",
                      )}
                    >
                      <div
                        className={cn(
                          !state.value &&
                            "absolute size-3.5 top-1/2 left-1/2 -translate-1/2 rounded-full bg-primary",
                        )}
                      />
                    </div>
                    <p className={cn(!state.value && "text-primary")}>Không</p>
                  </Label>
                </div>
              </div>
            )}
          />
          <form.Field
            name="setting.tinhUi"
            children={({ state, handleChange }) => (
              <div className="space-y-2">
                <p className="font-semibold text-lg">Tính Ủi</p>
                <div className="flex items-center gap-8">
                  <Label className="w-fit flex justify-center items-center gap-1">
                    <Input
                      type="radio"
                      hidden
                      checked={state.value}
                      onChange={() => handleChange(true)}
                    />
                    <div
                      className={cn(
                        "relative size-5 rounded-full border-2 transition-smooth",
                        state.value && "border-primary",
                      )}
                    >
                      <div
                        className={cn(
                          state.value &&
                            "absolute size-3.5 top-1/2 left-1/2 -translate-1/2 rounded-full bg-primary",
                        )}
                      />
                    </div>
                    <p className={cn(state.value && "text-primary")}>
                      Cho phép
                    </p>
                  </Label>
                  <Label className="w-fit flex justify-center items-center gap-1">
                    <Input
                      type="radio"
                      hidden
                      checked={!state.value}
                      onChange={() => handleChange(false)}
                    />
                    <div
                      className={cn(
                        "relative size-5 rounded-full border-2 transition-smooth",
                        !state.value && "border-primary",
                      )}
                    >
                      <div
                        className={cn(
                          !state.value &&
                            "absolute size-3.5 top-1/2 left-1/2 -translate-1/2 rounded-full bg-primary",
                        )}
                      />
                    </div>
                    <p className={cn(!state.value && "text-primary")}>Không</p>
                  </Label>
                </div>
              </div>
            )}
          />
        </div>

        <Tabs className="mt-8">
          <form.Field
            name="setting.regions"
            children={({ state }) => (
              <>
                <TabTriggerGroup className="grid grid-cols-3 gap-1">
                  {state.value.map((item, index) => (
                    <TabTrigger
                      type="button"
                      key={item.regionName}
                      onClick={() => handleSelectRegion(item.regionName)}
                      className={cn(
                        regionSelect === index && "border-primary text-primary",
                      )}
                    >
                      {item.regionName === "MienBac"
                        ? "Miền Bắc"
                        : item.regionName === "MienTrung"
                          ? "Miền Trung"
                          : "Miền Nam"}
                    </TabTrigger>
                  ))}
                </TabTriggerGroup>
                <TabContent className="grid grid-cols-2 gap-6">
                  <div className="rounded-md shadow-md p-6 space-y-6 bg-box text-box-foreground">
                    <p className="font-semibold text-lg">Cò</p>
                    <div className="space-y-8">
                      {currentSetting.map((item) => {
                        const fieldName =
                          `setting.regions[${regionSelect}].coSetting.${item.key as keyof RegionPattenType}` as const;
                        return (
                          <form.Field
                            key={"co-" + item.key}
                            name={fieldName}
                            children={({ name, state, handleChange }) => (
                              <div className="relative">
                                <Label
                                  htmlFor={name}
                                  className="absolute -top-1/2 left-2 bg-box px-1 text-sm"
                                >
                                  {item.label}
                                </Label>
                                <Input
                                  id={name}
                                  type="number"
                                  value={state.value}
                                  onChange={(e) =>
                                    handleChange(Number(e.target.value))
                                  }
                                  step="any"
                                  className="w-full"
                                />
                              </div>
                            )}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div className="rounded-md shadow-md p-6 space-y-6 bg-box text-box-foreground">
                    <p className="font-semibold text-lg">Trúng</p>
                    <div className="space-y-8">
                      {currentSetting.map((item) => {
                        const fieldName =
                          `setting.regions[${regionSelect}].trungSetting.${item.key as keyof RegionPattenType}` as const;
                        return (
                          <form.Field
                            key={"co-" + item.key}
                            name={fieldName}
                            children={({ name, state, handleChange }) => (
                              <div className="relative">
                                <Label
                                  htmlFor={name}
                                  className="absolute -top-1/2 left-2 bg-box px-1 text-sm"
                                >
                                  {item.label}
                                </Label>
                                <Input
                                  id={name}
                                  type="number"
                                  value={state.value}
                                  onChange={(e) =>
                                    handleChange(Number(e.target.value))
                                  }
                                  step="any"
                                  className="w-full"
                                />
                              </div>
                            )}
                          />
                        );
                      })}
                    </div>
                  </div>
                </TabContent>
              </>
            )}
          />
        </Tabs>

        <div className="rounded-md shadow-md px-6 py-4 space-y-4 bg-box text-box-foreground mt-8">
          <form.Field
            name="setting.tinhTrungDaThang"
            children={({ state, handleChange }) => (
              <div className="space-y-2">
                <p className="font-semibold text-lg">Tính trúng Đá thẳng</p>
                <div className="flex items-center gap-6">
                  <Label className="w-fit flex justify-center items-center gap-1">
                    <Input
                      type="radio"
                      hidden
                      checked={state.value === "1_lan" ? true : false}
                      onChange={() => handleChange("1_lan")}
                    />
                    <div
                      className={cn(
                        "relative size-5 rounded-full border-2 transition-smooth",
                        state.value === "1_lan" && "border-primary",
                      )}
                    >
                      <div
                        className={cn(
                          state.value === "1_lan" &&
                            "absolute size-3.5 top-1/2 left-1/2 -translate-1/2 rounded-full bg-primary",
                        )}
                      />
                    </div>
                    <p
                      className={cn(state.value === "1_lan" && "text-primary")}
                    >
                      1 lần
                    </p>
                  </Label>
                  <Label className="w-fit flex justify-center items-center gap-1">
                    <Input
                      type="radio"
                      hidden
                      checked={state.value === "ky_ruoi" ? true : false}
                      onChange={() => handleChange("ky_ruoi")}
                    />
                    <div
                      className={cn(
                        "relative size-5 rounded-full border-2 transition-smooth",
                        state.value === "ky_ruoi" && "border-primary",
                      )}
                    >
                      <div
                        className={cn(
                          state.value === "ky_ruoi" &&
                            "absolute size-3.5 top-1/2 left-1/2 -translate-1/2 rounded-full bg-primary",
                        )}
                      />
                    </div>
                    <p
                      className={cn(
                        state.value === "ky_ruoi" && "text-primary",
                      )}
                    >
                      ky rưỡi
                    </p>
                  </Label>
                  <Label className="w-fit flex justify-center items-center gap-1">
                    <Input
                      type="radio"
                      hidden
                      checked={state.value === "nhieu_cap" ? true : false}
                      onChange={() => handleChange("nhieu_cap")}
                    />
                    <div
                      className={cn(
                        "relative size-5 rounded-full border-2 transition-smooth",
                        state.value === "nhieu_cap" && "border-primary",
                      )}
                    >
                      <div
                        className={cn(
                          state.value === "nhieu_cap" &&
                            "absolute size-3.5 top-1/2 left-1/2 -translate-1/2 rounded-full bg-primary",
                        )}
                      />
                    </div>
                    <p
                      className={cn(
                        state.value === "nhieu_cap" && "text-primary",
                      )}
                    >
                      nhiều cặp
                    </p>
                  </Label>
                </div>
              </div>
            )}
          />
          <form.Field
            name="setting.tinhTrungDaXien"
            children={({ state, handleChange }) => (
              <div className="space-y-2">
                <p className="font-semibold text-lg">Tính trúng Đá xiên</p>
                <div className="flex items-center gap-6">
                  <Label className="w-fit flex justify-center items-center gap-1">
                    <Input
                      type="radio"
                      hidden
                      checked={state.value === "1_lan" ? true : false}
                      onChange={() => handleChange("1_lan")}
                    />
                    <div
                      className={cn(
                        "relative size-5 rounded-full border-2 transition-smooth",
                        state.value === "1_lan" && "border-primary",
                      )}
                    >
                      <div
                        className={cn(
                          state.value === "1_lan" &&
                            "absolute size-3.5 top-1/2 left-1/2 -translate-1/2 rounded-full bg-primary",
                        )}
                      />
                    </div>
                    <p
                      className={cn(state.value === "1_lan" && "text-primary")}
                    >
                      1 lần
                    </p>
                  </Label>
                  <Label className="w-fit flex justify-center items-center gap-1">
                    <Input
                      type="radio"
                      hidden
                      checked={state.value === "ky_ruoi" ? true : false}
                      onChange={() => handleChange("ky_ruoi")}
                    />
                    <div
                      className={cn(
                        "relative size-5 rounded-full border-2 transition-smooth",
                        state.value === "ky_ruoi" && "border-primary",
                      )}
                    >
                      <div
                        className={cn(
                          state.value === "ky_ruoi" &&
                            "absolute size-3.5 top-1/2 left-1/2 -translate-1/2 rounded-full bg-primary",
                        )}
                      />
                    </div>
                    <p
                      className={cn(
                        state.value === "ky_ruoi" && "text-primary",
                      )}
                    >
                      ky rưỡi
                    </p>
                  </Label>
                  <Label className="w-fit flex justify-center items-center gap-1">
                    <Input
                      type="radio"
                      hidden
                      checked={state.value === "nhieu_cap" ? true : false}
                      onChange={() => handleChange("nhieu_cap")}
                    />
                    <div
                      className={cn(
                        "relative size-5 rounded-full border-2 transition-smooth",
                        state.value === "nhieu_cap" && "border-primary",
                      )}
                    >
                      <div
                        className={cn(
                          state.value === "nhieu_cap" &&
                            "absolute size-3.5 top-1/2 left-1/2 -translate-1/2 rounded-full bg-primary",
                        )}
                      />
                    </div>
                    <p
                      className={cn(
                        state.value === "nhieu_cap" && "text-primary",
                      )}
                    >
                      nhiều cặp
                    </p>
                  </Label>
                </div>
              </div>
            )}
          />
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              size="lg"
              disabled={!canSubmit}
              className="w-full uppercase mt-8"
            >
              {isSubmitting ? "đang lưu thông tin" : "lưu thông tin"}
            </Button>
          )}
        />
      </form>
    </div>
  );
}
