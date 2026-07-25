import { useAppStore } from "@lavaz/store";
import { Button } from "#/components/ui/button";
import {
	DialogClose,
	DialogFooter,
	DialogHeader,
	DialogPopup,
	DialogTitle,
} from "#/components/ui/dialog";
import { useCustomerQuery } from "#/hooks/query/use-customer-query";
import { useOrderMutation } from "#/hooks/query/use-order-query";
import { store } from "#/store/store";

export function DialogSelectCustomer() {
	const { data } = useCustomerQuery.getMany();
	const [layoff, { clear }] = useAppStore(store.copyLayoff, (s) => s);
	const { mutate } = useOrderMutation().post;
	const customers = data?.customers.filter((item) => item.type === "chu") || [];

	const handleSend = (id: string) => {
		const { details, message, region, release } = layoff;

		const newValueDetails = details.map((item) => {
			const { number, stationCode, syntax, xac, type } = item;
			return {
				number,
				stationCode,
				syntax,
				xac,
				type,
			};
		});

		mutate({
			message,
			release,
			region,
			customerId: id,
			isSend: true,
			isLayoff: false,
			details: newValueDetails,
		});

		clear();
	};

	return (
		<DialogPopup showCloseButton={false}>
			<DialogHeader>
				<DialogTitle>Chọn chủ bạn muốn chuyển tin</DialogTitle>
			</DialogHeader>
			<div className="px-6">
				<ul className="flex flex-col border rounded-md max-h-40 overflow-y-auto">
					{customers.length > 0 ? (
						customers.map((customer) => (
							<li key={customer.id}>
								<DialogClose
									render={
										<Button
											variant={"ghost"}
											className="w-full"
											onClick={() => handleSend(customer.id)}
										/>
									}
								>
									{customer.fullName}
								</DialogClose>
							</li>
						))
					) : (
						<li>Không có chủ để chuyển tin</li>
					)}
				</ul>
			</div>
			<DialogFooter variant="bare">
				<DialogClose>Hủy bỏ</DialogClose>
			</DialogFooter>
		</DialogPopup>
	);
}
