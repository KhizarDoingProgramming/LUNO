"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Headphones,
  Gamepad2,
  BarChart3,
  Zap,
  Trophy,
  Star,
  ArrowRight,
  Globe,
  MessageCircle,
  Repeat,
  ChevronDown,
  Flame,
  Target,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { SideNav } from "@/components/layout/side-nav";
import {
  ScrollReveal,
  Marquee,
  CountUp,
} from "@/components/ui/scroll-reveal";

const languages = [
  {
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
    flag: "🇷🇺",
    description:
      "Master the Cyrillic alphabet, conversational phrases, and cultural nuances of Russia's rich language.",
    color: "from-red-500/10 to-blue-500/10",
    borderColor: "border-red-200",
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    description:
      "Learn grammar, vocabulary, and everyday expressions used by millions across Germany, Austria, and Switzerland.",
    color: "from-yellow-500/10 to-red-500/10",
    borderColor: "border-yellow-200",
  },
];

const features = [
  {
    icon: BookOpen,
    title: "Structured Lessons",
    description: "Follow a curated path from basics to fluency.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Headphones,
    title: "Listen & Repeat",
    description: "Train your ear with native pronunciation.",
    color: "bg-sky/20 text-navy",
  },
  {
    icon: Gamepad2,
    title: "Interactive Exercises",
    description: "Multiple choice, translation, word order — never boring.",
    color: "bg-primary-light/10 text-primary-dark",
  },
  {
    icon: Repeat,
    title: "Spaced Review",
    description: "Smart repetition that locks words into memory.",
    color: "bg-success/10 text-success",
  },
  {
    icon: BarChart3,
    title: "Track Progress",
    description: "See your XP, streaks, and level grow over time.",
    color: "bg-warning/10 text-warning",
  },
  {
    icon: MessageCircle,
    title: "AI Conversations",
    description: "Practice real dialogue with AI-powered tutoring.",
    color: "bg-danger/10 text-danger",
  },
];

const steps = [
  {
    number: "01",
    title: "Choose Your Language",
    description: "Pick Russian or German — or learn both.",
    icon: Globe,
  },
  {
    number: "02",
    title: "Follow the Path",
    description: "Work through structured units and lessons.",
    icon: GraduationCap,
  },
  {
    number: "03",
    title: "Practice & Review",
    description: "Reinforce what you learn with spaced repetition.",
    icon: Repeat,
  },
  {
    number: "04",
    title: "Track Your Growth",
    description: "Earn XP, build streaks, and level up.",
    icon: BarChart3,
  },
];

const gamificationCards = [
  {
    icon: Zap,
    title: "Earn XP",
    description: "Every correct answer earns experience points.",
    color: "text-xp",
    bg: "bg-xp/10",
  },
  {
    icon: Flame,
    title: "Build Streaks",
    description: "Practice daily to keep your streak alive.",
    color: "text-streak",
    bg: "bg-streak/10",
  },
  {
    icon: Trophy,
    title: "Unlock Achievements",
    description: "Hit milestones and earn special badges.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Star,
    title: "Level Up",
    description: "Grow from Beginner to Master as you learn.",
    color: "text-sky",
    bg: "bg-sky/20",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <SideNav />

      {/* ===== HERO SECTION ===== */}
      <section
        id="hero"
        className="scroll-section bg-gradient-to-b from-cloud to-white relative"
      >
        <div className="absolute inset-0 pattern-dots" />

        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky/10 rounded-full blur-3xl" />

        <div className="scroll-section-content text-center">
          <ScrollReveal variant="fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-8">
              <Sparkles className="w-4 h-4" />
              Learn a new language today
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.1}>
            <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-bold text-navy leading-[1.05] tracking-tight mb-6">
              Learn a Language
              <br />
              Through{" "}
              <span className="text-gradient">Practice</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.2}>
            <p className="text-lg md:text-xl text-text-light max-w-2xl mx-auto mb-10 leading-relaxed">
              Master Russian and German with interactive lessons, spaced
              repetition, and gamified progress. Short daily sessions that
              actually work.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href="/auth/signup" className="btn-primary text-lg px-8 py-4">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#features"
                className="btn-secondary text-lg px-8 py-4"
              >
                See How It Works
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.4}>
            <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mb-12">
              <div className="text-center">
                <div className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-navy">
                  <CountUp end={2} />
                </div>
                <div className="text-sm text-muted font-medium mt-1">Languages</div>
              </div>
              <div className="text-center">
                <div className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-navy">
                  <CountUp end={100} suffix="+" />
                </div>
                <div className="text-sm text-muted font-medium mt-1">Lessons</div>
              </div>
              <div className="text-center">
                <div className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-navy">
                  <CountUp end={500} suffix="+" />
                </div>
                <div className="text-sm text-muted font-medium mt-1">Exercises</div>
              </div>
            </div>
          </ScrollReveal>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mt-4"
          >
            <ChevronDown className="w-6 h-6 text-muted mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* ===== LANGUAGES SECTION ===== */}
      <section
        id="languages"
        className="scroll-section bg-white relative"
      >
        <div className="absolute inset-0 pattern-grid" />

        <div className="scroll-section-content">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-primary uppercase tracking-widest">
                Choose Your Path
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-bold text-navy mt-4 mb-6">
                Two Languages.
                <br />
                <span className="text-gradient">Infinite Possibilities.</span>
              </h2>
              <p className="text-lg text-text-light max-w-xl mx-auto">
                Start with the language that excites you most. Both paths are
                designed to get you conversational fast.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {languages.map((lang, i) => (
              <ScrollReveal
                key={lang.code}
                variant={i === 0 ? "fade-left" : "fade-right"}
                delay={i * 0.15}
              >
                <div
                  className={`card-elevated p-8 text-center group cursor-pointer bg-gradient-to-br ${lang.color} border ${lang.borderColor}`}
                >
                  <div className="text-6xl mb-6">{lang.flag}</div>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-navy mb-2">
                    {lang.name}
                  </h3>
                  <p className="text-lg text-primary font-semibold mb-4">
                    {lang.nativeName}
                  </p>
                  <p className="text-text-light leading-relaxed">
                    {lang.description}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                    Start Learning
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MARQUEE DIVIDER ===== */}
      <div className="py-8 bg-navy overflow-hidden">
        <Marquee
          text="LEARN \u00B7 PRACTICE \u00B7 MASTER \u00B7 REPEAT"
          size="xl"
          color="rgba(255,255,255,0.08)"
          duration={15}
        />
      </div>

      {/* ===== FEATURES SECTION ===== */}
      <section
        id="features"
        className="scroll-section bg-cloud relative"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="scroll-section-content">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-primary uppercase tracking-widest">
                Everything You Need
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-bold text-navy mt-4 mb-6">
                Built to Help You
                <br />
                <span className="text-gradient">Actually Learn.</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.title} variant="fade-up" delay={i * 0.08}>
                <div className="card-elevated p-6 h-full">
                  <div
                    className={`w-12 h-12 rounded-2xl ${feature.color} flex items-center justify-center mb-4`}
                  >
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-navy mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-text-light text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== METHOD SECTION ===== */}
      <section
        id="method"
        className="scroll-section bg-white relative"
      >
        <div className="absolute inset-0 pattern-dots" />

        <div className="scroll-section-content">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-primary uppercase tracking-widest">
                How It Works
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-bold text-navy mt-4 mb-6">
                Four Steps to
                <br />
                <span className="text-gradient">Fluency.</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

            <div className="space-y-12">
              {steps.map((step, i) => (
                <ScrollReveal key={step.number} variant="fade-left" delay={i * 0.12}>
                  <div className="flex items-start gap-6 md:gap-8">
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-[family-name:var(--font-display)] font-bold text-sm z-10 relative">
                        {step.number}
                      </div>
                    </div>
                    <div className="pt-1">
                      <div className="flex items-center gap-3 mb-2">
                        <step.icon className="w-5 h-5 text-primary" />
                        <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-navy">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-text-light leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== GAMIFICATION SECTION ===== */}
      <section
        id="gamification"
        className="scroll-section bg-gradient-to-b from-cloud to-white relative"
      >
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

        <div className="scroll-section-content">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-primary uppercase tracking-widest">
                Stay Motivated
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-bold text-navy mt-4 mb-6">
                Learning That
                <br />
                <span className="text-gradient-warm">Feels Like a Game.</span>
              </h2>
              <p className="text-lg text-text-light max-w-xl mx-auto">
                Earn points, build streaks, unlock achievements, and watch your
                level climb. Every session counts.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
            {gamificationCards.map((card, i) => (
              <ScrollReveal key={card.title} variant="scale" delay={i * 0.1}>
                <div className="card-elevated p-6 flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-2xl ${card.bg} flex items-center justify-center flex-shrink-0`}
                  >
                    <card.icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-navy mb-1">
                      {card.title}
                    </h3>
                    <p className="text-text-light text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal variant="fade-up" delay={0.4}>
            <div className="card-elevated p-8 max-w-2xl mx-auto bg-gradient-to-br from-primary/5 to-sky/10 text-center">
              <div className="flex items-center justify-center gap-8 mb-6">
                <div>
                  <div className="font-[family-name:var(--font-display)] text-4xl font-bold text-primary">
                    <CountUp end={10} />
                  </div>
                  <div className="text-sm text-muted font-medium">Levels</div>
                </div>
                <div className="w-px h-12 bg-border" />
                <div>
                  <div className="font-[family-name:var(--font-display)] text-4xl font-bold text-xp">
                    <CountUp end={5000} suffix="+" />
                  </div>
                  <div className="text-sm text-muted font-medium">Max XP</div>
                </div>
                <div className="w-px h-12 bg-border" />
                <div>
                  <div className="font-[family-name:var(--font-display)] text-4xl font-bold text-streak">
                    <CountUp end={8} />
                  </div>
                  <div className="text-sm text-muted font-medium">Achievements</div>
                </div>
              </div>
              <p className="text-text-light text-sm">
                From <strong className="text-navy">Beginner</strong> to{" "}
                <strong className="text-navy">Master</strong> — every point
                brings you closer.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section
        id="cta"
        className="scroll-section bg-navy relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-sky/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 pattern-dots opacity-10" />
        </div>

        <div className="scroll-section-content text-center relative z-10">
          <ScrollReveal variant="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Start Learning
              <br />
              <span className="text-sky">Today.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.1}>
            <p className="text-lg md:text-xl text-sky/70 max-w-xl mx-auto mb-10 leading-relaxed">
              Join LUNO and begin your journey to fluency. Short lessons,
              real progress, zero cost.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-navy font-semibold text-lg rounded-full hover:bg-sky-light transition-all hover:-translate-y-1 shadow-lg"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold text-lg rounded-full hover:bg-white/10 transition-all"
              >
                Log In
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-in" delay={0.4}>
            <p className="mt-12 text-sm text-sky/40">
              No credit card required. Free forever.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-navy border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
                <span className="font-[family-name:var(--font-display)] text-white font-bold text-lg">
                  LUNO
                </span>
              </div>
              <p className="text-sm text-sky/50 leading-relaxed">
                Learn languages through short, interactive practice sessions.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">
                Languages
              </h4>
              <ul className="space-y-2 text-sm text-sky/50">
                <li className="hover:text-white transition-colors cursor-pointer">
                  Russian
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  German
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">
                Product
              </h4>
              <ul className="space-y-2 text-sm text-sky/50">
                <li className="hover:text-white transition-colors cursor-pointer">
                  Features
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  How It Works
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Pricing
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">
                Legal
              </h4>
              <ul className="space-y-2 text-sm text-sky/50">
                <li className="hover:text-white transition-colors cursor-pointer">
                  Privacy
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Terms
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-sky/40">
              &copy; {new Date().getFullYear()} LUNO. All rights reserved.
            </p>
            <p className="text-sm text-sky/40">
              Built with care for language learners everywhere.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
