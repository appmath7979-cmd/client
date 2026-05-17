import { schedule } from "#/constants/schedule.constant";
import { store } from "#/store/store";
import type { AwardRegionType } from "#/types/schedule.type";
import { useAppStore } from "@lavaz/store";
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

export function useGetLotteData(region: AwardRegionType) {
  const [elementRef, setElementRef] = useState<HTMLElement | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [data, { setData }] = useAppStore(store.awardData, (s) => s.data);

  const lotteries =
    "td.giaidb, td.giai1, td.giai2, td.giai3, td.giai4, td.giai5, td.giai6, td.giai7, td.giai8";

  useEffect(() => {
    if (typeof window === "undefined" || !elementRef || data.length > 0) return;
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

    const containerId = "box_kqxs_minhngoc";
    let container = document.getElementById(containerId);

    if (!container) {
      container = document.createElement("div");
      container.id = containerId;
      elementRef.appendChild(container);
    }

    const day = new Date().getDay();
    const checkRegion = schedule[day].regions.find(
      (r) => r.name === region,
    );
    if (!checkRegion) return;
    const selectStations = checkRegion.stations;
    const fetchData = async () => {
      if (!w.$) {
        await loadingScript(
          document.head,
          "//www.minhngoc.net/jquery/jquery-1.7.2.js",
        );
      }
      for (const st of selectStations) {
        await loadingScript(container, `//www.minhngoc.net/getkqxs/${st}.js`);

        await sleep(300);

        const tds = container.querySelectorAll(lotteries);

        const getResults = Array.from(tds)
          .map((td) => {
            const getValues = td.textContent.trim();
            const type = td.className;
            const value = getValues.includes("-")
              ? getValues.split("-")
              : getValues;
            return {
              value,
              type,
            };
          });

        setData({
          station: st,
          region,
          values: getResults,
        });

        container.innerHTML = "";
      }
    };

    fetchData();
    setIsPending(false);
    // container.remove();
  }, [isPending, elementRef]);

  return { setElementRef };
}
