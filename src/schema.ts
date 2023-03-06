import { z } from "zod";

export const userSchema = z.object({
  _id: z.string().optional(),
  email: z.string().min(1, { message: "Required" }),
  role: z.enum(["OWNER", "ADMIN", "MEMBER"]),
  photoUrl: z.string(),
  neverLoggedIn: z.boolean(),
});

export type UserModel = z.infer<typeof userSchema>;

export const restaurantSchema = z.object({
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
});

export const menuSchema = z.object({
  title: z.string(),
  price: z.number(),
});
