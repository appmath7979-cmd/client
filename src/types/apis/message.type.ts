import type { IOrderDetailsInput } from "../message.type";
import type { RegionType } from "../region.type";
import type { IBaseApi, IBaseApiTime } from "./base.type";

// 1. Dữ liệu Order thô khi Client đẩy lên (POST)
interface IPostOrderMessageApi {
	region: RegionType;
	message: string;
	details: IOrderDetailsInput[]; // Dữ liệu thô chưa có id, co, price, trung
	release: string;
	isSend?: boolean;
	customerId?: string;
	isLayoff: boolean;
	type?: string; // Thêm nếu bạn có truyền trường loại tin nhắn ("XAC")
}

interface IOrderDetailFromDb extends IOrderDetailsInput, IBaseApiTime {
	id: string;
	orderId: string;
	customerId: string;
	date: string;
	price: number;
	co: number;
	trung: number;
}

// 3. Định nghĩa cấu trúc Order hoàn chỉnh trả về từ API (Đã override lại trường details)
type OrderItemApiType = Omit<IPostOrderMessageApi, "details"> & {
	id: string;
	details: IOrderDetailFromDb[]; // details lúc này là bản ghi DB đầy đủ trường
	isSend: boolean;
} & IBaseApiTime;

// 4. Các Type phục vụ cho các API GET, PATCH
interface IGetOrderMessageApi extends IBaseApi {
	orders: OrderItemApiType[];
}

interface IGetOrderMessageByIdApi extends IBaseApi {
	order: OrderItemApiType;
}

type IPatchOrderMessageApi = Partial<IPostOrderMessageApi> & { id: string };

export type {
	IPostOrderMessageApi,
	IOrderDetailFromDb, // Export thêm để dùng nếu cần render component con
	OrderItemApiType,
	IGetOrderMessageApi,
	IGetOrderMessageByIdApi,
	IPatchOrderMessageApi,
};
