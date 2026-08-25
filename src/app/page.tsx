"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Zap,
  Target,
  MessageCircle,
  TrendingUp,
  Volume2,
  Puzzle,
  Languages,
  Trophy,
  Flame,
  Star,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-24 lg:py-32">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-6">
            <div className="inline-flex items-center gap-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full px-4 py-1.5 text-sm font-medium mb-8">
              <Zap className="h-3.5 w-3.5" />
              Learn Russian & German
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6"
          >
            Learn a language
            <br />
            <span className="text-[var(--color-primary)]">through practice</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-[var(--color-muted)] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Short, interactive lessons that build real fluency.
            Vocabulary, grammar, listening, and conversation — all in one place.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/auth/signup">
              <Button size="xl" className="min-w-[200px]">
                Start learning free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="#method">
              <Button variant="outline" size="xl" className="min-w-[200px]">
                See how it works
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto"
          >
            {[
              { label: "Interactive lessons", icon: BookOpen },
              { label: "Track progress", icon: TrendingUp },
              { label: "Build streaks", icon: Flame },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <item.icon className="h-5 w-5 text-[var(--color-primary)]" />
                <span className="text-xs text-[var(--color-muted)] font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-20 relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute -inset-4 bg-[var(--color-primary)]/10 rounded-3xl blur-2xl" />
            <div className="relative bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] shadow-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <Languages className="h-5 w-5 text-[var(--color-primary)]" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Russian — Beginner</p>
                  <p className="text-xs text-[var(--color-muted)]">
                    Unit 1: Greetings
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Flame className="h-4 w-4 text-[var(--color-streak)]" />
                  <span className="text-sm font-semibold">5</span>
                  <Star className="h-4 w-4 text-[var(--color-xp)] ml-2" />
                  <span className="text-sm font-semibold">120 XP</span>
                </div>
              </div>

              <div className="bg-[var(--color-surface)] rounded-xl p-6 mb-4">
                <p className="text-sm text-[var(--color-muted)] mb-2">
                  What does this mean?
                </p>
                <p className="text-2xl font-bold mb-4">Здравствуйте</p>
                <div className="grid grid-cols-2 gap-3">
                  {["Hello (formal)", "Goodbye", "Thank you", "Please"].map(
                    (option, i) => (
                      <div
                        key={option}
                        className={`p-3 rounded-xl border-2 text-sm font-medium transition-all cursor-pointer ${
                          i === 0
                            ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[var(--color-primary)]"
                            : "border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-primary)]/30"
                        }`}
                      >
                        {option}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs text-[var(--color-muted)]">
                  Question 1 of 5
                </p>
                <div className="h-1.5 w-32 bg-[var(--color-surface)] rounded-full overflow-hidden">
                  <div className="h-full w-[20%] bg-[var(--color-primary)] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function LanguageSection() {
  const languages = [
    {
      code: "ru",
      name: "Russian",
      nativeName: "Русский",
      flag: "🇷🇺",
      description:
        "Master Cyrillic script, cases, verb aspects, and conversational fluency.",
    },
    {
      code: "de",
      name: "German",
      nativeName: "Deutsch",
      flag: "🇩🇪",
      description:
        "Learn articles, cases, compound words, and natural pronunciation.",
    },
  ];

  return (
    <section id="languages" className="py-24 lg:py-32 bg-[var(--color-card)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold text-[var(--color-primary)] mb-3 uppercase tracking-wider">
            Available languages
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Start with Russian or German
          </h2>
          <p className="text-[var(--color-muted)] max-w-xl mx-auto">
            Both languages are built with proper linguistic modeling — cases,
            conjugations, gender, and real-world usage.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {languages.map((lang, i) => (
            <motion.div
              key={lang.code}
              className="group relative bg-[var(--color-surface)] rounded-2xl p-8 border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-all duration-300 hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="text-5xl mb-4">{lang.flag}</div>
              <h3 className="text-xl font-bold mb-1">{lang.name}</h3>
              <p className="text-sm text-[var(--color-muted)] mb-4">
                {lang.nativeName}
              </p>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                {lang.description}
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                Start learning
                <ArrowRight className="h-4 w-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: BookOpen,
      title: "Structured lessons",
      description:
        "Short, focused lessons that teach vocabulary, grammar, and real usage step by step.",
    },
    {
      icon: Volume2,
      title: "Listen & repeat",
      description:
        "Hear native pronunciation and practice speaking with audio-guided exercises.",
    },
    {
      icon: Puzzle,
      title: "Interactive exercises",
      description:
        "Multiple choice, translation, word ordering, fill-in-the-blank, and matching.",
    },
    {
      icon: Brain,
      title: "Spaced review",
      description:
        "Words you struggle with come back at the right time to strengthen your memory.",
    },
    {
      icon: Target,
      title: "Track progress",
      description:
        "See your mastery grow. Know exactly where you are and what to practice next.",
    },
    {
      icon: MessageCircle,
      title: "Real conversations",
      description:
        "Practice real dialogue with AI that corrects your mistakes and teaches naturally.",
    },
  ];

  return (
    <section id="features" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold text-[var(--color-primary)] mb-3 uppercase tracking-wider">
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Everything you need to learn a language
          </h2>
          <p className="text-[var(--color-muted)] max-w-xl mx-auto">
            LUNO combines structured curriculum with adaptive practice to build
            real fluency.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="group p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="h-11 w-11 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors duration-300">
                <feature.icon className="h-5 w-5 text-[var(--color-primary)] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MethodSection() {
  const steps = [
    {
      step: "01",
      title: "Choose your language",
      description: "Pick Russian or German and set your learning level.",
    },
    {
      step: "02",
      title: "Follow the path",
      description:
        "Work through structured units — from greetings to real conversation.",
    },
    {
      step: "03",
      title: "Practice & review",
      description:
        "Complete exercises, review mistakes, and strengthen weak areas.",
    },
    {
      step: "04",
      title: "Track your growth",
      description:
        "Earn XP, maintain streaks, and watch your fluency build over time.",
    },
  ];

  return (
    <section
      id="method"
      className="py-24 lg:py-32 bg-[var(--color-card)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold text-[var(--color-primary)] mb-3 uppercase tracking-wider">
            The LUNO method
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Learn → Practice → Review → Progress
          </h2>
          <p className="text-[var(--color-muted)] max-w-xl mx-auto">
            A simple, proven loop that builds real language ability.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              className="relative text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="text-5xl font-bold text-[var(--color-primary)]/10 mb-4">
                {step.step}
              </div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                {step.description}
              </p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] border-t border-dashed border-[var(--color-border)]" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GamificationSection() {
  const items = [
    {
      icon: Zap,
      title: "Earn XP",
      description: "Every correct answer earns experience points.",
      color: "text-yellow-500",
      bg: "bg-yellow-50",
    },
    {
      icon: Flame,
      title: "Build streaks",
      description: "Learn every day to keep your streak alive.",
      color: "text-red-500",
      bg: "bg-red-50",
    },
    {
      icon: Trophy,
      title: "Unlock achievements",
      description: "Hit milestones and earn special rewards.",
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
    {
      icon: TrendingUp,
      title: "Level up",
      description: "Watch your level grow as you learn more.",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
  ];

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold text-[var(--color-primary)] mb-3 uppercase tracking-wider">
            Stay motivated
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Gamified learning that works
          </h2>
          <p className="text-[var(--color-muted)] max-w-xl mx-auto">
            Progress feels rewarding. Every session brings you closer to your
            goals.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              className="text-center p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div
                className={`h-14 w-14 rounded-2xl ${item.bg} flex items-center justify-center mx-auto mb-4`}
              >
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--color-muted)]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="relative bg-[var(--color-primary)] rounded-3xl p-12 lg:p-16 text-center overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTRWMjhIMjR2Mmgxem0tMi0ydi0ySDE4djJoMTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Start learning today
            </h2>
            <p className="text-white/80 max-w-lg mx-auto mb-8">
              Join LUNO and begin your language learning journey. No credit card
              required.
            </p>
            <Link href="/auth/signup">
              <Button
                size="xl"
                className="bg-white text-[var(--color-primary)] hover:bg-white/90 min-w-[220px]"
              >
                Get started free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <LanguageSection />
        <FeaturesSection />
        <MethodSection />
        <GamificationSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
