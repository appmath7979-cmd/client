import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orderApi } from "#/api/order.api";
import { toastManager } from "#/components/ui/toast";
import { toastTimeout } from "#/constants/toast.constant";
import type { IPostOrderMessageApi } from "#/types/apis/message.type";

const useOrderQuery = {
	getByDate: (releaseDate: string) =>
		useQuery({
			queryKey: ["orders", releaseDate],
			queryFn: () => orderApi.getByDate(releaseDate),
		}),
};

function useOrderMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: IPostOrderMessageApi) => orderApi.post(data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["orders"] });
			toastManager.add({
				title: "Thêm tin nhắn",
				description: data.message ?? "Thêm tin nhắn thành công",
				type: "success",
				...toastTimeout,
			});
		},
		onError: (error) => {
			toastManager.add({
				title: "Thêm tin nhắn",
				description: error.message ?? "Thêm tin nhắn thất bại!",
				type: "error",
				...toastTimeout,
			});
		},
	});
}

export { useOrderQuery, useOrderMutation };
