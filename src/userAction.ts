import { authMiddleware } from "@/middleware/authMiddleware";
import { createSafeActionClient } from "next-safe-action";

class ActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ActionError";
  }
}

const handleReturnedServerError = (error: Error) => {
  if (error instanceof ActionError) {
    return error.message;
  }
  return "An unexpected error occurred";
};

const actionClient = createSafeActionClient({
  handleReturnedServerError: handleReturnedServerError,
});

export const userAction = async () => {
  const context = await authMiddleware(); // Vérifie l'utilisateur
  // Utilisez actionClient avec les informations utilisateur obtenues
  return {
    ...actionClient,
    user: context.user,
  };
};
