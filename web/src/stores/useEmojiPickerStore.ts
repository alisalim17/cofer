import create from "zustand";
import { combine } from "zustand/middleware";

export const useEmojiPickerStore = create(
  combine(
    {
      open: false,
    },
    (set) => ({
      setOpen: (open: boolean) => set({ open }),
    })
  )
);
