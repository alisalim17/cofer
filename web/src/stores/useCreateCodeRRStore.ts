import create from "zustand";
import { combine } from "zustand/middleware";

export const useCreateCodeRRStore = create(
  combine(
    {
      notes: "",
      tags: [],
    },
    (set) => ({
      setNotes: (notes: string) => set({ notes }),
      setTags: (tags: string[]) => set({ tags }),
    })
  )
);
