"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Flame,
  Star,
  BookOpen,
  Target,
  Trophy,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { signOut } from "@/lib/auth/client";
import { useSession } from "next-auth/react";
import { getGamification, initGamification, type GamificationState } from "@/lib/gamification";

interface UserProfile {
  native_language_id: string;
  target_language_id: string;
  level: string;
  daily_goal_minutes: number;
  total_xp: number;
  current_streak: number;
}

const languageNames: Record<string, { name: string; flag: string }> = {
  ru: { name: "Russian", flag: "🇷🇺" },
  de: { name: "German", flag: "🇩🇪" },
};

const unitsByLanguage: Record<
  string,
  Array<{ id: string; title: string; lessons: Array<{ id: string; title: string; completed: boolean; xp: number }> }>
> = {
  ru: [
    {
      id: "u1000000-0000-0000-0000-000000000001",
      title: "Greetings",
      lessons: [
        { id: "l1000000-0000-0000-0000-000000000001", title: "Basic Hello", completed: false, xp: 50 },
        { id: "l1000000-0000-0000-0000-000000000002", title: "Goodbye", completed: false, xp: 50 },
        { id: "l1000000-0000-0000-0000-000000000003", title: "Polite Words", completed: false, xp: 50 },
      ],
    },
    {
      id: "u1000000-0000-0000-0000-000000000002",
      title: "Introductions",
      lessons: [
        { id: "l1000000-0000-0000-0000-000000000004", title: "Self Introduction", completed: false, xp: 50 },
        { id: "l1000000-0000-0000-0000-000000000005", title: "Asking Names", completed: false, xp: 50 },
      ],
    },
    {
      id: "u1000000-0000-0000-0000-000000000003",
      title: "Numbers",
      lessons: [
        { id: "l1000000-0000-0000-0000-000000000006", title: "1-10", completed: false, xp: 50 },
        { id: "l1000000-0000-0000-0000-000000000007", title: "11-20", completed: false, xp: 50 },
      ],
    },
  ],
  de: [
    {
      id: "u2000000-0000-0000-0000-000000000001",
      title: "Greetings",
      lessons: [
        { id: "l2000000-0000-0000-0000-000000000001", title: "Basic Hello", completed: false, xp: 50 },
        { id: "l2000000-0000-0000-0000-000000000002", title: "Goodbye", completed: false, xp: 50 },
        { id: "l2000000-0000-0000-0000-000000000003", title: "Polite Words", completed: false, xp: 50 },
      ],
    },
    {
      id: "u2000000-0000-0000-0000-000000000002",
      title: "Introductions",
      lessons: [
        { id: "l2000000-0000-0000-0000-000000000004", title: "Self Introduction", completed: false, xp: 50 },
        { id: "l2000000-0000-0000-0000-000000000005", title: "Asking Names", completed: false, xp: 50 },
      ],
    },
    {
      id: "u2000000-0000-0000-0000-000000000003",
      title: "Numbers",
      lessons: [
        { id: "l2000000-0000-0000-0000-000000000006", title: "1-10", completed: false, xp: 50 },
        { id: "l2000000-0000-0000-0000-000000000007", title: "11-20", completed: false, xp: 50 },
      ],
    },
  ],
};

export default function DashboardPage() {
  const router = useRouter();
  const [profile] = useState<UserProfile | null>(() => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("luno_profile");
    return stored ? JSON.parse(stored) : null;
  });
  const [gamification, setGamification] = useState<GamificationState>(() => {
    if (typeof window === "undefined") return { total_xp: 0, current_streak: 0, longest_streak: 0, completed_lessons: [], last_practice_date: null };
    return initGamification();
  });

  useEffect(() => {
    const handleFocus = () => setGamification(initGamification());
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const { status } = useSession();
  const loading = status === "loading";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    } else if (status === "authenticated" && !profile) {
      router.push("/onboarding");
    }
  }, [status, router, profile]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch {
      router.push("/");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!profile) return null;

  const lang = languageNames[profile.target_language_id] || {
    name: "Unknown",
    flag: "❓",
  };
  const units = unitsByLanguage[profile.target_language_id] || [];
  const allLessons = units.flatMap((u) => u.lessons);
  const completedLessons = gamification.completed_lessons;
  const completedCount = allLessons.filter((l) => completedLessons.includes(l.id)).length;
  const totalLessons = allLessons.length;
  const progressPercent = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  const levelTitle =
    profile.level.charAt(0).toUpperCase() + profile.level.slice(1);

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <header className="bg-[var(--color-card)] border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-lg font-bold">LUNO</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Flame className="h-4 w-4 text-[var(--color-streak)]" />
              <span className="text-sm font-semibold">
                {gamification.current_streak}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-[var(--color-xp)]" />
              <span className="text-sm font-semibold">
                {gamification.total_xp} XP
              </span>
            </div>
            <button
              onClick={handleSignOut}
              className="p-2 rounded-lg hover:bg-[var(--color-surface)] transition-colors"
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4 text-[var(--color-muted)]" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">{lang.flag}</span>
            <div>
              <h1 className="text-2xl font-bold">
                {lang.name} — {levelTitle}
              </h1>
              <p className="text-sm text-[var(--color-muted)]">
                {profile.daily_goal_minutes} min/day goal
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">Today&apos;s Progress</h2>
                <Badge variant="secondary">
                  {completedCount}/{totalLessons} lessons
                </Badge>
              </div>
              <Progress value={progressPercent} className="mb-3" />
              <div className="flex items-center justify-between">
                <p className="text-sm text-[var(--color-muted)]">
                  {Math.round(progressPercent)}% complete
                </p>
                <p className="text-sm text-[var(--color-muted)]">
                  {profile.daily_goal_minutes} min goal
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center">
                    <Star className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-muted)]">
                      Total XP
                    </p>
                    <p className="text-xl font-bold">{gamification.total_xp}</p>
                  </div>
                </div>
              </div>
              <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-xl bg-red-50 dark:bg-red-900/30 flex items-center justify-center">
                    <Flame className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-muted)]">
                      Streak
                    </p>
                    <p className="text-xl font-bold">
                      {gamification.current_streak} days
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Learning Path</h2>
            <div className="space-y-4">
              {units.map((unit, unitIndex) => (
                <motion.div
                  key={unit.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: unitIndex * 0.1 }}
                  className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] overflow-hidden"
                >
                  <div className="px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-surface)]/50">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-8 w-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                          unitIndex === 0
                            ? "bg-[var(--color-primary)] text-white"
                            : "bg-[var(--color-surface)] text-[var(--color-muted)]"
                        }`}
                      >
                        {unitIndex + 1}
                      </div>
                      <h3 className="font-semibold">{unit.title}</h3>
                      {unitIndex > 0 && (
                        <Badge variant="secondary" className="ml-auto">
                          Locked
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="divide-y divide-[var(--color-border)]">
                    {unit.lessons.map((lesson) => {
                      const isCompleted = completedLessons.includes(lesson.id);
                      return (
                      <Link
                        key={lesson.id}
                        href={
                          unitIndex === 0
                            ? `/lesson/${lesson.id}`
                            : "#"
                        }
                        className={`flex items-center justify-between px-6 py-4 transition-colors ${
                          unitIndex === 0
                            ? "hover:bg-[var(--color-surface)] cursor-pointer"
                            : "opacity-50 cursor-not-allowed"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center ${
                              isCompleted
                                ? "bg-emerald-500 text-white"
                                : "bg-[var(--color-surface)] text-[var(--color-muted)]"
                            }`}
                          >
                            {isCompleted ? (
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={3}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            ) : (
                              <BookOpen className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {lesson.title}
                            </p>
                            <p className="text-xs text-[var(--color-muted)]">
                              {lesson.xp} XP
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-[var(--color-muted)]" />
                      </Link>
                    );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] p-5 text-center">
              <Target className="h-6 w-6 text-[var(--color-primary)] mx-auto mb-2" />
              <p className="text-sm font-medium">Daily Goal</p>
              <p className="text-xs text-[var(--color-muted)]">
                {profile.daily_goal_minutes} min
              </p>
            </div>
            <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] p-5 text-center">
              <Trophy className="h-6 w-6 text-amber-500 mx-auto mb-2" />
              <p className="text-sm font-medium">Achievements</p>
              <p className="text-xs text-[var(--color-muted)]">0 earned</p>
            </div>
            <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] p-5 text-center">
              <BookOpen className="h-6 w-6 text-emerald-500 mx-auto mb-2" />
              <p className="text-sm font-medium">Words Learned</p>
              <p className="text-xs text-[var(--color-muted)]">0 words</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
