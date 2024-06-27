import { currentUser } from "@/auth/current-user";
import { ActionError } from "@/safe-action"; // Assurez-vous de corriger le chemin

export const authMiddleware = async () => {
  const user = await currentUser();

  if (!user) {
    throw new ActionError("You must be logged in");
  }

  return { user };
};
