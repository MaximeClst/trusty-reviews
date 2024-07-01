import { createSafeActionClient } from "next-safe-action";
import { currentUser } from "./auth/current-user";

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
  return "An unexpected error occured";
};

export const action = createSafeActionClient({
  handleReturnedServerError: handleReturnedServerError,
});

const authMiddleware = async () => {
  const user = await currentUser();

  if (!user) {
    throw new ActionError("You must be logged in");
  }

  return user;
};

export const userAction = async <T>(
  action: (context: { user: any }, ...args: any[]) => T,
  ...args: any[]
): Promise<T> => {
  const user = await authMiddleware();
  return action({ user }, ...args);
};
