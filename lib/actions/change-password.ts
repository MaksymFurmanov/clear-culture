import crypto from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import PasswordChangeEmailTemplate from "@/components/emails/password-change-email-template";
import { getUserId, getUserIdByEmail } from "@/lib/actions/user";

async function generatePasswordToken(userId: string): Promise<string> {
  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = await bcrypt.hash(token, 10);
  const expiresAtMs = Date.now() + (5 * 60000);

  await prisma.passwordChangeToken.create({
    data: {
      token: hashedToken,
      userId: userId,
      expiresAt: new Date(expiresAtMs)
    }
  });

  return token;
}

export async function getChangePasswordTokenWithPrevPassword(currentPassword: string): Promise<string | null> {
  const userId = await getUserId();

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: { password: true }
  });

  if (!user?.password) throw new Error("This account has no password");

  const isValid = await bcrypt.compare(currentPassword, user.password);
  if (!isValid) return null;

  return await generatePasswordToken(userId);
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function changePasswordWithEmail(email: string): Promise<void> {
  const userId = await getUserIdByEmail(email);

  if (!userId) throw new Error("No user with this email found");

  const token = await generatePasswordToken(userId);

  const { error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [email],
    subject: "Clear Culture New Password",
    react: PasswordChangeEmailTemplate({
      link: `${process.env.APP_URL}/new-password?token=${token}`
    })
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function changePassword(token: string, newPassword: string): Promise<void> {
  const tokenEntries = await prisma.passwordChangeToken.findMany();

  const compRes = await Promise.all(
    tokenEntries.map(t => bcrypt.compare(token, t.token))
  );

  const tokenEntry = tokenEntries[
    compRes.findIndex(res => res === true)
    ];

  if (!tokenEntry || tokenEntry.expiresAt.getTime() < Date.now()) {
    throw new Error("The link is invalid or expired");
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: tokenEntry.userId },
    data: { password: hashed }
  });

  await prisma.passwordChangeToken.delete({
    where: { id: tokenEntry.id }
  });
}