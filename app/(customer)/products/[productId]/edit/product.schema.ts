import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string(),
  noteText: z.string().nullable().optional(),
  informationText: z.string().nullable().optional(),
  reviewText: z.string().nullable().optional(),
  thanksText: z.string().nullable().optional(),
  backgroundColor: z.string().nullable().optional(),
});

export type ProductType = z.infer<typeof ProductSchema>;

export const GRADIENT_CLASSES = [
  "bg-gradient-to-r from-amber-200 to-yellow-400",
  "bg-gradient-to-r from-teal-200 to-teal-500",
  "bg-gradient-to-r from-teal-400 to-yellow-200",
  "bg-gradient-to-r from-red-500 to-orange-500",
];
