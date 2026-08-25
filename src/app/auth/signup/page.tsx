"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { signUp, signIn } from "@/lib/auth/client";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signUp(email, password, fullName);
      await signIn(email, password);
      router.push("/onboarding");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to create account";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-cloud via-white to-sky/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-800 relative overflow-hidden items-center justify-center">
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
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold text-navy dark:text-white mb-4">
            LUNO
          </h1>
          <p className="text-text-light dark:text-slate-300 text-lg max-w-xs mx-auto">
            Learn Russian & German through interactive practice
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white dark:bg-slate-900">
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
            <span className="font-[family-name:var(--font-display)] text-xl font-bold text-navy dark:text-white">
              LUNO
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-navy dark:text-white mb-2">
            Create your account
          </h2>
          <p className="text-muted dark:text-slate-400 mb-8">
            Start learning in seconds. It&apos;s free.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-danger/10 border border-danger/20 text-sm text-danger">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-navy dark:text-slate-200 mb-1.5"
              >
                Full name
              </label>
              <Input
                id="fullName"
                type="text"
                placeholder="Your name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-navy dark:text-slate-200 mb-1.5"
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
                className="block text-sm font-medium text-navy dark:text-slate-200 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted dark:text-slate-400 hover:text-navy dark:hover:text-white transition-colors"
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

            <button
              type="submit"
              className="btn-primary w-full"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Create account
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted dark:text-slate-400">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-semibold text-primary hover:underline"
            >
              Log in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
