"use client";

import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "next-auth/react";

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

export async function signIn(email: string, password: string) {
  const result = await nextAuthSignIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (result?.error) throw new Error("Invalid email or password");
  return result;
}

export async function signOut() {
  await nextAuthSignOut({ redirect: false });
}
