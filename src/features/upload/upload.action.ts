"use server";

import { ActionError, userAction } from "@/safe-actions";
import { put } from "@vercel/blob";
import { z } from "zod";

const UploadSchema = z.instanceof(FormData);

export const uploadImageAction = async (formData: FormData) => {
  return userAction(
    UploadSchema,
    async (validatedInput, context) => {
      const file = validatedInput.get("file") as File;

      if (!file) {
        throw new ActionError("File not found");
      }

      const name = file.name;

      const result = await put(name, file, {
        access: "public",
      });
      return result;
    },
    formData
  );
};
