import { Button } from "#/components/ui/button";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";

export function DefaultNotfoundComponent() {
  return (
    <div className="full-height--header grid place-items-center animate-in fade-in duration-300">
      <div className="max-w-md w-full flex flex-col items-center text-center space-y-6">
        <div className="p-4 bg-primary/10 rounded-full text-primary dark:bg-primary/20 animate-bounce animation-duration-[3.5s]">
          <MagnifyingGlassIcon size={48} weight="duotone" />
        </div>

        <div className="space-y-2">
          <h1 className="font-bold text-xl md:text-2xl tracking-tight text-foreground text-balance">
            Không tìm thấy trang yêu cầu
          </h1>
          <p className="text-sm md:text-base text-muted-foreground text-balance">
            Đường dẫn này không tồn tại, đã bị xóa hoặc bạn đã nhập sai địa chỉ
            URL. Vui lòng kiểm tra lại!
          </p>
        </div>
        <Link to="/">
          <Button
            size="lg"
            className="w-full sm:w-fit px-6 shadow-sm shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-[0.98]"
          >
            Quay lại trang chủ
          </Button>
        </Link>
      </div>
    </div>
  );
}
