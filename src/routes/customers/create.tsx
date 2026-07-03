import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { defaultValueCreateCustomer } from "#/data/default.data";
import { CreateCustomerSchema } from "#/schemas/create-customer.schema";
import { Form } from "#/components/ui/form";
import { CreateInputField } from "#/components/customer/create/CreateInputField";
import { CreateRadioField } from "#/components/customer/create/CreateRadioField";
export const Route = createFileRoute("/customers/create")({
	component: RouteComponent,
});

function RouteComponent() {
	const form = useForm({
		defaultValues: defaultValueCreateCustomer,
		validators: {
			onChange: CreateCustomerSchema,
		},
	});

	return (
		<div className="py-4">
			<Form className={"space-y-12"}>
				<h2 className="text-xl font-semibold uppercase text-primary text-center">
					Thông tin khách hàng
				</h2>

				<div className="space-y-6">
					<form.Field name="fullName">
						{({ name, state, handleChange }) => {
							const { value, meta } = state;
							return (
								<CreateInputField
									label="Họ và tên"
									type="text"
									placeholder="Nguyễn Văn A..."
									name={name}
									value={value}
									onValueChange={handleChange}
									errMsg={
										meta.isDirty && meta.errors[0] ? meta.errors[0].message : ""
									}
								/>
							);
						}}
					</form.Field>
					<form.Field name="phoneNumber">
						{({ name, state, handleChange }) => {
							const { value, meta } = state;
							return (
								<CreateInputField
									label="Số điện thoại"
									type="text"
									placeholder="Số điện thoại..."
									name={name}
									value={value}
									onValueChange={handleChange}
									errMsg={
										meta.isDirty && meta.errors[0] ? meta.errors[0].message : ""
									}
								/>
							);
						}}
					</form.Field>
					<form.Field name="type">{() => <CreateRadioField />}</form.Field>
				</div>
			</Form>
		</div>
	);
}
