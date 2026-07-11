import { useQuery } from "@tanstack/react-query";
import { orderApi } from "#/api/order.api";

const useOrderQuery = {
	getByDate: (releaseDate: string) =>
		useQuery({
			queryKey: ["orders", releaseDate],
			queryFn: () => orderApi.getByDate(releaseDate),
		}),
};

export { useOrderQuery };
