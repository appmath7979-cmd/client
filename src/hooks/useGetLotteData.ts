import { schedule } from "#/constants/schedule.constant";
import { useEffect, useState } from "react";

const loadingScript = (element: HTMLElement, src: string) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(script);
    script.onerror = reject;
    element.appendChild(script);
  });
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function useGetLotteData(
  region: "mien-bac" | "mien-trung" | "mien-nam",
) {
  const [elementRef, setElementRef] = useState<HTMLElement | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);

  const lotteries =
    ".giaidb, .giai1, .giai2, .giai3, .giai4, .giai5, .giai6, .giai7, .giai8";

  useEffect(() => {
    if (typeof window === "undefined" || !elementRef) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsPending(true);
    });

    observer.observe(elementRef);
    return () => observer.disconnect();
  }, [elementRef, setIsPending]);

  useEffect(() => {
    if (!isPending || !elementRef) return;

    const w = window as any;
    w.bgcolor = "#bfbfbf";
    w.titlecolor = "#730038";
    w.dbcolor = "#000000";
    w.fsize = "16px";
    w.kqwidth = "100%";

    const fetching = async () => {
      try {
        if (!w.$)
          await loadingScript(
            document.head,
            "//www.minhngoc.net/jquery/jquery-1.7.2.js",
          );

        const day = new Date().getDay();
        const stations = schedule[day].regions.find(
          (r) => r.name === region,
        )?.stations;

        if (!stations) return;

        const finalResult = await Promise.all(
          stations.map(async (st) => {
            await loadingScript(
              elementRef,
              `//www.minhngoc.net/getkqxs/${st}.js`,
            );

            await sleep(500);

            const tds = elementRef.querySelectorAll(lotteries);
            const results = Array.from(tds).map((td) => {
              const className = td.className;
              const value = td.textContent.trim();
              return {
                station: st,
                title: className,
                value,
              };
            });

            const isHasChildren = elementRef.hasChildNodes();

            if (isHasChildren) {
              const children = elementRef.children;
              for (let i = 0; i < children.length; i++) {
                elementRef.removeChild(children[i]);
              }
            }

            return results;
          }),
        );

        setData(finalResult);
      } catch (error) {
        console.log(error);
      }
    };

    fetching();
    setIsPending(false);
  }, [isPending, elementRef]);

  return { data, isPending, setElementRef };
}
