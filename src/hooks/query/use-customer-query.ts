import {
	queryOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { customerApi } from "#/api/customer.api";
import { toastManager } from "#/components/ui/toast";
import { toastTimeout } from "#/constants/toast.constant";
import type { IPostCustomerApi } from "#/types/apis/customer.type";

const useCustomerQuery = {
	getMany: () =>
		queryOptions({
			queryKey: ["customers", "list"],
			queryFn: () => customerApi.getAll(),
		}),
	getById: (id: string) =>
		queryOptions({
			queryKey: ["customers", id],
			queryFn: () => customerApi.getById(id),
		}),
};

function useCustomerMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ data }: { data: IPostCustomerApi }) =>
			customerApi.post(data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["customers"] });
			toastManager.add({
				title: "Tạo khách hàng mới",
				description: data.message ?? "Tạo khách hàng thành công",
				type: "success",
				...toastTimeout,
			});
		},
		onError: (error) => {
			toastManager.add({
				title: "Tạo khách hàng mới",
				description: error.message ?? "Tạo khách hàng thất bại!",
				type: "error",
				...toastTimeout,
			});
		},
	});
}

export { useCustomerQuery, useCustomerMutation };
