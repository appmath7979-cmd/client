import { useForm } from "@tanstack/react-form-start";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ActionForm } from "#/components/form/auth/ActionForm";
import { PasswordField } from "#/components/form/auth/PasswordField";
import { UsernameField } from "#/components/form/auth/UsernameField";
import TextField from "#/components/form/TextField";
import { Button } from "#/components/ui/button";
import { authValueDefaultConstant } from "#/constants/auth.constant";
import { useAuthQuery } from "#/hooks/query/useAuthQuery";
import { AuthSignUpSchema } from "#/schema/auth.schema";

export const Route = createFileRoute("/(app)/(auth)/sign-up")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const { mutate, isSuccess, isPending } = useAuthQuery().signUp;

	const { signUpDefaultValue } = authValueDefaultConstant;

	const form = useForm({
		defaultValues: signUpDefaultValue,
		validators: { onChange: AuthSignUpSchema },
		onSubmit: async ({ value }) => {
			const { confirmPassword, ...payload } = value;
			if (payload.email === "") delete payload.email;
			await mutate(payload);
		},
	});

	if (isSuccess) navigate({ to: "/sign-in" });

	return (
		<div className="full-height--header grid place-items-center">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
				className="w-full max-w-md rounded-lg shadow-lg p-6 space-y-8 bg-secondary"
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
					<form.Field name="phoneNumber">
						{({ name, state, handleChange }) => {
							const { meta, value } = state;
							return (
								<TextField
									name={name}
									label="Số điện thoại"
									type="tel"
									placeholder="Số điện thoại..."
									value={value}
									onChange={(e) => handleChange(e.target.value)}
									error={
										meta.errors.length > 0 && meta.errors[0] && meta.isDirty
											? meta.errors[0].message
											: ""
									}
								/>
							);
						}}
					</form.Field>
					<form.Field name="email">
						{({ name, state, handleChange }) => {
							const { meta } = state;
							const value = state.value ?? "";
							return (
								<TextField
									name={name}
									label="Email"
									type="email"
									placeholder="Email..."
									value={value}
									onChange={(e) => handleChange(e.target.value)}
									error={
										meta.errors.length > 0 && meta.errors[0] && meta.isDirty
											? meta.errors[0].message
											: ""
									}
									description="Email có thể để trống."
								/>
							);
						}}
					</form.Field>
					<form.Field name="displayName">
						{({ name, state, handleChange }) => {
							const { meta, value } = state;
							return (
								<TextField
									type="text"
									label="Tên hiển thị"
									name={name}
									placeholder="Nguyễn Văn A..."
									value={value}
									onChange={(e) => handleChange(e.target.value)}
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
					<form.Field name="confirmPassword">
						{({ name, state, handleChange }) => {
							const { meta, value } = state;
							return (
								<PasswordField
									label="Xác nhận mật khẩu"
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
								title="Đăng ký"
								canSubmit={canSubmit}
								isSubmitting={isSubmitting}
								isPending={isPending}
							/>
						)}
					</form.Subscribe>
					<p className="space-x-1.5 text-sm">
						<span>Đã có tài khoản?</span>
						<Button asChild variant={"link"} className="px-0">
							<Link to="/sign-in" className="text-primary">
								Đăng nhập
							</Link>
						</Button>
						<span>tại đây.</span>
					</p>
				</div>
			</form>
		</div>
	);
}
