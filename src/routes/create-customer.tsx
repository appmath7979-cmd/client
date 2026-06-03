import { useForm } from "@tanstack/react-form-start";
import { createFileRoute } from "@tanstack/react-router";
import { customerConstant } from "#/constants/customer.constant";
import { CustomerSchema } from "#/schema/customer.schema";
import { InputField } from "#/components/customer/InputField";
import CustomerTypeToggle from "#/components/customer/CustomerTypeToggle";
import CustomerSwitch from "#/components/customer/CustomerSwitch";
import { Label } from "#/components/ui/label";
import { RadioGroup, RadioGroupItem } from "#/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { regionConstanst } from "#/constants/station.constanst";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { InputSettingField } from "#/components/customer/InputSettingField";
import type { RegionType } from "#/types/reward.type";
import { CustomerToggle } from "#/components/customer/CustomerToggle";
import { Spinner } from "#/components/ui/spinner";

export const Route = createFileRoute("/create-customer")({
	component: RouteComponent,
});

function RouteComponent() {
	const regions: RegionType[] = ["mien-bac", "mien-trung", "mien-nam"];

	const form = useForm({
		defaultValues: customerConstant,
		validators: { onChange: CustomerSchema },
		onSubmit: (values) => {
			console.log(values);
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
															key={val.c}
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
															key={val.c}
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
							size={"lg"}
							disabled={!canSubmit || isSubmitting}
							className="w-full uppercase"
						>
							{isSubmitting ? (
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
