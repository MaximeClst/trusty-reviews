import { LoggedInButton } from "../auth/LoggedInButton";

export const Headers = async () => {
  return (
    <div className="flex items-center gap-4">
      <h1 className="font-bold text-lg">trusty-reviews.com</h1>
      <LoggedInButton />
    </div>
  );
};
