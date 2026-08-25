"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, BookOpen, BarChart3, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const languages = [
  { id: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
  { id: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
];

const levels = [
  {
    id: "beginner",
    title: "Beginner",
    description: "New to the language or just starting out",
  },
  {
    id: "elementary",
    title: "Elementary",
    description: "Know some basics and common phrases",
  },
  {
    id: "intermediate",
    title: "Intermediate",
    description: "Can hold basic conversations",
  },
];

const dailyGoals = [
  { id: 5, label: "5 min", description: "Casual" },
  { id: 10, label: "10 min", description: "Regular" },
  { id: 15, label: "15 min", description: "Dedicated" },
  { id: 20, label: "20 min", description: "Intensive" },
];

const steps = [
  { title: "Welcome", icon: Sparkles },
  { title: "Learning", icon: BookOpen },
  { title: "Your level", icon: BarChart3 },
  { title: "Daily goal", icon: Clock },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [targetLanguage, setTargetLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [dailyGoal, setDailyGoal] = useState(10);
  const [loading, setLoading] = useState(false);

  const canProceed = () => {
    switch (step) {
      case 0:
        return true;
      case 1:
        return targetLanguage !== "";
      case 2:
        return level !== "";
      case 3:
        return dailyGoal > 0;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      const profileData = {
        native_language_id: "en",
        target_language_id: targetLanguage,
        level,
        daily_goal_minutes: dailyGoal,
      };

      localStorage.setItem("luno_profile", JSON.stringify(profileData));
      router.push("/dashboard");
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        <div className="flex items-center gap-2.5 mb-8">
          <div className="h-9 w-9 rounded-xl bg-[var(--color-primary)] flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-xl font-bold">LUNO</span>
        </div>

        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s.title} className="flex items-center gap-2">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  i <= step
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-[var(--color-surface)] text-[var(--color-muted)]"
                }`}
              >
                {i < step ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <s.icon className="h-4 w-4" />
                )}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`w-12 h-0.5 rounded-full transition-colors ${
                    i < step ? "bg-[var(--color-primary)]" : "bg-[var(--color-surface)]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {step === 0 && (
              <div className="text-center">
                <div className="h-16 w-16 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="h-8 w-8 text-[var(--color-primary)]" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Welcome to LUNO!</h2>
                <p className="text-[var(--color-muted)] mb-8 max-w-sm mx-auto">
                  Your journey to learn Russian &amp; German starts here.
                  Let&apos;s set up your learning profile in a few quick steps.
                </p>
                <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
                  <div className="p-4 rounded-xl bg-[var(--color-surface)]">
                    <span className="text-2xl mb-2 block">🇷🇺</span>
                    <p className="text-xs font-medium text-[var(--color-muted)]">Russian</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[var(--color-surface)]">
                    <span className="text-2xl mb-2 block">🇩🇪</span>
                    <p className="text-xs font-medium text-[var(--color-muted)]">German</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[var(--color-surface)]">
                    <span className="text-2xl mb-2 block">🎯</span>
                    <p className="text-xs font-medium text-[var(--color-muted)]">Gamified</p>
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-2">What do you want to learn?</h2>
                <p className="text-[var(--color-muted)] mb-8">
                  Choose a language to start your journey.
                </p>
                <div className="space-y-3">
                  {languages.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => setTargetLanguage(lang.id)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${
                        targetLanguage === lang.id
                          ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                          : "border-[var(--color-border)] hover:border-[var(--color-primary)]/30"
                      }`}
                    >
                      <span className="text-3xl">{lang.flag}</span>
                      <div>
                        <p className="font-semibold">{lang.name}</p>
                        <p className="text-sm text-[var(--color-muted)]">
                          {lang.nativeName}
                        </p>
                      </div>
                      {targetLanguage === lang.id && (
                        <Check className="h-5 w-5 text-[var(--color-primary)] ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-2">What&apos;s your level?</h2>
                <p className="text-[var(--color-muted)] mb-8">
                  This helps us start you at the right place.
                </p>
                <div className="space-y-3">
                  {levels.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => setLevel(l.id)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        level === l.id
                          ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                          : "border-[var(--color-border)] hover:border-[var(--color-primary)]/30"
                      }`}
                    >
                      <p className="font-semibold">{l.title}</p>
                      <p className="text-sm text-[var(--color-muted)]">
                        {l.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-2">Set a daily goal</h2>
                <p className="text-[var(--color-muted)] mb-8">
                  How much time can you dedicate each day?
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {dailyGoals.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setDailyGoal(g.id)}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        dailyGoal === g.id
                          ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                          : "border-[var(--color-border)] hover:border-[var(--color-primary)]/30"
                      }`}
                    >
                      <p className="text-2xl font-bold mb-1">{g.label}</p>
                      <p className="text-sm text-[var(--color-muted)]">
                        {g.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-10">
          <Button
            variant="ghost"
            onClick={() => (step > 0 ? setStep(step - 1) : router.push("/"))}
            disabled={loading}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed() || loading}
          >
            {step === 3 ? "Start learning" : "Continue"}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
