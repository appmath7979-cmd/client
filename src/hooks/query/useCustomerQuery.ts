import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { customerApi } from "#/api/customer.api";
import type { CreateCustomerType } from "#/types/customer.type";

function useGetCustomerById(customerId: string) {
	return useQuery({
		queryKey: ["customers", customerId],
		queryFn: () => customerApi.getCustomerById(customerId),
	});
}

function useGetCustomers(userId: string) {
	return useQuery({
		queryKey: ["customers", "list"],
		queryFn: () => customerApi.getAllCustomer(userId),
	});
}

function useCreateCustomer() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateCustomerType & { userId: string }) =>
			customerApi.createCustomer(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["customers", "list"] });
		},
	});
}

function useDeleteManyCustomer() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: string[]) => customerApi.deleteManyCustomer(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["customers", "list"] });
		},
	});
}
function useDeleteCustomer() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: string) => customerApi.deleteCustomer(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["customers", "list"] });
		},
	});
}

export {
	useGetCustomerById,
	useGetCustomers,
	useCreateCustomer,
	useDeleteManyCustomer,
	useDeleteCustomer,
};
