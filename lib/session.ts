import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const getUserSession = async () => {
  const authUserSession = await getServerSession(authOptions);

  if (!authUserSession) return null;
  return authUserSession.user;
};