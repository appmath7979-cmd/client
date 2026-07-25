import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { rewardApi } from "#/api/reward.api";
import { toastManager } from "#/components/ui/toast";
import { toastTimeout } from "#/constants/toast.constant";
import type { IPostRewardItemApi } from "#/types/apis/reward.type";

function useRewardQuery(release: string) {
	return useQuery({
		queryKey: ["reward", release],
		queryFn: () => rewardApi.get(release),
	});
}

function useRewardMutation() {
	const queryClient = useQueryClient();
	return {
		post: useMutation({
			mutationFn: (data: IPostRewardItemApi[]) => rewardApi.post(data),
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
	};
}

export { useRewardQuery, useRewardMutation };
