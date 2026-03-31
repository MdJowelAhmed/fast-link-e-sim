"use server";

import { revalidateTag } from "next/cache";

export const revalidateTags = async (tags) => {
  // Revalidate each tag in the array
  tags.forEach((tag) => {
    revalidateTag(tag);
  });

  return;
};
