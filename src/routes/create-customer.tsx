import { useForm } from "@tanstack/react-form-start";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { InputField } from "#/components/customer/create/InputField";
import { RadioField } from "#/components/customer/create/RadioField";
import { Button } from "#/components/ui/button";
import { Field, FieldLabel } from "#/components/ui/field";
import { Label } from "#/components/ui/label";
import { Spinner } from "#/components/ui/spinner";
import { Switch } from "#/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";
import {
	booleanSelectConstant,
	customerConstant,
	toggleSelectConstant,
} from "#/constants/customer.constant";
import { regions } from "#/constants/regions.contanst";
import { useCreateCustomer } from "#/hooks/query/useCustomerQuery";
import { cn } from "#/lib/utils";
import { CustomerSchema } from "#/schema/customer.schema";
import type { CreateCustomerType } from "#/types/customer.type";
import type { RegionType } from "#/types/reward.type";

export const Route = createFileRoute("/create-customer")({
	component: RouteComponent,
});

function RouteComponent() {
	const [region, setRegion] = useState<RegionType>("mien-bac");
	const navigate = useNavigate();

	const { mutate, isPending, isSuccess } = useCreateCustomer();

	const form = useForm({
		defaultValues: customerConstant as CreateCustomerType,
		validators: {
			onChange: CustomerSchema,
		},
		onSubmit: async ({ value }) => {
			const data = { ...value, userId: "749b56f7-d81b-46e1-8dbc-618e295f5855" };
			await mutate(data);
		},
	});

	if (isSuccess) {
		toast.success("Tạo khách hàng thành công!");
		navigate({ to: "/customer" });
	}

	return (
		<div className="py-4">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
				className="w-full max-w-xl p-6 rounded-lg mx-auto shadow-md dark:shadow-gray-800 bg-secondary/50 space-y-8"
			>
				<h2 className="text-center uppercase text-xl text-primary tracking-wide font-bold">
					Tạo khách hàng
				</h2>

				<div className="space-y-4">
					<form.Field name="fullName">
						{({ state, handleChange }) => {
							const { value, meta } = state;
							return (
								<InputField
									label="Họ và Tên"
									placeholder="Nguyễn Văn A"
									value={value}
									onChange={(e) => handleChange(e.target.value)}
									errorMsg={
										meta.errors.length > 0 && meta.errors[0]
											? meta.errors[0].message
											: ""
									}
								/>
							);
						}}
					</form.Field>
					<form.Field name="phoneNumber">
						{({ state, handleChange }) => {
							const { value, meta } = state;
							return (
								<InputField
									label="Số điện thoại"
									placeholder="Số điện thoại"
									value={value}
									onChange={(e) => handleChange(e.target.value)}
									errorMsg={
										meta.errors.length > 0 && meta.errors[0]
											? meta.errors[0].message
											: ""
									}
								/>
							);
						}}
					</form.Field>
					<form.Field name="type">
						{({ state, handleChange }) => (
							<div className="radio-customer--box">
								<Label
									htmlFor="khach-radio"
									className={cn(
										"radio-customer trans-mooth",
										state.value === "GUEST" && "border-primary text-primary",
									)}
								>
									<input
										id="khach-radio"
										type="radio"
										hidden
										checked={state.value === "GUEST"}
										onChange={() => handleChange("GUEST")}
									/>
									<span>Khách</span>
								</Label>
								<Label
									htmlFor="chu-radio"
									className={cn(
										"radio-customer trans-mooth",
										state.value === "OWNER" && "border-primary text-primary",
									)}
								>
									<input
										id="chu-radio"
										type="radio"
										hidden
										checked={state.value === "OWNER"}
										onChange={() => handleChange("OWNER")}
									/>
									<span>Chủ</span>
								</Label>
							</div>
						)}
					</form.Field>
				</div>

				<div className="space-y-6">
					<form.Field name="xienMB">
						{({ name, state, handleChange }) => (
							<RadioField
								name={name}
								title="Xiên 2-3-4 Miền Bắc"
								value={state.value}
								onValueChange={(val) => handleChange(val as boolean)}
								values={booleanSelectConstant}
							/>
						)}
					</form.Field>
					<form.Field name="tinhUi">
						{({ name, state, handleChange }) => (
							<RadioField
								name={name}
								title="Tính Ủi"
								value={state.value}
								onValueChange={(val) => handleChange(val as boolean)}
								values={booleanSelectConstant}
							/>
						)}
					</form.Field>
				</div>

				<Tabs
					defaultValue={region}
					onValueChange={(val) => setRegion(val as RegionType)}
				>
					<TabsList>
						{regions.map((reg) => (
							<TabsTrigger key={`${reg}-tab`} value={reg}>
								{reg === "mien-bac"
									? "Miền Bắc"
									: reg === "mien-nam"
										? "Miền Nam"
										: "Miền Trung"}
							</TabsTrigger>
						))}
					</TabsList>
					{regions.map((reg) => {
						const convertRegion =
							reg === "mien-bac" ? "BAC" : reg === "mien-nam" ? "NAM" : "TRUNG";
						return (
							<TabsContent key={`${reg}-content`} value={reg}>
								<form.Field name={`settings.${convertRegion}`}>
									{({ state }) => {
										const currentList = state.value || [];
										return (
											<div className="space-y-4 border p-4 rounded-md bg-background/50">
												{currentList.map((item, index) => (
													<div
														key={item.label}
														className="space-y-2 border-b pb-4 last:border-0"
													>
														{/* Hiển thị nhãn của cặp cấu hình (ví dụ: Bao lô, Đá...) */}
														<div className="flex items-center justify-between">
															<h4 className="font-semibold text-sm text-primary">
																{item.label}
															</h4>
															<div>
																<form.Field
																	name={`settings.${convertRegion}[${index}].loai`}
																>
																	{(loaiField) => {
																		const isTiLe =
																			loaiField.state.value === "ti_le";

																		return (
																			<Field
																				orientation="horizontal"
																				className="flex items-center gap-2"
																			>
																				<FieldLabel>
																					{isTiLe ? "Tỉ lệ" : "Thành tiền"}
																				</FieldLabel>
																				<Switch
																					checked={isTiLe}
																					onCheckedChange={(checked) => {
																						// Khi bật/tắt switch, cập nhật value dựa trên boolean
																						loaiField.handleChange(
																							checked ? "ti_le" : "thanh_tien",
																						);
																					}}
																				/>
																			</Field>
																		);
																	}}
																</form.Field>
															</div>
														</div>

														<div className="grid grid-cols-2 gap-4">
															{/* 2. Ô nhập cho thuộc tính `c` */}
															<form.Field
																name={`settings.${convertRegion}[${index}].c`}
															>
																{(cField) => (
																	<InputField
																		label="Cò"
																		type="number"
																		placeholder="Nhập c"
																		value={cField.state.value}
																		onChange={(e) =>
																			cField.handleChange(
																				Number(e.target.value),
																			)
																		}
																		errorMsg={
																			cField.state.meta.errors.length > 0 &&
																			cField.state.meta.errors[0]
																				? cField.state.meta.errors[0].message
																				: ""
																		}
																	/>
																)}
															</form.Field>

															{/* 3. Ô nhập cho thuộc tính `t` */}
															<form.Field
																name={`settings.${convertRegion}[${index}].t`}
															>
																{(tField) => (
																	<InputField
																		label="Trúng"
																		type="number"
																		placeholder="Nhập t"
																		value={tField.state.value}
																		onChange={(e) =>
																			tField.handleChange(
																				Number(e.target.value),
																			)
																		}
																		errorMsg={
																			tField.state.meta.errors.length > 0 &&
																			tField.state.meta.errors[0]
																				? tField.state.meta.errors[0].message
																				: ""
																		}
																	/>
																)}
															</form.Field>
														</div>
													</div>
												))}
											</div>
										);
									}}
								</form.Field>
							</TabsContent>
						);
					})}
				</Tabs>

				<div className="space-y-6">
					<form.Field name="tinhTrungDaT">
						{({ name, state, handleChange }) => (
							<RadioField
								name={name}
								title="Tính trúng Đá Thẳng"
								value={state.value}
								values={toggleSelectConstant}
								onValueChange={(val) => {
									handleChange(val as "1_lan" | "ky_ruoi" | "nhieu_cap");
								}}
							/>
						)}
					</form.Field>
					<form.Field name="tinhTrungDaX">
						{({ name, state, handleChange }) => (
							<RadioField
								name={name}
								title="Tính trúng Đá Xiên"
								value={state.value}
								values={toggleSelectConstant}
								onValueChange={(val) => {
									handleChange(val as "1_lan" | "ky_ruoi" | "nhieu_cap");
								}}
							/>
						)}
					</form.Field>
				</div>

				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
				>
					{([canSubmit, isSubmitting]) => (
						<Button
							type="submit"
							size={"lg"}
							className="w-full"
							disabled={!canSubmit || isSubmitting || isPending}
						>
							{isSubmitting || isPending ? (
								<>
									<Spinner />
									<span>Đang xử lý...</span>
								</>
							) : (
								<span>Lưu thông tin</span>
							)}
						</Button>
					)}
				</form.Subscribe>
			</form>
		</div>
	);
}
