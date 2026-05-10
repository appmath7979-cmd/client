import {
  BellIcon,
  CheckCircleIcon,
  ExclamationMarkIcon,
  InfoIcon,
  WarningIcon,
  XIcon,
} from "@phosphor-icons/react";
import { Button } from "./Button";
import { cn } from "#/lib/utils";
import { useAppStore } from "@lavaz/store";
import { store } from "#/store/store";

const positionVariant = {
  "top-left": "top-0 left-0 max-sm:left-1/2 max-sm:-translate-x-1/2",
  "top-center": "top-0 left-1/2 -translate-x-1/2",
  "top-right": "top-0 right-0 max-sm:left-1/2 max-sm:-translate-x-1/2",
  "bottom-left": "bottom-0 left-0 max-sm:left-1/2 max-sm:-translate-x-1/2",
  "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-0 right-0 max-sm:left-1/2 max-sm:-translate-x-1/2",
};

const colorVariant = {
  default: "bg-[oklch(97%_0_0)] text-[oklch(14.5%_0_0)]",
  info: "bg-[oklch(93.2%_0.032_255.585)] text-[oklch(48.8%_0.243_264.376)]",
  success: "bg-[oklch(96.2%_0.044_156.743)] text-[oklch(52.7%_0.154_150.069)]",
  warning: "bg-[oklch(96.2%_0.059_95.617)] text-[oklch(55.5%_0.163_48.998)]",
  error: "bg-[oklch(93.6%_0.032_17.717)] text-[oklch(50.5%_0.213_27.518)]",
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
            default: <BellIcon size={24} weight="fill" />,
            info: <InfoIcon size={24} weight="fill" />,
            success: <CheckCircleIcon size={24} weight="fill" />,
            warning: <WarningIcon size={24} weight="fill" />,
            error: <ExclamationMarkIcon size={24} weight="fill" />,
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
              className="absolute top-1 right-1 size-4 rounded-full text-inherit hover:bg-destructive/10 hover:text-destructive"
              onClick={() => removeToast(toast.id)}
            >
              <XIcon size={16} weight="bold" />
            </Button>
          </div>
        );
      })}
    </div>
  );
}
