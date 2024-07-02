import { createSafeActionClient } from "next-safe-action";
import { currentUser } from "./auth/current-user";

export class ActionError extends Error {
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

const authMiddleware = async () => {
  const user = await currentUser();

  if (!user) {
    throw new ActionError("You must be logged in");
  }

  return user;
};

const safeActionClient = createSafeActionClient({
  handleReturnedServerError: handleReturnedServerError,
});

// Wrapper function to apply the middleware and validate input
export const userAction = async <T, S>(
  schema: S,
  action: (input: T, context: { user: any }) => Promise<any>,
  input: T
): Promise<any> => {
  const user = await authMiddleware();
  const validatedInput = (schema as any).parse(input); // Validate the input using the schema
  return action(validatedInput, { user });
};

export const action = safeActionClient;
