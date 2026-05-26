import { Button } from "#/components/ui/button";
import { GlobeXIcon } from "@phosphor-icons/react";

export function DefaultErrorComponent() {
  return (
    <div className="full-height--header grid place-items-center">
      <div className="max-w-md w-full flex flex-col items-center text-center space-y-6">
        <div className="p-4 bg-destructive/10 rounded-full text-destructive dark:bg-destructive/20 animate-bounce animation-duration-[3s]">
          <GlobeXIcon size={48} weight="duotone" />
        </div>
        <div className="space-y-2">
          <h1 className="font-bold text-xl md:text-2xl tracking-tight text-foreground text-balance">
            Có lỗi xảy ra đột ngột
          </h1>
          <p className="text-sm md:text-base text-muted-foreground text-balance">
            Kết nối của bạn bị gián đoạn hoặc hệ thống đang quá tải. Vui lòng
            thử lại sau vài phút!
          </p>
        </div>
        <Button onClick={() => window.location.reload()} className="w-fit">
          Tải lại trang
        </Button>
      </div>
    </div>
  );
}
