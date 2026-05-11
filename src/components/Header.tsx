import { Link, useMatches } from "@tanstack/react-router";
import { Button } from "./ui/Button";
import { CaretLeftIcon, ListIcon, PlusIcon } from "@phosphor-icons/react";
import { useAppStore } from "@lavaz/store";
import { store } from "#/store/store";

export const Header = () => {
  const [count, { setCount }] = useAppStore(store.guardLink, (s) => s.count);
  const matches = useMatches();

  const currentMatch = matches[matches.length - 1];
  const pageTitle = currentMatch?.staticData?.title || "TOANHOC";
  const isShowBackButton = currentMatch?.staticData?.showBack;
  console.log(count);

  return (
    <header className="layout sticky top-0 z-50 shadow-md py-3 bg-primary text-primary-foreground flex justify-between items-center">
      {isShowBackButton ? (
        <Link to="..">
          <Button size="lg">
            <CaretLeftIcon weight="bold" />
            Trở lại
          </Button>
        </Link>
      ) : (
        <Button size="icon-lg">
          <ListIcon weight="bold" />
        </Button>
      )}
      <h1
        className="absolute top-1/2 left-1/2 -translate-1/2 font-semibold md:text-xl uppercase"
        onClick={setCount}
      >
        {pageTitle}
      </h1>
      {pageTitle === "TOANHOC" && (
        <Button size="icon-lg">
          <PlusIcon weight="bold" />
        </Button>
      )}
    </header>
  );
};
