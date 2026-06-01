import { useForm } from "@tanstack/react-form-start";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ActionForm } from "#/components/form/auth/ActionForm";
import { PasswordField } from "#/components/form/auth/PasswordField";
import { UsernameField } from "#/components/form/auth/UsernameField";
import { Button } from "#/components/ui/button";
import { authValueDefaultConstant } from "#/constants/auth.constant";
import { useAuthQuery } from "#/hooks/query/useAuthQuery";
import { AuthSignInSchema } from "#/schema/auth.schema";
import { toast } from "sonner";

export const Route = createFileRoute("/(app)/(auth)/sign-in")({
  component: RouteComponent,
  ssr: "data-only",
});

function RouteComponent() {
  const navigate = useNavigate();
  const { mutate, isPending, isSuccess, data } = useAuthQuery().signIn;
  const { signInDefaultValue } = authValueDefaultConstant;
  const form = useForm({
    defaultValues: signInDefaultValue,
    validators: {
      onChange: AuthSignInSchema,
    },
    onSubmit: async ({ value }) => {
      await mutate(value);
    },
  });

  if (isSuccess) {
    toast.success(data.message);
    navigate({ to: "/home" });
  }

  return (
    <div className="full-height--header grid place-items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="w-full max-w-md rounded-lg shadow-lg p-6 space-y-8"
      >
        <h1 className="font-semibold text-2xl">Đăng nhập vào tài khoản</h1>
        <div className="space-y-4">
          <form.Field name="username">
            {({ name, state, handleChange }) => {
              const { meta, value } = state;
              return (
                <UsernameField
                  name={name}
                  value={value}
                  onChange={handleChange}
                  error={
                    meta.errors.length > 0 && meta.errors[0] && meta.isDirty
                      ? meta.errors[0].message
                      : ""
                  }
                />
              );
            }}
          </form.Field>
          <form.Field name="password">
            {({ name, state, handleChange }) => {
              const { meta, value } = state;
              return (
                <PasswordField
                  label="Mật khẩu"
                  name={name}
                  value={value}
                  onChange={handleChange}
                  error={
                    meta.errors.length > 0 && meta.errors[0] && meta.isDirty
                      ? meta.errors[0].message
                      : ""
                  }
                />
              );
            }}
          </form.Field>
        </div>
        <div className="text-center">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <ActionForm
                title="Đăng nhập"
                canSubmit={canSubmit}
                isSubmitting={isSubmitting}
                isPending={isPending}
              />
            )}
          </form.Subscribe>
          <p className="space-x-1.5 text-sm">
            <span>Chưa có tài khoản?</span>
            <Button asChild variant={"link"} className="px-0">
              <Link to="/sign-up" className="text-primary">
                Đăng ký
              </Link>
            </Button>
            <span>tại đây.</span>
          </p>
        </div>
      </form>
    </div>
  );
}
