import axios from "axios";

const isDev = import.meta.env.NODE_ENV === "development";

const baseUrl = !isDev
	? import.meta.env.VITE_API_URL
	: "http://100.73.129.78:4000/api/v1";

const baseApi = axios.create({
	baseURL: baseUrl,
	timeout: 10000, // Thêm timeout 10s để app không bị treo nếu server nghẽn
	headers: {
		"Content-Type": "application/json",
	},
});

export { baseApi };
