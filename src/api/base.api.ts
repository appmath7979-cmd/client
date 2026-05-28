import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const baseApi = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

baseApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const serverMessage = error.response?.data?.message;
    const finalMessage = Array.isArray(serverMessage)
      ? serverMessage[0]
      : serverMessage || error.message || "Đã xảy ra lỗi";

    return Promise.reject(new Error(finalMessage));
  },
);

export { baseApi };
