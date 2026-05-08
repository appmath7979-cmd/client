import { Button } from "#/components/ui/Button";
import { Input } from "#/components/ui/Input";
import { Label } from "#/components/ui/Label";
import { SignUpSchema } from "#/schemas/auth.schema";
import type { SignUpType } from "#/types/auth.type";
import { EyeClosedIcon, EyeIcon } from "@phosphor-icons/react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/(auth)/sign-up")({
  staticData: { showHeader: false },
  component: RouteComponent,
});

function RouteComponent() {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] =
    useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    } as SignUpType,
    validators: {
      onChange: SignUpSchema,
    },
    onSubmit: async () => {},
  });
  return (
    <div className="h-dvh grid place-items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="w-full max-w-md rounded-md shadow-md p-6 space-y-8 bg-box text-box-foreground"
      >
        <h1 className="font-bold text-lg text-primary">Đăng ký tài khoản</h1>
        <div className="space-y-4">
          <form.Field
            name="username"
            children={({ name, state, handleChange }) => (
              <div className="flex max-sm:flex-col gap-x-4 gap-y-1">
                <Label htmlFor={name} className="w-35">
                  Tên tài khoản
                </Label>
                <div className="flex flex-col gap-0.5">
                  <Input
                    id={name}
                    value={state.value}
                    onChange={(e) => handleChange(e.target.value)}
                    danger={state.meta.errors.length > 0}
                  />
                  {state.meta.errors.length > 0 && state.meta.isDirty && (
                    <em className="text-sm text-destructive">
                      {state.meta.errors[0]?.message}
                    </em>
                  )}
                </div>
              </div>
            )}
          />
          <form.Field
            name="phoneNumber"
            children={({ name, state, handleChange }) => (
              <div className="flex max-sm:flex-col gap-x-4 gap-y-1">
                <Label htmlFor={name} className="w-35">
                  Số điện thoại
                </Label>
                <div className="flex flex-col gap-0.5">
                  <Input
                    id={name}
                    type="tel"
                    value={state.value}
                    onChange={(e) => handleChange(e.target.value)}
                    danger={state.meta.errors.length > 0}
                  />
                  {state.meta.errors.length > 0 && state.meta.isDirty && (
                    <em className="text-sm text-destructive">
                      {state.meta.errors[0]?.message}
                    </em>
                  )}
                </div>
              </div>
            )}
          />
          <form.Field
            name="password"
            children={({ name, state, handleChange }) => (
              <div className="flex max-sm:flex-col gap-x-4 gap-y-1">
                <Label htmlFor={name} className="w-35">
                  Mật khẩu
                </Label>
                <div className="flex flex-col gap-0.5">
                  <div className="relative w-full">
                    <Input
                      id={name}
                      value={state.value}
                      type={isShowPassword ? "text" : "password"}
                      onChange={(e) => handleChange(e.target.value)}
                      danger={state.meta.errors.length > 0}
                      className="w-full"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setIsShowPassword((prev) => !prev)}
                      className="absolute top-1/2 -translate-y-1/2 right-0"
                    >
                      {isShowPassword ? <EyeClosedIcon /> : <EyeIcon />}
                    </Button>
                  </div>
                  {state.meta.errors.length > 0 && state.meta.isDirty && (
                    <em className="text-sm text-destructive">
                      {state.meta.errors[0]?.message}
                    </em>
                  )}
                </div>
              </div>
            )}
          />
          <form.Field
            name="confirmPassword"
            children={({ name, state, handleChange }) => (
              <div className="flex max-sm:flex-col gap-x-4 gap-y-1">
                <Label htmlFor={name} className="w-35 leading-5">
                  Xác nhân mật khẩu
                </Label>
                <div className="flex flex-col gap-0.5">
                  <div className="relative w-full">
                    <Input
                      id={name}
                      value={state.value}
                      type={isShowConfirmPassword ? "text" : "password"}
                      onChange={(e) => handleChange(e.target.value)}
                      danger={state.meta.errors.length > 0}
                      className="w-full"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setIsShowConfirmPassword((prev) => !prev)}
                      className="absolute top-1/2 -translate-y-1/2 right-0"
                    >
                      {isShowConfirmPassword ? <EyeClosedIcon /> : <EyeIcon />}
                    </Button>
                  </div>
                  {state.meta.errors.length > 0 && state.meta.isDirty && (
                    <em className="text-sm text-destructive">
                      {state.meta.errors[0]?.message}
                    </em>
                  )}
                </div>
              </div>
            )}
          />
        </div>
        <div className="space-y-2 text-center">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button size="lg" disabled={!canSubmit} className="w-full">
                {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
              </Button>
            )}
          />
          <p className="font-semibold text-sm">
            <span>Bạn đã có tài khoản? </span>
            <Link to="/sign-in" className="text-primary hover:underline">
              Đăng nhập tại đây
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
