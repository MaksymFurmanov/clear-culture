import NextAuth, { DefaultUser, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID!;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string,
      provider?: string
    };
  }
}

declare module "next-auth/jwt/types" {
  interface JWT {
    uid: string,
    provider?: string
  }
}


export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET
    }),

    GitHub({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user?.password || ""
        );
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        let dbUser;
        if (existingUser) {
          dbUser = existingUser;
        } else {
          dbUser = await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name ?? "",
              password: null,
            },
          });
        }

        token.uid = dbUser.id;
        token.provider = account.provider;
        token.name = dbUser.name;
      } else if (token.uid) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.uid },
          select: { name: true },
        });

        if (dbUser) token.name = dbUser.name;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.uid;
        session.user.name = token.name;
        (session.user as any).provider = token.provider;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };