import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { customerApi } from "#/api/customer.api";
import type { ICustomerReq } from "#/types/customer.type";

function usePostCustomer() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: ICustomerReq) => customerApi.createCustomer(data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["customer"] });
			toast.success(data.message);
		},
		onError: (error) => toast.error(error.message),
	});
}

function useGetCustomer(userId: string, page?: number, limit?: number) {
	return useQuery({
		queryKey: ["customer", "list"],
		queryFn: () => customerApi.getAllCustomerForUser(userId, page, limit),
	});
}

function useGetCustomerById(id: string, userId: string) {
	return useQuery({
		queryKey: ["customer", id],
		queryFn: () => customerApi.getByIdForUser(id, userId),
	});
}

export { useGetCustomer, usePostCustomer, useGetCustomerById };
