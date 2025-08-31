import { Session, getServerSession, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // adjust import path

declare module "next-auth" {
  interface Session {
    user: {
      id: string,
      email: string,
      name: string
    }
  }
}

export async function sessionCallback({ session, token }: {
  session: Session,
  token: JWT
}) {
  if (token) {
    session.user.id = token.id as string;
    session.user.email = token.email as string;
    session.user.name = token.name as string;
  }

  return session;
}

export async function jwtCallback({ token, user }: {
  token: JWT,
  user?: any
}) {
  if (user) {
    token.id = user.id;
    token.email = user.email;
    token.name = user.name;
  }

  return token;
}

export const getUserSession = async (): Promise<User | null> => {
  const authUserSession = await getServerSession(authOptions);

  if (!authUserSession) return null;
  return authUserSession.user;
};