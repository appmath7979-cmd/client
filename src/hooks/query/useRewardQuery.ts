import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import type { IRewardApi } from "#/types/reward.type";
import { rewardApi } from "../../api/reward.api";

function usePostReward() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: IRewardApi) => rewardApi.post(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["reward"] });
		},
		onError: (error) => {
			toast.error(error.message || "Có lỗi xảy ra, vui lòng thử lại sau.");
		},
	});
}

function useGetReward(page: number) {
	return useQuery({
		queryKey: ["reward", "pagination", page],
		queryFn: () => rewardApi.getPagination(page),
		placeholderData: keepPreviousData,
		staleTime: 60 * 1000,
	});
}

export { useGetReward, usePostReward };
