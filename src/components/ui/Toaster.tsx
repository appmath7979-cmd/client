import { Button } from "./Button";
import { cn } from "@/lib/utils";
import { useAppStore } from "@lavaz/store";
import { store } from "@/store/store";
import {
  RiCheckboxCircleFill,
  RiCloseCircleFill,
  RiCloseLine,
  RiErrorWarningFill,
  RiInformation2Fill,
  RiNotificationFill,
} from "@remixicon/react";

const positionVariant = {
  "top-left": "top-0 left-0 max-sm:left-1/2 max-sm:-translate-x-1/2",
  "top-center": "top-0 left-1/2 -translate-x-1/2",
  "top-right": "top-0 right-0 max-sm:left-1/2 max-sm:-translate-x-1/2",
  "bottom-left": "bottom-0 left-0 max-sm:left-1/2 max-sm:-translate-x-1/2",
  "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-0 right-0 max-sm:left-1/2 max-sm:-translate-x-1/2",
};

const colorVariant = {
  default: "bg-background text-foreground",
  info: "bg-info text-info-foreground hover:[&_button]:bg-info-container",
  success:
    "bg-success text-success-foreground hover:[&_button]:bg-success-container",
  warning:
    "bg-background text-foreground hover:[&_button]:bg-warning-container",
  error: "bg-background text-foreground hover:[&_button]:bg-error-container",
};

interface ToasterProps {
  position?: keyof typeof positionVariant;
  richColor?: boolean;
  expand?: boolean;
  duration?: number;
}

export function Toaster({
  expand = false,
  position = "bottom-right",
  richColor = false,
  duration = 3000,
}: ToasterProps) {
  const [toasts, { removeToast }] = useAppStore(store.toaster, (s) => s.toasts);

  if (toasts.length === 0) return null;

  return (
    <div
      className={cn(
        "fixed z-9999 max-sm:w-full sm:w-sm p-3 flex flex-col gap-3 pointer-events-none",
        positionVariant[position],
      )}
    >
      {toasts.map((toast, index) => {
        const getAnimationClass = () => {
          if (position.includes("top"))
            return "animate-[slide-in-top_var(--duration)_ease-in-out_forwards]";
          return "animate-[slide-in-bottom_var(--duration)_ease-in-out_forwards]";
        };
        const Icon = () => {
          const icons = {
            default: <RiNotificationFill size={24} />,
            info: <RiInformation2Fill size={24} />,
            success: <RiCheckboxCircleFill size={24} />,
            warning: <RiErrorWarningFill size={24} />,
            error: <RiCloseCircleFill size={24} />,
          };

          return icons[toast.type];
        };
        return (
          <div
            onAnimationEnd={() => removeToast(toast.id)}
            style={
              {
                "--duration": `${duration + index * 1500}ms`,
              } as React.CSSProperties
            }
            className={cn(
              "relative w-full p-4 rounded-md shadow-md flex gap-2 transition-all duration-300 ease-in-out",
              getAnimationClass(),
              richColor ? colorVariant[toast.type] : colorVariant.default,
            )}
          >
            <Icon />
            <div className="leading-6">
              <p className="font-semibold">{toast.message}</p>
              {expand && <p className="text-sm">{toast.description || ""}</p>}
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute top-1 right-1 size-4 rounded-full text-inherit"
              onClick={() => removeToast(toast.id)}
            >
              <RiCloseLine size={16} />
            </Button>
          </div>
        );
      })}
    </div>
  );
}
