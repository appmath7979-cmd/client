import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { InputBox } from "#/components/create-customer/InputBox";
import { InputToggle } from "#/components/create-customer/InputToggle";
import { RadioSelect } from "#/components/create-customer/RadioSelect";
import { Button } from "#/components/ui/Button";
import { CreateCustomerSchema } from "#/schemas/create-customer.schema";
import type { CreateCustomerType } from "#/types/create-customer.type";
import {
  centralRegion,
  northRegion,
  regions,
  southRegion,
} from "#/constants/create-customer.constant";
import {
  TabContent,
  Tabs,
  TabTrigger,
  TabTriggerGroup,
} from "#/components/ui/Tabs";
import { useState } from "react";
import { InputBox2 } from "#/components/create-customer/InputBox2";
import { cn } from "#/lib/utils";

export const Route = createFileRoute("/(main)/create-customer")({
  component: RouteComponent,
});

function RouteComponent() {
  const [regionSelect, setRegionSelect] = useState<"BAC" | "TRUNG" | "NAM">(
    "NAM",
  );

  const form = useForm({
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      type: "GUEST",
      loaiCo: "ti_le",
      xienMB: false,
      tinhUi: false,
      tinhTrungDaT: "ky_ruoi",
      tinhTrungDaX: "ky_ruoi",
      settings: {
        BAC: northRegion,
        TRUNG: centralRegion,
        NAM: southRegion,
      },
    } as CreateCustomerType,
    validators: {
      onChange: CreateCustomerSchema,
    },
    onSubmit: async () => {},
  });

  return (
    <div className="py-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="w-full max-w-3xl mx-auto"
      >
        <h1 className="font-semibold text-xl uppercase mb-4">
          Thông tin khách hàng
        </h1>
        <div className="rounded-md shadow-md p-6 bg-box flex flex-col gap-6">
          <form.Field
            name="fullName"
            asyncDebounceMs={500}
            children={({ name, state, handleChange }) => {
              const { meta, value } = state;
              return (
                <InputBox
                  name={name}
                  type="string"
                  label="Họ và tên"
                  value={value}
                  onValueChange={(val) => handleChange(String(val))}
                  errorContent={
                    meta.isDirty && meta.errors.length > 0
                      ? meta.errors[0]?.message
                      : ""
                  }
                  placeholder="Nguyen Van A"
                />
              );
            }}
          />
          <hr className="text-accent" />
          <form.Field
            name="phoneNumber"
            asyncDebounceMs={500}
            children={({ name, state, handleChange }) => {
              const { meta, value } = state;
              return (
                <InputBox
                  name={name}
                  type="string"
                  label="Số điện thoại"
                  value={value}
                  onValueChange={(val) => handleChange(String(val))}
                  errorContent={
                    meta.isDirty && meta.errors.length > 0
                      ? meta.errors[0]?.message
                      : ""
                  }
                  placeholder="Số điện thoại"
                />
              );
            }}
          />
        </div>
        <form.Field
          name="type"
          children={({ state, handleChange }) => {
            const handleValueChange = (value: boolean[]) => {
              if (value[0]) {
                handleChange("GUEST");
              } else handleChange("OWNER");
            };
            return (
              <InputToggle
                labels={["Khách", "Chủ"]}
                value={[state.value === "GUEST", state.value === "OWNER"]}
                onValueChange={handleValueChange}
              />
            );
          }}
        />
        <div className="rounded-md shadow-md p-6 bg-box space-y-6 mt-8">
          <form.Field
            name="loaiCo"
            children={({ state, handleChange }) => {
              const handleValueChange = (value: boolean[]) => {
                if (value[0]) {
                  handleChange("ti_le");
                } else handleChange("thanh_tien");
              };
              return (
                <RadioSelect
                  title="Loại cò"
                  labels={["Tỉ lệ", "Thành tiền"]}
                  value={[
                    state.value === "ti_le",
                    state.value === "thanh_tien",
                  ]}
                  onValueChange={handleValueChange}
                />
              );
            }}
          />
          <form.Field
            name="xienMB"
            children={({ state, handleChange }) => {
              const handleValueChange = (value: boolean[]) => {
                if (value[0]) {
                  handleChange(true);
                } else handleChange(false);
              };
              return (
                <RadioSelect
                  title="Xiên 2-3-4 Miền Bắc"
                  labels={["Cho phép", "Không"]}
                  value={[state.value, !state.value]}
                  onValueChange={handleValueChange}
                />
              );
            }}
          />
          <form.Field
            name="tinhUi"
            children={({ state, handleChange }) => {
              const handleValueChange = (value: boolean[]) => {
                if (value[0]) {
                  handleChange(true);
                } else handleChange(false);
              };
              return (
                <RadioSelect
                  title="Tính Ủi"
                  labels={["Cho phép", "Không"]}
                  value={[state.value, !state.value]}
                  onValueChange={handleValueChange}
                />
              );
            }}
          />
        </div>
        <Tabs className="rounded-md shadow-md p-6 bg-box space-y-6 mt-8">
          <TabTriggerGroup className="rounded-md grid grid-cols-3 gap-4">
            {regions.map((item) => (
              <TabTrigger
                key={item.key}
                onClick={() => setRegionSelect(item.value)}
                className={cn(
                  regionSelect === item.value && "text-primary border-primary",
                )}
              >
                {item.label}
              </TabTrigger>
            ))}
          </TabTriggerGroup>
          <hr />
          <TabContent className="space-y-8">
            <div className="flex items-center gap-10">
              <h2 className="w-1/2 font-semibold text-lg">Cò</h2>
              <h2 className="w-1/2 font-semibold text-lg">Trúng</h2>
            </div>
            {form
              .getFieldValue(`settings.${regionSelect}`)
              .map((item, index) => (
                <div
                  key={`${regionSelect}.${index}`}
                  className="flex items-center gap-10"
                >
                  <form.Field
                    name={`settings.${regionSelect}[${index}].c`}
                    children={({ state, handleChange }) => (
                      <InputBox2
                        label={item.label}
                        value={state.value}
                        onValueChange={handleChange}
                      />
                    )}
                  />
                  <form.Field
                    name={`settings.${regionSelect}[${index}].t`}
                    children={({ state, handleChange }) => (
                      <InputBox2
                        label={item.label}
                        value={state.value}
                        onValueChange={handleChange}
                      />
                    )}
                  />
                </div>
              ))}
          </TabContent>
        </Tabs>
        <div className="rounded-md shadow-md p-6 bg-box space-y-6 mt-8">
          <form.Field
            name="tinhTrungDaT"
            children={({ state, handleChange }) => {
              const handleValueChange = (value: boolean[]) => {
                if (value[0]) handleChange("1_lan");
                if (value[1]) handleChange("ky_ruoi");
                if (value[2]) handleChange("nhieu_lan");
              };
              return (
                <RadioSelect
                  title="Tính trúng Đá thẳng"
                  labels={["1 lần", "ky rưỡi", "nhiều cặp"]}
                  value={[
                    state.value === "1_lan",
                    state.value === "ky_ruoi",
                    state.value === "nhieu_lan",
                  ]}
                  onValueChange={handleValueChange}
                />
              );
            }}
          />
          <form.Field
            name="tinhTrungDaX"
            children={({ state, handleChange }) => {
              const handleValueChange = (value: boolean[]) => {
                if (value[0]) handleChange("1_lan");
                if (value[1]) handleChange("ky_ruoi");
                if (value[2]) handleChange("nhieu_lan");
              };
              return (
                <RadioSelect
                  title="Tính trúng Đá thẳng"
                  labels={["1 lần", "ky rưỡi", "nhiều cặp"]}
                  value={[
                    state.value === "1_lan",
                    state.value === "ky_ruoi",
                    state.value === "nhieu_lan",
                  ]}
                  onValueChange={handleValueChange}
                />
              );
            }}
          />
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              size="xl"
              disabled={!canSubmit}
              type="submit"
              className="w-full shadow-md mt-8"
            >
              {isSubmitting ? "Đang xử lý..." : "Lưu thông tin"}
            </Button>
          )}
        />
      </form>
    </div>
  );
}
