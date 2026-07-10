import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { customerApi } from "#/api/customer.api";
import { toastManager } from "#/components/ui/toast";
import type { IPostCustomerApi } from "#/types/apis/customer.type";

const toastCustomerId = {
	sucess: "CUSTOMER_SUCCESS",
	error: "CUSTOMER_ERROR",
};

function useGetCustomer() {
	return useQuery({
		queryKey: ["customers", "list"],
		queryFn: () => customerApi.getAll(),
	});
}

function usePostCustomer() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ data }: { data: IPostCustomerApi }) =>
			customerApi.post(data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["customers"] });
			toastManager.add({
				description: data?.message ?? "Thêm khách hàng thành công",
				id: toastCustomerId.sucess,
				title: "Thêm khách hàng",
				type: "success",
				timeout: 4500,
			});
		},
		onError: (error) => {
			toastManager.add({
				description: error.message ?? "Thêm khách hàng thất bại!",
				id: toastCustomerId.error,
				title: "Thêm khách hàng",
				type: "error",
				timeout: 4500,
			});
		},
	});
}

export { useGetCustomer, usePostCustomer };
