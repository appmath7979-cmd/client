import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orderApi } from "#/api/order.api";
import { toastManager } from "#/components/ui/toast";
import { toastTimeout } from "#/constants/toast.constant";
import type {
	IPatchOrderMessageApi,
	IPostOrderMessageApi,
} from "#/types/apis/message.type";

const useOrderQuery = {
	getByDateWithCustomerId: (customerId: string, releaseDate: string) =>
		useQuery({
			queryKey: ["orders", releaseDate],
			queryFn: () => orderApi.getByDateWithCustomerId(customerId, releaseDate),
		}),
	getById: (orderId: string) =>
		useQuery({
			queryKey: ["orders", orderId],
			queryFn: () => orderApi.getById(orderId),
		}),
	getAllByDate: (release: string) =>
		useQuery({
			queryKey: ["orders", "all", release],
			queryFn: () => orderApi.getByDate(release),
		}),
};

function useOrderMutation() {
	const queryClient = useQueryClient();
	return {
		post: useMutation({
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
		}),
		patch: useMutation({
			mutationFn: (data: IPatchOrderMessageApi) => orderApi.pacth(data),
			onSuccess: (data) => {
				queryClient.invalidateQueries({ queryKey: ["orders"] });
				toastManager.add({
					title: "Sửa tin nhắn",
					description: data.message ?? "Sửa tin nhắn thành công",
					type: "success",
					...toastTimeout,
				});
			},
			onError: (error) => {
				toastManager.add({
					title: "Sửa tin nhắn",
					description: error.message ?? "Sửa tin nhắn thất bại!",
					type: "error",
					...toastTimeout,
				});
			},
		}),
		delete: useMutation({
			mutationFn: (id: string) => orderApi.deleteById(id),
			onSuccess: (data) => {
				queryClient.invalidateQueries({ queryKey: ["orders"] });
				toastManager.add({
					title: "Xóa tin nhắn",
					description: data.message ?? "Xóa tin nhắn thành công",
					type: "success",
					...toastTimeout,
				});
			},
			onError: (error) => {
				toastManager.add({
					title: "Xóa tin nhắn",
					description: error.message ?? "Xóa tin nhắn thất bại!",
					type: "error",
					...toastTimeout,
				});
			},
		}),
		postLayoff: useMutation({
			mutationFn: (data: IPostOrderMessageApi) => orderApi.postLayoff(data),
			onSuccess: (data) => {
				queryClient.invalidateQueries({ queryKey: ["orders"] });
				toastManager.add({
					title: "Cân hàng",
					description: data.message ?? "Cân hàng thành công",
					type: "success",
					...toastTimeout,
				});
			},
			onError: (error) => {
				toastManager.add({
					title: "Cân hàng",
					description: error.message ?? "Cân hàng thất bại!",
					type: "error",
					...toastTimeout,
				});
			},
		}),
	};
}

export { useOrderQuery, useOrderMutation };
