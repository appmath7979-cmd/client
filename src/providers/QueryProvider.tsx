import { getQueryClient } from "#/lib/app-query";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export default function QueryProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}
