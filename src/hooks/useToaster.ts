import { store } from "#/store/store";
import type { ToasterType } from "#/types/toaster.type";
import { useAppStore } from "@lavaz/store";

interface IToaster {
  message: string;
  description?: string;
}

export const useToaster = () => {
  const [, { setToasts }] = useAppStore(store.toaster, (s) => s);

  const createToast = (toast: IToaster, type: ToasterType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts({ ...toast, id, type, state: true });
  };

  return {
    default: (toast: IToaster) => {
      createToast(toast, "default");
    },
    info: (toast: IToaster) => {
      createToast(toast, "info");
    },
    success: (toast: IToaster) => {
      createToast(toast, "success");
    },
    warning: (toast: IToaster) => {
      createToast(toast, "warning");
    },
    error: (toast: IToaster) => {
      createToast(toast, "error");
    },
  };
};
