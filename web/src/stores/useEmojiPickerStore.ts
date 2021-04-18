import create from "zustand";
import { combine } from "zustand/middleware";

export const useEmojiPickerStore = create(
  combine(
    {
      open: false,
      query: "",
      keyboardHoveredEmoji: null as null | string,
    },
    (set) => ({
      setOpen: (open: boolean) => set({ open }),
    })
  )
);
