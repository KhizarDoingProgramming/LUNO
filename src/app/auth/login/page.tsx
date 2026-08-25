"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [showReset, setShowReset] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signIn(email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Invalid email or password";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      setResetSent(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to send reset email";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-cloud via-white to-sky/20 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 pattern-dots" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-sky/20 rounded-full blur-3xl" />

        <div className="relative text-center px-12 z-10">
          <Link href="/" className="inline-block mb-8">
            <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center mx-auto shadow-lg shadow-primary/20">
              <span className="text-white font-bold text-2xl font-[family-name:var(--font-display)]">
                L
              </span>
            </div>
          </Link>
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold text-navy mb-4">
            LUNO
          </h1>
          <p className="text-text-light text-lg max-w-xs mx-auto">
            Learn Russian & German through interactive practice
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm font-[family-name:var(--font-display)]">
                L
              </span>
            </div>
            <span className="font-[family-name:var(--font-display)] text-xl font-bold text-navy">
              LUNO
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-navy mb-2">
            Welcome back
          </h2>
          <p className="text-muted mb-8">
            Log in to continue learning.
          </p>

          {showReset ? (
            resetSent ? (
              <div className="text-center py-8">
                <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="h-6 w-6 text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="font-[family-name:var(--font-display)] font-semibold text-navy mb-2">
                  Check your email
                </h3>
                <p className="text-sm text-muted mb-6">
                  We sent a password reset link to {email}
                </p>
                <button
                  className="btn-secondary text-sm"
                  onClick={() => {
                    setShowReset(false);
                    setResetSent(false);
                  }}
                >
                  Back to login
                </button>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-danger/10 border border-danger/20 text-sm text-danger">
                    {error}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="reset-email"
                    className="block text-sm font-medium text-navy mb-1.5"
                  >
                    Email address
                  </label>
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    "Send reset link"
                  )}
                </button>

                <button
                  type="button"
                  className="w-full text-sm text-muted hover:text-navy transition-colors"
                  onClick={() => setShowReset(false)}
                >
                  Back to login
                </button>
              </form>
            )
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-danger/10 border border-danger/20 text-sm text-danger">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-navy mb-1.5"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-navy mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-navy transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                  onClick={() => setShowReset(true)}
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="btn-primary w-full"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Log in
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          )}

          {!showReset && (
            <p className="mt-6 text-center text-sm text-muted">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="font-semibold text-primary hover:underline"
              >
                Sign up
              </Link>
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
