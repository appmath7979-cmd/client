import { Button } from "#/components/ui/button";
import {
	DialogClose,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogPanel,
	DialogPopup,
	DialogTitle,
} from "#/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "#/components/ui/field";
import { Form } from "#/components/ui/form";
import { Textarea } from "#/components/ui/textarea";

export function DialogReward({ day }: { day: string }) {
	return (
		<DialogPopup>
			<DialogHeader>
				<DialogTitle>Cập nhật Kết quả Xổ số</DialogTitle>
				<DialogDescription>Cập nhật Kết quả Xổ số ngày {day}</DialogDescription>
			</DialogHeader>

			<Form>
				<DialogPanel className="grid gap-4">
					<Field className="w-full">
						<FieldLabel>Miền Bắc</FieldLabel>
						<Textarea placeholder="Nhập kết quả..." resize={false} />
						<FieldError>This field is required.</FieldError>
					</Field>
					<Field className="w-full">
						<FieldLabel>Miền Bắc</FieldLabel>
						<Textarea placeholder="Nhập kết quả..." resize={false} />
						<FieldError>This field is required.</FieldError>
					</Field>
					<Field className="w-full">
						<FieldLabel>Miền Bắc</FieldLabel>
						<Textarea placeholder="Nhập kết quả..." resize={false} />
						<FieldError>This field is required.</FieldError>
					</Field>
				</DialogPanel>
			</Form>

			<DialogFooter variant="default">
				<DialogClose render={<Button variant="ghost" />}>Hủy</DialogClose>
				<Button type="submit">Xác nhận</Button>
			</DialogFooter>
		</DialogPopup>
	);
}
