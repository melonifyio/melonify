import { create } from "zustand";
import { z, ZodType } from "zod";

interface Collection {
  id: string;
  schema: ZodType;
  subcollections: {
    id: string;
    label: string;
    schema: ZodType;
  }[];
}

interface Collections {
  data: Record<string, Collection>;
}

export const useCollectionsStore = create<Collections>(() => ({
  data: {
    restaurants: {
      id: "Restaurants",
      schema: z.object({
        title: z.string().min(1, { message: "Required" }),
        image: z.string().optional(),
        cover: z.string().optional(),
        available: z.boolean().optional(),
        rating: z.number().optional(),
        address: z.string().optional(),
        catgory: z
          .object({
            _id: z.string(),
            title: z.string(),
          })
          .optional(),
        label: z.enum(["", "TOP", "NEW", "OFFERING_DISCOUNT"]).optional(),
      }),
      subcollections: [
        {
          id: "Menu",
          label: "Menu",
          schema: z.object({
            title: z.string(),
            price: z.number(),
          }),
        },
      ],
    },
  },
}));
