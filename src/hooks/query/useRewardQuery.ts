import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { rewardApi } from "../../api/reward.api";
import type { IRewardApi } from "#/types/reward.type";

export function useRewardQuery(date?: Date) {
  const queryClient = useQueryClient();

  return {
    get: useQuery({
      queryKey: [
        "reward",
        date?.toLocaleDateString("vi-VN", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        }),
      ],
      queryFn: () => rewardApi.getByTime(date),
      enabled: !!date,
    }),
    post: useMutation({
      mutationFn: (data: IRewardApi) => rewardApi.post(data),
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["reward"] });
        return data;
      },
      onError: (error) => {
        return error;
      },
    }),
  };
}
