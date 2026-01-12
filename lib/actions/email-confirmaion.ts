import crypto from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export default function generateEmailToken() {
  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = await bcrypt.hash(token, 10);
  const expiresAtMs = Date.now() + (5 * 60000);

  await prisma.emailConfirmationToken.create({
    data: {
      token: hashedToken,
      userId: userId,
      expiresAt: new Date(expiresAtMs)
    }
  });

  return token;
}

