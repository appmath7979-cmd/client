import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { formatDate } from "#/lib/format-date";
import type { IRewardApi } from "#/types/reward.type";
import { rewardApi } from "../../api/reward.api";

export function useRewardQuery(date?: Date) {
	const queryClient = useQueryClient();
	const fomartDate = formatDate(date);

	return {
		get: useQuery({
			queryKey: ["reward", fomartDate],
			queryFn: () => rewardApi.getByTime(date),
			enabled: !!date,
		}),
		post: useMutation({
			mutationFn: (data: IRewardApi) => rewardApi.post(data),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["reward", fomartDate] });
			},
			onError: (error) => {
				toast.error(error.message || "Có lỗi xảy ra, vui lòng thử lại sau.");
			},
		}),
	};
}
