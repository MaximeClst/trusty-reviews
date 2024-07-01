"use server";

import { prisma } from "@/prisma";
import { userAction } from "@/safe-actions";
import { ProductSchema } from "./product.schema";

export const createProductAction = userAction(
  ProductSchema,
  async (input, context) => {
    const product = await prisma.product.create({
      data: {
        ...input,
        userId: ccontext.user.id,
      },
    });

    return product;
  }
);

export const editProductAction = async () => {};
