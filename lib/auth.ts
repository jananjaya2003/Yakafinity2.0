import { SignJWT, jwtVerify } from "jose";

export const COOKIE_NAME = "yakafinity_admin";

function secret() {
  return new TextEncoder().encode(process.env.AUTH_SECRET || "local-development-secret-change-me");
}

export async function createSession(email: string) {
  return new SignJWT({ email, role: "admin" }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("8h").sign(secret());
}

export async function verifySession(token?: string) {
  if (!token) return null;
  try { return (await jwtVerify(token, secret())).payload; } catch { return null; }
}
