import { useForm } from "@tanstack/react-form-start";
import { createFileRoute } from "@tanstack/react-router";
import CustomerSwitch from "#/components/customer/create/CustomerSwitch";
import { CustomerToggle } from "#/components/customer/create/CustomerToggle";
import CustomerTypeToggle from "#/components/customer/create/CustomerTypeToggle";
import { InputField } from "#/components/customer/create/InputField";
import { InputSettingField } from "#/components/customer/create/InputSettingField";
import { Button } from "#/components/ui/button";
import { Spinner } from "#/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { customerConstant } from "#/constants/customer.constant";
import { regionConstanst } from "#/constants/station.constanst";
import { CustomerSchema } from "#/schema/customer.schema";
import { regions } from "#/constants/regions.contanst";
import { usePostCustomer } from "#/hooks/query/useCustomerQuery";
import type { ICustomerReq } from "#/types/customer.type";
import { useAppStore } from "@lavaz/store";
import { store } from "#/store/store";

export const Route = createFileRoute("/create-customer")({
	staticData: { title: "Tạo khách hàng mới" },
	component: RouteComponent,
});

function RouteComponent() {
	const [auth] = useAppStore(store.auth, (s) => s.user);
	const { mutate, isPending } = usePostCustomer();
	const form = useForm({
		defaultValues: customerConstant,
		validators: { onChange: CustomerSchema },
		onSubmit: async (values) => {
			console.log(auth);
			const userId = auth?.id || "1f42541d-fd97-4c09-8c75-b027fbf497f0";
			const inputData: ICustomerReq = { ...values.value, userId };
			await mutate(inputData);
		},
	});

	const swichSelections = ["loaiCo", "xienMB", "tinhUi"] as const;
	const toggleSelections = ["tinhTrungDaT", "tinhTrungDaX"] as const;

	return (
		<div className="py-6">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
				className="w-full max-w-4xl mx-auto space-y-8"
			>
				<div className="form-field--box space-y-4">
					<form.Field name="fullName">
						{({ name, state, handleChange }) => {
							const { value, meta } = state;
							return (
								<InputField
									name={name}
									label="Họ và tên"
									placeholder="Nguyen Van A"
									value={value}
									onChange={handleChange}
									error={
										meta.errors.length > 0 && meta.errors[0]
											? meta.errors[0].message
											: ""
									}
								/>
							);
						}}
					</form.Field>
					<form.Field name="phoneNumber">
						{({ name, state, handleChange }) => {
							const { value, meta } = state;
							return (
								<InputField
									name={name}
									label="Số điện thoại"
									placeholder="Số điện thoại"
									type="tel"
									value={value}
									onChange={handleChange}
									error={
										meta.errors.length > 0 && meta.errors[0]
											? meta.errors[0].message
											: ""
									}
								/>
							);
						}}
					</form.Field>
					<form.Field name="type">
						{({ state, handleChange }) => {
							return (
								<div className="flex items-center gap-2">
									<CustomerTypeToggle
										options={["GUEST", "OWNER"]}
										value={state.value}
										onChange={handleChange}
									/>
								</div>
							);
						}}
					</form.Field>
				</div>

				<div className="form-field--box space-y-4">
					{swichSelections.map((item) => (
						<form.Field key={item} name={item}>
							{({ state, handleChange }) => (
								<CustomerSwitch
									item={item}
									value={state.value}
									onChange={handleChange}
								/>
							)}
						</form.Field>
					))}
				</div>

				<Tabs defaultValue="mien-bac" className="form-field--box space-y-4">
					<TabsList className="w-full">
						{regions.map((item) => (
							<TabsTrigger key={item} value={item}>
								{regionConstanst[item as keyof typeof regionConstanst]}
							</TabsTrigger>
						))}
					</TabsList>
					{regions.map((item) => {
						const regionName =
							item === "mien-bac"
								? "BAC"
								: item === "mien-nam"
									? "NAM"
									: "TRUNG";
						return (
							<TabsContent key={`content-${item}`} value={item}>
								<form.Field name={`settings.${regionName}`}>
									{({ state }) => {
										return (
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div className="space-y-4">
													{state.value.map((val, index) => (
														<form.Field
															key={`${state.value[index].label}-co`}
															name={`settings.${regionName}[${index}].c`}
														>
															{({ state: stateChild, handleChange }) => (
																<InputSettingField
																	label={val.label}
																	value={stateChild.value}
																	onChange={handleChange}
																/>
															)}
														</form.Field>
													))}
												</div>
												<div className="space-y-4">
													{state.value.map((val, index) => (
														<form.Field
															key={`${state.value[index].label}-trung`}
															name={`settings.${regionName}[${index}].t`}
														>
															{({ state: stateChild, handleChange }) => (
																<InputSettingField
																	label={val.label}
																	value={stateChild.value}
																	onChange={handleChange}
																/>
															)}
														</form.Field>
													))}
												</div>
											</div>
										);
									}}
								</form.Field>
							</TabsContent>
						);
					})}
				</Tabs>

				<div className="form-field--box space-y-4">
					{toggleSelections.map((item) => (
						<form.Field key={item} name={item}>
							{({ state, handleChange }) => (
								<CustomerToggle
									item={item}
									value={state.value}
									onChange={handleChange}
								/>
							)}
						</form.Field>
					))}
				</div>
				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
				>
					{([canSubmit, isSubmitting]) => (
						<Button
							type="submit"
							size={"lg"}
							disabled={!canSubmit || isSubmitting || isPending}
							className="w-full uppercase"
						>
							{isSubmitting || isPending ? (
								<>
									<Spinner />
									<span>Đang xử lý...</span>
								</>
							) : (
								"lưu thông tin"
							)}
						</Button>
					)}
				</form.Subscribe>
			</form>
		</div>
	);
}
