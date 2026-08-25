"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
import { useState, useEffect } from "react";

const languages = [
  {
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
    flag: "🇷🇺",
    words: ["Привет", "Спасибо", "Да", "Нет", "Здравствуйте"],
    color: "from-red-500 to-blue-500",
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    words: ["Hallo", "Danke", "Ja", "Nein", "Guten Tag"],
    color: "from-yellow-500 to-red-500",
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
    description: "Translation, word order, listening — never boring.",
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

function FloatingWords() {
  const [activeLang, setActiveLang] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLang((prev) => (prev + 1) % languages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const lang = languages[activeLang];

  return (
    <div className="relative w-full h-80 md:h-[420px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeLang}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            {lang.words.map((word, i) => {
              const positions = [
                { top: "5%", left: "10%", size: "text-2xl md:text-3xl" },
                { top: "25%", right: "5%", size: "text-xl md:text-2xl" },
                { top: "50%", left: "15%", size: "text-lg md:text-xl" },
                { top: "70%", right: "10%", size: "text-2xl md:text-3xl" },
                { top: "85%", left: "25%", size: "text-lg md:text-2xl" },
              ];
              const pos = positions[i];

              return (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: [0.15, 0.9, 0.15],
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`absolute font-[family-name:var(--font-display)] font-bold ${pos.size} text-navy/20`}
                  style={{
                    top: pos.top,
                    left: pos.left,
                    right: pos.right,
                  }}
                >
                  {word}
                </motion.span>
              );
            })}

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-2xl shadow-primary/30">
                <span className="text-5xl md:text-6xl">{lang.flag}</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 rounded-full border border-dashed border-primary/15"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-96 md:h-96 rounded-full border border-dashed border-sky/15"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-3">
        {languages.map((l, i) => (
          <button
            key={l.code}
            onClick={() => setActiveLang(i)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeLang === i
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-white text-navy hover:bg-primary/10"
            }`}
          >
            {l.flag} {l.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function GamificationVisual() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const gamificationSteps = [
    {
      icon: "📝",
      label: "Complete Lesson",
      value: "+50 XP",
      color: "text-primary",
    },
    {
      icon: "🔥",
      label: "7-Day Streak",
      value: "1.5x Bonus",
      color: "text-streak",
    },
    {
      icon: "🏆",
      label: "Achievement Unlocked",
      value: "Word Collector",
      color: "text-xp",
    },
    {
      icon: "⭐",
      label: "Level Up!",
      value: "Level 3",
      color: "text-primary",
    },
  ];

  return (
    <div className="relative w-full h-80 md:h-[420px] flex items-center justify-center">
      <div className="relative">
        <div className="w-56 h-[340px] md:w-64 md:h-[400px] bg-navy rounded-[2rem] shadow-2xl shadow-navy/30 p-4 border-4 border-navy-light overflow-hidden">
          <div className="bg-white rounded-2xl h-full p-4 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm">🇷🇺</span>
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-navy">Russian Basics</div>
                <div className="text-[10px] text-muted">Lesson 3 of 5</div>
              </div>
              <span className="text-xs font-bold text-primary">+50 XP</span>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-4xl mb-3">{gamificationSteps[step].icon}</span>
                  <div className={`text-lg font-bold font-[family-name:var(--font-display)] ${gamificationSteps[step].color}`}>
                    {gamificationSteps[step].value}
                  </div>
                  <div className="text-xs text-muted mt-1">
                    {gamificationSteps[step].label}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted">Daily Goal</span>
                <span className="font-semibold text-navy">12/15 min</span>
              </div>
              <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "80%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full"
                />
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1">
                  <Flame className="w-3 h-3 text-streak" />
                  <span className="font-bold text-streak">7</span>
                  <span className="text-muted">day streak</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-xp" />
                  <span className="font-bold text-xp">350</span>
                  <span className="text-muted">XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-4 -right-8 bg-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
            <span className="text-sm">✅</span>
          </div>
          <div>
            <div className="text-[10px] font-bold text-navy">Correct!</div>
            <div className="text-[10px] text-success">+10 XP</div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-2 -left-6 bg-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-full bg-xp/10 flex items-center justify-center">
            <span className="text-sm">🔥</span>
          </div>
          <div>
            <div className="text-[10px] font-bold text-navy">Streak!</div>
            <div className="text-[10px] text-xp">7 days</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <SideNav />

      {/* ===== HERO ===== */}
      <section id="hero" className="scroll-section bg-gradient-to-b from-cloud to-white relative min-h-screen">
        <div className="absolute inset-0 pattern-dots" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky/10 rounded-full blur-3xl" />

        <div className="scroll-section-content w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[80vh]">
            <div className="flex flex-col justify-center">
              <ScrollReveal variant="fade-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 w-fit">
                  <Sparkles className="w-4 h-4" />
                  Learn a new language today
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" delay={0.1}>
                <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-7xl font-bold text-navy leading-[1.05] tracking-tight mb-6">
                  Learn a Language
                  <br />
                  Through{" "}
                  <span className="text-gradient">Practice</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" delay={0.2}>
                <p className="text-lg md:text-xl text-text-light max-w-lg mb-8 leading-relaxed">
                  Master Russian and German with interactive lessons, spaced
                  repetition, and gamified progress.
                </p>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" delay={0.3}>
                <div className="flex flex-col sm:flex-row items-start gap-4 mb-10">
                  <Link href="/auth/signup" className="btn-primary text-lg px-8 py-4">
                    Get Started Free
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href="#features" className="btn-secondary text-lg px-8 py-4">
                    See How It Works
                  </Link>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" delay={0.4}>
                <div className="flex items-center gap-8">
                  <div>
                    <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-navy">
                      <CountUp end={2} />
                    </div>
                    <div className="text-xs text-muted font-medium">Languages</div>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div>
                    <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-navy">
                      <CountUp end={100} suffix="+" />
                    </div>
                    <div className="text-xs text-muted font-medium">Lessons</div>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div>
                    <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-navy">
                      <CountUp end={500} suffix="+" />
                    </div>
                    <div className="text-xs text-muted font-medium">Exercises</div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal variant="fade-right" delay={0.2}>
              <FloatingWords />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== LANGUAGES ===== */}
      <section id="languages" className="scroll-section bg-white relative">
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
                Start with the language that excites you most.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {languages.map((lang, i) => (
              <ScrollReveal key={lang.code} variant={i === 0 ? "fade-left" : "fade-right"} delay={i * 0.15}>
                <Link href="/auth/signup">
                  <div className="card-elevated p-8 text-center group cursor-pointer hover:shadow-xl transition-all duration-300">
                    <div className="text-6xl mb-6">{lang.flag}</div>
                    <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-navy mb-2">
                      {lang.name}
                    </h3>
                    <p className="text-lg text-primary font-semibold mb-4">{lang.nativeName}</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      {lang.words.slice(0, 3).map((word) => (
                        <span key={word} className="px-3 py-1 rounded-full bg-surface text-sm text-text-light font-medium">
                          {word}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                      Start Learning <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <div className="py-8 bg-navy overflow-hidden">
        <Marquee text="LEARN \u00B7 PRACTICE \u00B7 MASTER \u00B7 REPEAT" size="xl" color="rgba(255,255,255,0.08)" duration={15} />
      </div>

      {/* ===== FEATURES ===== */}
      <section id="features" className="scroll-section bg-cloud relative">
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
                  <div className={`w-12 h-12 rounded-2xl ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-navy mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-text-light text-sm leading-relaxed">{feature.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="method" className="scroll-section bg-white relative">
        <div className="absolute inset-0 pattern-dots" />
        <div className="scroll-section-content">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-primary uppercase tracking-widest">How It Works</span>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-bold text-navy mt-4 mb-6">
                Four Steps to <span className="text-gradient">Fluency.</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
            <div className="space-y-12">
              {steps.map((step, i) => (
                <ScrollReveal key={step.number} variant="fade-left" delay={i * 0.12}>
                  <div className="flex items-start gap-6 md:gap-8">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-[family-name:var(--font-display)] font-bold text-sm flex-shrink-0 z-10">
                      {step.number}
                    </div>
                    <div className="pt-1">
                      <div className="flex items-center gap-3 mb-2">
                        <step.icon className="w-5 h-5 text-primary" />
                        <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-navy">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-text-light leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== GAMIFICATION ===== */}
      <section id="gamification" className="scroll-section bg-gradient-to-b from-cloud to-white relative min-h-screen">
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="scroll-section-content w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[80vh]">
            <div className="flex flex-col justify-center order-2 lg:order-1">
              <ScrollReveal variant="fade-left">
                <span className="text-sm font-semibold text-primary uppercase tracking-widest">
                  Stay Motivated
                </span>
                <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold text-navy mt-4 mb-6 leading-tight">
                  Learning That
                  <br />
                  <span className="text-gradient-warm">Feels Like a Game.</span>
                </h2>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" delay={0.1}>
                <p className="text-lg text-text-light max-w-md mb-10 leading-relaxed">
                  Earn XP for every correct answer. Build daily streaks.
                  Unlock achievements. Watch your level climb from Beginner
                  to Master.
                </p>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" delay={0.2}>
                <div className="space-y-6 mb-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-xp/10 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-xp" />
                    </div>
                    <div>
                      <div className="font-[family-name:var(--font-display)] font-bold text-navy">Earn XP</div>
                      <div className="text-sm text-text-light">Every correct answer earns points</div>
                    </div>
                    <div className="ml-auto font-[family-name:var(--font-display)] font-bold text-xp text-sm">+10 XP</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-streak/10 flex items-center justify-center flex-shrink-0">
                      <Flame className="w-6 h-6 text-streak" />
                    </div>
                    <div>
                      <div className="font-[family-name:var(--font-display)] font-bold text-navy">Build Streaks</div>
                      <div className="text-sm text-text-light">Practice daily to keep your streak</div>
                    </div>
                    <div className="ml-auto font-[family-name:var(--font-display)] font-bold text-streak text-sm">1.5x Bonus</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Trophy className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-[family-name:var(--font-display)] font-bold text-navy">Level Up</div>
                      <div className="text-sm text-text-light">10 levels from Beginner to Master</div>
                    </div>
                    <div className="ml-auto font-[family-name:var(--font-display)] font-bold text-primary text-sm">Lv. 10</div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" delay={0.3}>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="font-[family-name:var(--font-display)] text-3xl font-bold text-primary">
                      <CountUp end={10} />
                    </div>
                    <div className="text-xs text-muted font-medium">Levels</div>
                  </div>
                  <div className="w-px h-10 bg-border" />
                  <div className="text-center">
                    <div className="font-[family-name:var(--font-display)] text-3xl font-bold text-xp">
                      <CountUp end={5000} suffix="+" />
                    </div>
                    <div className="text-xs text-muted font-medium">Max XP</div>
                  </div>
                  <div className="w-px h-10 bg-border" />
                  <div className="text-center">
                    <div className="font-[family-name:var(--font-display)] text-3xl font-bold text-streak">
                      <CountUp end={8} />
                    </div>
                    <div className="text-xs text-muted font-medium">Achievements</div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal variant="fade-right" delay={0.2} className="order-1 lg:order-2">
              <GamificationVisual />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section id="cta" className="scroll-section bg-navy relative overflow-hidden">
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
              Short lessons, real progress, zero cost.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-navy font-semibold text-lg rounded-full hover:bg-sky-light transition-all hover:-translate-y-1 shadow-lg">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/auth/login" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold text-lg rounded-full hover:bg-white/10 transition-all">
                Log In
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-in" delay={0.4}>
            <p className="mt-12 text-sm text-sky/40">No credit card required. Free forever.</p>
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
                <span className="font-[family-name:var(--font-display)] text-white font-bold text-lg">LUNO</span>
              </div>
              <p className="text-sm text-sky/50 leading-relaxed">
                Learn languages through short, interactive practice sessions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">Languages</h4>
              <ul className="space-y-2 text-sm text-sky/50">
                <li className="hover:text-white transition-colors cursor-pointer">Russian</li>
                <li className="hover:text-white transition-colors cursor-pointer">German</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">Product</h4>
              <ul className="space-y-2 text-sm text-sky/50">
                <li className="hover:text-white transition-colors cursor-pointer">Features</li>
                <li className="hover:text-white transition-colors cursor-pointer">How It Works</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2 text-sm text-sky/50">
                <li className="hover:text-white transition-colors cursor-pointer">Privacy</li>
                <li className="hover:text-white transition-colors cursor-pointer">Terms</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-sky/40">&copy; {new Date().getFullYear()} LUNO. All rights reserved.</p>
            <p className="text-sm text-sky/40">Built with care for language learners everywhere.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
