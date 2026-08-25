import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import type { User } from "@/types";

export async function signUp(email: string, password: string, fullName?: string) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name: fullName }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to create account");
  return data;
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return null;
    return {
      id: (session.user as { id: string }).id || "demo-user",
      email: session.user.email || "",
      full_name: session.user.name || undefined,
      avatar_url: session.user.image || undefined,
      created_at: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export async function resetPassword(_email: string) {
  console.log("Password reset requested. Email service not configured.");
}

export async function updateProfile(updates: { full_name?: string; avatar_url?: string }) {
  return { user: updates };
}
