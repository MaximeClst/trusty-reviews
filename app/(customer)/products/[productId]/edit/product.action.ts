"use server";

import { prisma } from "@/prisma";
import { ActionError, userAction } from "@/safe-actions";
import { z } from "zod";
import { ProductSchema, ProductType } from "./product.schema";

const verifySlugUniqueness = async (slug: string, productId?: string) => {
  const slugExists = await prisma.product.count({
    where: {
      slug: slug,
      id: {
        not: productId,
      },
    },
  });

  if (slugExists) {
    throw new ActionError("Slug already exists");
  }
};

export const createProductAction = async (input: ProductType) => {
  return userAction(
    ProductSchema,
    async (input, context) => {
      //verify is slug exists
      await verifySlugUniqueness(input.slug);
      const product = await prisma.product.create({
        data: {
          ...input,
          userId: context.user.id,
        },
      });

      return product;
    },
    input
  );
};
const UpdateProductSchema = z.object({
  id: z.string(),
  data: ProductSchema,
});

export const updateProductAction = async (
  input: z.infer<typeof UpdateProductSchema>
) => {
  return userAction(
    UpdateProductSchema,
    async (input, context) => {
      await verifySlugUniqueness(input.data.slug, input.id);

      const updatedProduct = await prisma.product.update({
        where: {
          id: input.id,
          userId: context.user.id,
        },
        data: input.data,
      });

      return updatedProduct;
    },
    input
  );
};
