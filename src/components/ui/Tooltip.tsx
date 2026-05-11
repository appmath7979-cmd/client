import { useWindowSize } from "#/hooks/useWindowSize";
import { cn } from "#/lib/utils";
import { useLayoutEffect, useRef, useState } from "react";

const sideTooltip = {
  top: "-top-9 left-1/2 -translate-x-1/2 [&_div]:-bottom-1/3 [&_div]:left-1/2 [&_div]:-translate-x-1/2",
  bottom:
    "-bottom-9 left-1/2 -translate-x-1/2 [&_div]:-top-1/3 [&_div]:left-1/2 [&_div]:-translate-x-1/2",
  right:
    "top-1/2 -translate-y-1/2 -right-[calc(100%+2px)] [&_div]:top-1/2 [&_div]:-left-1/12 [&_div]:-translate-y-1/2",
  left: "top-1/2 -translate-y-1/2 -left-[calc(100%+2px)] [&_div]:top-1/2 [&_div]:-right-1/12 [&_div]:-translate-y-1/2",
};

interface TooltipProps {
  children: React.ReactNode;
  index?: number;
  content: string;
  side?: keyof typeof sideTooltip;
}

export function Tooltip({
  children,
  index = 50,
  content,
  side = "bottom",
}: TooltipProps) {
  const [sideSelect, setSideSelect] = useState(side);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const { width, height } = useWindowSize();

  useLayoutEffect(() => {
    if (!containerRef.current || !tooltipRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const safePadding = 16;

    if (sideSelect === "left") {
      const isOutside =
        containerRect.x - width < safePadding + tooltipRect.width;
      isOutside ? setSideSelect("right") : setSideSelect("left");
    }
    if (sideSelect === "right") {
      const isOutside = width - safePadding < tooltipRect.width + safePadding;
      isOutside ? setSideSelect("right") : setSideSelect("left");
    }
    if (sideSelect === "bottom") {
      const isOutside = containerRect.y + tooltipRect.y > height - safePadding;
      isOutside ? setSideSelect("top") : setSideSelect("bottom");
    }

    const headerEl = document.querySelector("header");
    if (headerEl) {
      if (sideSelect === "top") {
        const isOutside =
          headerEl?.getBoundingClientRect().height - containerRect.y === 0;
        isOutside ? setSideSelect("bottom") : setSideSelect("top");
      }
    }
  }, []);

  return (
    <div ref={containerRef} className="relative group inline-block size-fit">
      {children}
      <div
        ref={tooltipRef}
        style={{ "--z": index } as React.CSSProperties}
        className={cn(
          "absolute z-(--z) opacity-0 invisible transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visible",
          sideTooltip[sideSelect],
        )}
      >
        <span className="rounded-md shadow-md px-3 py-2 bg-foreground text-background whitespace-nowrap text-sm">
          {content}
        </span>
        <div
          style={{ "--z": index - 1 } as React.CSSProperties}
          className="absolute -z-(--z) size-4 rounded-sm bg-foreground rotate-45"
        />
      </div>
    </div>
  );
}
