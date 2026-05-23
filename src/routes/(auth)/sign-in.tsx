import { Button } from "#/components/ui/Button";
import TextField from "#/components/ui/field/TextField";
import { Spinner } from "#/components/ui/Spinner";
import { useAuthForm } from "#/hooks/forms/useAuthForm";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/sign-in")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useAuthForm().signInForm;
  return (
    <div className="relative h-[calc(100dvh-56px)]">
      <form className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl rounded-3xl shadow-lg p-6 space-y-8">
        <h1 className="font-bold text-xl tracking-wide">
          Đăng nhập vào tài khoản
        </h1>
        <div className="space-y-4 sm:space-y-8">
          <form.Field
            name="username"
            children={({ name, state, handleChange }) => {
              const { isDirty, errors } = state.meta;
              return (
                <TextField
                  id={`${name}-input`}
                  type="text"
                  required
                  label="Username"
                  placeholder="Username"
                  value={state.value}
                  onChange={(e) => handleChange(e.target.value)}
                  errorContent={
                    (isDirty && errors.length > 0 && errors[0]?.message) || ""
                  }
                />
              );
            }}
          />
          <form.Field
            name="password"
            children={({ name, state, handleChange }) => {
              const { isDirty, errors } = state.meta;
              return (
                <TextField
                  id={`${name}-input`}
                  type="text"
                  required
                  label="Mật khẩu"
                  placeholder="Mật khẩu"
                  value={state.value}
                  onChange={(e) => handleChange(e.target.value)}
                  errorContent={
                    (isDirty && errors.length > 0 && errors[0]?.message) || ""
                  }
                />
              );
            }}
          />
        </div>
        <div className="text-center space-y-2">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit} className="w-full">
                {isSubmitting ? (
                  <>
                    <Spinner />
                    <span>Đang xử lý...</span>
                  </>
                ) : (
                  "Đăng nhập"
                )}
              </Button>
            )}
          />
          <p className="text-sm">
            Bạn chưa có tài khoản?{" "}
            <Link
              to="/sign-up"
              className="font-semibold text-primary underline"
            >
              Đăng ký tại đây
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
