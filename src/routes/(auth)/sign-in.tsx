import { authApi } from "#/apis/auth.api";
import { Button } from "#/components/ui/Button";
import { Input } from "#/components/ui/Input";
import { Label } from "#/components/ui/Label";
import { useToaster } from "#/hooks/useToaster";
import { cn } from "#/lib/utils";
import { SignInSchema } from "#/schemas/auth.schema";
import type { SignInType } from "#/types/auth.type";
import { CheckIcon, EyeClosedIcon, EyeIcon } from "@phosphor-icons/react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/(auth)/sign-in")({
  staticData: { showHeader: false },
  component: RouteComponent,
});

function RouteComponent() {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const toast = useToaster();

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
      isRemember: false,
    } as SignInType,
    validators: {
      onChange: SignInSchema,
    },
    onSubmit: async ({ value }) => {
      // const res = await authApi.signIn(value);
      // console.log(res);
      toast.error({ message: "Sign in success" });
    },
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
        <h1 className="font-bold text-lg text-primary">Đăng nhập</h1>
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

          <div className="font-semibold text-sm flex justify-between items-center">
            <form.Field
              name="isRemember"
              children={({ state, handleChange }) => (
                <Label className="flex items-center gap-1 group">
                  <Input
                    type="checkbox"
                    hidden
                    checked={state.value}
                    onChange={() => handleChange(!state.value)}
                  />
                  <div
                    className={cn(
                      "relative size-3 border ring rounded-xs transition-smooth group-hover:border-primary group-hover:ring-primary",
                      state.value && "border-primary ring-primary",
                    )}
                  >
                    <CheckIcon
                      size={12}
                      weight="bold"
                      className={cn(
                        "absolute top-1/2 left-1/2 -translate-1/2 text-transparent",
                        state.value && "text-primary",
                      )}
                    />
                  </div>
                  <p className="transition-smooth group-hover:text-primary">
                    Ghi nhớ đăng nhập
                  </p>
                </Label>
              )}
            />
            <Link
              to="/reset-password"
              className="transition-smooth hover:text-primary"
            >
              Quên mật khẩu?
            </Link>
          </div>
        </div>
        <div className="space-y-2 text-center">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button size="lg" disabled={!canSubmit} className="w-full">
                {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
              </Button>
            )}
          />
          <p className="font-semibold text-sm">
            <span>Bạn chưa có tài khoản? </span>
            <Link to="/sign-up" className="text-primary hover:underline">
              Đăng ký tại đây
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
