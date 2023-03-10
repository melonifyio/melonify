import { z } from "zod";

// USER
export const userSchema = z.object({
  _id: z.string().optional(),
  email: z.string().min(1),
  role: z.enum(["OWNER", "ADMIN", "MEMBER"]),
  photoUrl: z.string().optional(),
  neverLoggedIn: z.boolean().optional(),
  createdAt: z.any().optional(),
});
export type UserModel = z.infer<typeof userSchema>;

// ROLE
export const roleSchema = z.enum(["OWNER", "ADMIN", "MEMBER"]);
export type RoleModel = z.infer<typeof roleSchema>;

// TASK
export const taskSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  done: z.boolean().optional(),
  createdAt: z.any().optional(),
  createdBy: userSchema.optional(),
  assignedTo: userSchema,
  dueTo: z.any().optional(),
});
export type TaskModel = z.infer<typeof taskSchema>;

// COMMENTS
export const commentSchema = z.object({
  _id: z.string().optional(),
  content: z.string().min(1),
  createdBy: userSchema.optional(),
  createdAt: z.any().optional(),
});
export type CommentModel = z.infer<typeof commentSchema>;
