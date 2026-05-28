import { CircleNotchIcon } from "@phosphor-icons/react";

export function DefaultPendingComponent() {
  return (
    <div className="full-height--header w-full grid place-items-center animate-in fade-in duration-500">
      <div className="max-w-md w-full flex flex-col items-center text-center space-y-6">
        {/* Vùng Spinner: Vòng xoay mượt mà kết hợp hiệu ứng đập mạch nhẹ ở nền */}
        <div className="relative flex items-center justify-center p-4 bg-primary/5 rounded-full">
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping opacity-75 animation-duration-[2s]" />
          <CircleNotchIcon size={44} className="text-primary animate-spin" />
        </div>

        {/* Vùng Chữ: Thông báo trạng thái và hiệu ứng mờ nhấp nháy tạo cảm giác đang xử lý */}
        <div className="space-y-2 animate-pulse animation-duration-[1.5s]">
          <h2 className="font-semibold text-lg md:text-xl tracking-tight text-foreground">
            Đang tải dữ liệu...
          </h2>
          <p className="text-sm text-muted-foreground text-balance">
            Hệ thống đang xử lý yêu cầu của bạn trong vài giây. Vui lòng không
            tải lại trang!
          </p>
        </div>

        {/* Giả lập Khung xương (Skeleton) mờ phía dưới để người dùng có cảm giác UI sắp xuất hiện */}
        <div className="w-full max-w-70 space-y-3 pt-2 opacity-40 animate-pulse">
          <div className="h-4 bg-muted rounded-md w-3/4 mx-auto" />
          <div className="h-3 bg-muted rounded-md w-1/2 mx-auto" />
        </div>
      </div>
    </div>
  );
}
