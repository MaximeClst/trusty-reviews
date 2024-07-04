import { prisma } from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { env } from "./../env";

const authOptions = {
  adapter: PrismaAdapter(prisma),
  theme: {
    logo: "/icon-title.png",
  },
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};
export const {
  handlers,
  auth: baseAuth,
  signIn,
  signOut,
} = NextAuth(authOptions);

export { authOptions };
