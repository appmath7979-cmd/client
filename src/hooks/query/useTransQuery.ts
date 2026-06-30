import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { transApi } from "#/api/trans.api";
import type { ITransReq } from "#/types/transaction.type";

function usePostTrans(customerId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: ITransReq) => transApi.post(data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["transaction", "list", customerId],
			});
		},
	});
}

function useGetAllTrans(customerId: string) {
	return useQuery({
		queryKey: ["transaction", "list", customerId],
		queryFn: () => transApi.get(customerId),
	});
}

export { useGetAllTrans, usePostTrans };
