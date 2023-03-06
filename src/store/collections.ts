import { create } from "zustand";
import { z, ZodType } from "zod";
import { userSchema } from "schema";

interface Collection {
  id: string;
  schema: ZodType;
  subcollections?: {
    id: string;
    label: string;
    schema: ZodType;
  }[];
}

interface Collections {
  data: Record<string, Collection>;
}

export const useCollectionsStore = create<Collections>(() => ({
  data: {},
}));
