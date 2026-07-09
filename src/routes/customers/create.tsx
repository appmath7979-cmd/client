import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { RotateCcwIcon, SendIcon } from "lucide-react";
import { CreateInputField } from "#/components/customer/create/CreateInputField";
import { CreateInputNumberField } from "#/components/customer/create/CreateInputNumberField";
import { CreateRadioField } from "#/components/customer/create/CreateRadioField";
import { CreateSwitch } from "#/components/customer/create/CreateSwitch";
import { Button } from "#/components/ui/button";
import { Form } from "#/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";
import {
	daValues,
	settingLabelMapper,
	typeValues,
} from "#/constants/create-customer.constant";
import { regionMapper, regionNameList } from "#/constants/regions.constant";
import { defaultValueCreateCustomer } from "#/data/default.data";
import { CreateCustomerSchema } from "#/schemas/create-customer.schema";
import type {
	CreateDaValueType,
	CreateTypeValueCustomerType,
} from "#/types/create-customer.type";
export const Route = createFileRoute("/customers/create")({
	staticData: { title: "Tạo khách hàng" },
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
			<Form className={"space-y-12 w-full max-w-xl mx-auto"}>
				<h2 className="text-xl font-semibold uppercase text-primary text-center">
					Thông tin khách hàng
				</h2>

				<div className="box-field">
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
					<form.Field name="type">
						{({ name, state, handleChange }) => (
							<CreateRadioField
								defaultValue={state.meta.isDefaultValue ? state.value : ""}
								values={typeValues}
								name={name}
								onValueChange={(val: string) =>
									handleChange(val as CreateTypeValueCustomerType)
								}
							/>
						)}
					</form.Field>
				</div>

				<div className="box-field flex justify-between">
					<form.Field name="tinhUi">
						{({ name, state, handleChange }) => (
							<CreateRadioField
								title="Tính Ủi"
								defaultValue={
									state.meta.isDefaultValue ? String(state.value) : ""
								}
								name={name}
								values={[
									{ label: "Cho phép", value: "true" },
									{ label: "Không", value: "false" },
								]}
								onValueChange={(val) => handleChange(val === "true")}
							/>
						)}
					</form.Field>
					<form.Field name="xienMienBac">
						{({ name, state, handleChange }) => (
							<CreateRadioField
								title="Xiên 2-3-4 Miền Bắc"
								defaultValue={
									state.meta.isDefaultValue ? String(state.value) : ""
								}
								name={name}
								values={[
									{ label: "Cho phép", value: "true" },
									{ label: "Không", value: "false" },
								]}
								onValueChange={(val) => handleChange(val === "true")}
							/>
						)}
					</form.Field>
				</div>

				<div className="box-field">
					<form.Field name="settings">
						{() => (
							<Tabs defaultValue={regionNameList[0]} className="w-full">
								<TabsList className="w-full grid grid-cols-3">
									{regionNameList.map((regionKey) => (
										<TabsTrigger
											key={`${regionKey}-tab-trigger`}
											value={regionKey}
										>
											{regionMapper[regionKey]}
										</TabsTrigger>
									))}
								</TabsList>

								{regionNameList.map((regionKey) => (
									<TabsContent
										key={`${regionKey}-tab-content`}
										value={regionKey}
										className="space-y-4 mt-4 divide-y divide-gray-100"
									>
										<form.Subscribe selector={(state) => state.values.settings}>
											{(settings) =>
												settings.map((settingItem, index) => {
													const itemKey = settingItem.name;
													const itemLabel =
														settingLabelMapper[itemKey] || itemKey;
													const cValue =
														settingItem.c[
															regionKey as keyof typeof settingItem.c
														];
													const tValue =
														settingItem.t[
															regionKey as keyof typeof settingItem.t
														];

													return (
														<div
															key={itemKey}
															className="pt-4 flex flex-col gap-3 first:pt-0 first:border-none"
														>
															<div className="flex justify-between items-center">
																<p className="text-sm font-bold text-primary uppercase ">
																	{itemLabel}
																</p>
																{/* 1. XỬ LÝ SWITCH LOẠI */}
																<CreateSwitch
																	value={settingItem.type}
																	onValueChange={(newType) => {
																		const updatedSettings = [
																			...form.getFieldValue("settings"),
																		];
																		if (updatedSettings[index]) {
																			// Tạo reference mới cho item tại index
																			updatedSettings[index] = {
																				...updatedSettings[index],
																				type: newType as "tile" | "thanhtien",
																			};
																			form.setFieldValue(
																				"settings",
																				updatedSettings,
																			);
																		}
																	}}
																/>
															</div>

															<div className="grid grid-cols-2 gap-6">
																{/* 2. XỬ LÝ GIÁ TRỊ C */}
																<CreateInputNumberField
																	label="Cò"
																	value={cValue}
																	onValueChange={(val) => {
																		const updatedSettings = [
																			...form.getFieldValue("settings"),
																		];
																		if (updatedSettings[index]) {
																			// Tạo mới object tại index và ghi đè an toàn thuộc tính c
																			updatedSettings[index] = {
																				...updatedSettings[index],
																				c: {
																					...updatedSettings[index].c,
																					[regionKey]: val,
																				},
																			};
																			form.setFieldValue(
																				"settings",
																				updatedSettings,
																			);
																		}
																	}}
																/>

																{/* 3. XỬ LÝ GIÁ TRỊ T */}
																<CreateInputNumberField
																	label="Trúng"
																	value={tValue}
																	onValueChange={(val) => {
																		const updatedSettings = [
																			...form.getFieldValue("settings"),
																		];
																		if (updatedSettings[index]) {
																			updatedSettings[index] = {
																				...updatedSettings[index],
																				t: {
																					...updatedSettings[index].t,
																					[regionKey]: val,
																				},
																			};
																			form.setFieldValue(
																				"settings",
																				updatedSettings,
																			);
																		}
																	}}
																/>
															</div>
														</div>
													);
												})
											}
										</form.Subscribe>
									</TabsContent>
								))}
							</Tabs>
						)}
					</form.Field>
				</div>

				<div className="box-field">
					<form.Field name="dat">
						{({ name, state, handleChange }) => (
							<CreateRadioField
								defaultValue={state.meta.isDefaultValue ? state.value : ""}
								title="Tính trúng Đá thẳng"
								name={name}
								values={daValues}
								onValueChange={(val) => handleChange(val as CreateDaValueType)}
							/>
						)}
					</form.Field>
					<form.Field name="daxt">
						{({ name, state, handleChange }) => (
							<CreateRadioField
								defaultValue={state.meta.isDefaultValue ? state.value : ""}
								title="Tính trúng Đá xiên"
								name={name}
								values={daValues}
								onValueChange={(val) => handleChange(val as CreateDaValueType)}
							/>
						)}
					</form.Field>
				</div>

				<div className="grid grid-cols-4 gap-1">
					<Button
						variant={"outline"}
						size={"xl"}
						type="reset"
						className="col-span-1"
						onClick={(event) => {
							event.preventDefault();
							form.reset();
						}}
					>
						<RotateCcwIcon />
						<span>Đặt lại</span>
					</Button>
					<Button size={"xl"} type="submit" className="col-span-3">
						<SendIcon />
						<span>Xác nhận</span>
					</Button>
				</div>
			</Form>
		</div>
	);
}
