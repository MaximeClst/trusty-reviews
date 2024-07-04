import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export const currentUser = async (): Promise<User | null> => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return null;
    }

    const user = session.user as User;

    return user;
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
};

export const requiredCurrentUser = async (): Promise<User> => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
