"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Flame, Star, Target, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getGamification, type GamificationState } from "@/lib/gamification";

export default function ProfilePage() {
  const router = useRouter();
  const [profile] = useState<{
    level: string;
    target_language_id: string;
  } | null>(() => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("luno_profile");
    return stored ? JSON.parse(stored) : null;
  });
  const [gamification] = useState<GamificationState>(() => {
    if (typeof window === "undefined") return { total_xp: 0, current_streak: 0, longest_streak: 0, completed_lessons: [], last_practice_date: null };
    return getGamification();
  });

  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "unauthenticated" || status === "loading") return null;
  if (!profile) return null;

  const levelTitle =
    profile.level.charAt(0).toUpperCase() + profile.level.slice(1);
  const langName =
    profile.target_language_id === "ru" ? "Russian" : "German";

  const achievements = [
    { name: "First Steps", description: "Complete your first lesson", icon: "👣", earned: gamification.completed_lessons.length >= 1 },
    { name: "Word Collector", description: "Learn 10 vocabulary words", icon: "📖", earned: gamification.completed_lessons.length >= 3 },
    { name: "Dedicated Learner", description: "Maintain a 7-day streak", icon: "🔥", earned: gamification.longest_streak >= 7 },
    { name: "Century Club", description: "Earn 1,000 XP", icon: "⭐", earned: gamification.total_xp >= 1000 },
    { name: "Perfect Score", description: "Complete 5 lessons", icon: "🎯", earned: gamification.completed_lessons.length >= 5 },
    { name: "Vocabulary Master", description: "Complete 10 lessons", icon: "🎓", earned: gamification.completed_lessons.length >= 10 },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <header className="bg-[var(--color-card)] border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl px-6 py-4">
          <h1 className="text-lg font-semibold">Your Profile</h1>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-[var(--color-primary)]">
                  {gamification.total_xp}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold">Your Stats</h2>
                <p className="text-sm text-[var(--color-muted)]">
                  {langName} · {levelTitle}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-xl bg-[var(--color-surface)]">
                <Star className="h-5 w-5 text-[var(--color-xp)] mx-auto mb-1" />
                <p className="text-lg font-bold">{gamification.total_xp}</p>
                <p className="text-xs text-[var(--color-muted)]">Total XP</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-[var(--color-surface)]">
                <Flame className="h-5 w-5 text-[var(--color-streak)] mx-auto mb-1" />
                <p className="text-lg font-bold">{gamification.current_streak}</p>
                <p className="text-xs text-[var(--color-muted)]">Current Streak</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-[var(--color-surface)]">
                <Calendar className="h-5 w-5 text-purple-500 mx-auto mb-1" />
                <p className="text-lg font-bold">{gamification.longest_streak}</p>
                <p className="text-xs text-[var(--color-muted)]">Longest Streak</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-[var(--color-surface)]">
                <Target className="h-5 w-5 text-emerald-500 mx-auto mb-1" />
                <p className="text-lg font-bold">{gamification.completed_lessons.length}</p>
                <p className="text-xs text-[var(--color-muted)]">Lessons Done</p>
              </div>
            </div>
          </div>

          <h2 className="text-lg font-semibold mb-4">Achievements</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((ach, i) => (
              <motion.div
                key={ach.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] p-5 ${
                  ach.earned ? "" : "opacity-50"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{ach.icon}</span>
                  <div>
                    <p className="font-semibold text-sm">{ach.name}</p>
                    {ach.earned && (
                      <Badge variant="success" className="text-[10px]">
                        Earned
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-xs text-[var(--color-muted)]">
                  {ach.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8">
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard")}
            >
              Back to Dashboard
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
