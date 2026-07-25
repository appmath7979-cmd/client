import axios from "axios";

const isDev = import.meta.env.NODE_ENV === "development";

const baseURL = !isDev
	? import.meta.env.VITE_API_URL
	: "http://100.73.129.78:4000/api/v1";

const baseApi = axios.create({
	baseURL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

baseApi.interceptors.response.use(
	(response) => {
		return response.data ?? null;
	},

	(error) => {
		const apiMessage =
			error.response?.data?.message || "Đã có lỗi hệ thống xảy ra!";
		error.message = apiMessage;

		return Promise.reject(error);
	},
);

const apiRouteName = {
	customer: "/customer",
	order: "/order",
	setting: "/setting",
	layoff: "/layoff",
	reward: "/reward",
};

export { baseApi, apiRouteName };
