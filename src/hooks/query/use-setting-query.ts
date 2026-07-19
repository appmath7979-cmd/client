import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { standardSettingApi } from "#/api/standard-setting.api";
import { toastManager } from "#/components/ui/toast";
import { toastTimeout } from "#/constants/toast.constant";
import type { IPostSettingApi } from "#/types/apis/standard-setting.type";

function useStandardSettingQuery(day: number) {
	return useQuery({
		queryKey: ["settings", day],
		queryFn: () => standardSettingApi.get(day),
	});
}

function useStandardSettingMutation() {
	const queryClient = useQueryClient();
	return {
		post: useMutation({
			mutationFn: (data: IPostSettingApi[]) => standardSettingApi.post(data),
			onSuccess: (data) => {
				queryClient.invalidateQueries({ queryKey: ["settings"] });
				toastManager.add({
					title: "Thêm thiết lập",
					description: data.message ?? "Thêm thiết lập thành công",
					type: "success",
					...toastTimeout,
				});
			},
			onError: (error) => {
				toastManager.add({
					title: "Thêm thiết lập",
					description: error.message ?? "Thêm thiết lập thất bại!",
					type: "error",
					...toastTimeout,
				});
			},
		}),
		put: useMutation({
			mutationFn: (payload: { data: IPostSettingApi[]; ids: string[] }) =>
				standardSettingApi.put(payload),
			onSuccess: (data) => {
				queryClient.invalidateQueries({ queryKey: ["settings"] });
				toastManager.add({
					title: "Thêm thiết lập",
					description: data.message ?? "Thêm thiết lập thành công",
					type: "success",
					...toastTimeout,
				});
			},
			onError: (error) => {
				toastManager.add({
					title: "Thêm thiết lập",
					description: error.message ?? "Thêm thiết lập thất bại!",
					type: "error",
					...toastTimeout,
				});
			},
		}),
	};
}

export { useStandardSettingQuery, useStandardSettingMutation };
