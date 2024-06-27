"use server";

import { prisma } from "@/prisma";
import { userAction } from "@/safe-action";
import { ProductSchema } from "./product.schema";

export const createProductAction = userAction(
  ProductSchema,
  async (input: any, context: { user: { id: any } }) => {
    const product = await prisma.product.create({
      data: {
        ...input,
        userId: context.user.id,
      },
    });

    return product;
  }
);

export const editProductAction = async () => {};
