import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { useState } from "react";
import type { TextFieldProps } from "#/types/form.type";
import { Button } from "../../ui/button";
import { Field, FieldLabel } from "../../ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "../../ui/input-group";

export function PasswordField({
	name,
	value,
	onChange,
	error,
	label,
}: Exclude<TextFieldProps, "value"> & { label: string }) {
	const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

	return (
		<Field className="-space-y-2">
			<FieldLabel htmlFor={name}>{label}</FieldLabel>
			<div>
				<InputGroup>
					<InputGroupInput
						id={name}
						type={isShowPassword ? "text" : "password"}
						placeholder={`${label}...`}
						value={value}
						onChange={(e) => onChange(e.target.value)}
					/>
					<InputGroupAddon align="inline-end">
						<Button
							type="button"
							variant={"ghost"}
							size={"icon-xs"}
							onClick={() => setIsShowPassword((prev) => !prev)}
						>
							{isShowPassword ? <EyeIcon /> : <EyeSlashIcon />}
						</Button>
					</InputGroupAddon>
				</InputGroup>
				<em className="text-xs text-destructive">{error}</em>
			</div>
		</Field>
	);
}
