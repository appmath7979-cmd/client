import type { ToasterType } from "#/types/toaster.type";
import { createBox } from "@lavaz/store";

interface ToasterItemState {
  id: string;
  message: string;
  description?: string;
  type: ToasterType;
  state: boolean;
}

interface ToasterState {
  toasts: ToasterItemState[];
}

const initialState = {
  toasts: [],
} satisfies ToasterState as ToasterState;

export const toasterBox = createBox(initialState, (set) => ({
  setToasts: (toast: ToasterItemState) =>
    set((prev) => ({ ...prev, toasts: [...prev.toasts, toast] })),
  removeToast: (id: string) =>
    set((prev) => ({
      ...prev,
      toasts: prev.toasts.filter((toast) => toast.id !== id),
    })),
})).create();
