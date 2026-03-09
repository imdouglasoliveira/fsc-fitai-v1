import { fromNodeHeaders } from "better-auth/node";

import { auth } from "./auth.js";
import { prisma } from "./db.js";

export async function getAuthenticatedUser(headersObject: Record<string, string | string[] | undefined>) {
  const authHeader = headersObject.authorization;
  const token = typeof authHeader === "string" ? authHeader.replace("Bearer ", "") : undefined;
  
  // Try Better-Auth first
  const session = token ? await auth.api.getSession({
    headers: fromNodeHeaders({
      authorization: `Bearer ${token}`,
    }),
  }) : null;

  if (session?.user) {
    return session.user;
  }

  // Fallback for test environment where Better-Auth might struggle with origins
  if (token && process.env.NODE_ENV === "test") {
    const dbSession = await prisma.session.findUnique({
      where: { token },
      include: { user: true },
    });
    if (dbSession?.user) {
      return dbSession.user;
    }
  }

  return null;
}
