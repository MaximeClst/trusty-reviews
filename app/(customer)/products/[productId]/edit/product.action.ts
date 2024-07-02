"use server";

import { prisma } from "@/prisma";
import { userAction } from "@/safe-actions";
import { ProductSchema, ProductType } from "./product.schema";

export const createProductAction = async (input: ProductType) => {
  return userAction(
    ProductSchema,
    async (input, context) => {
      // verify is slug exists
      // const slugExists = await prisma.product.count({
      //   where: {
      //     slug: input.slug,
      //   },
      // });

      // if (slugExists) {
      //   throw new ActionError("Slug already exists");
      // }
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

export const editProductAction = async () => {};
