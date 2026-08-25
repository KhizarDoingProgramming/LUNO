"use client";

import { motion } from "framer-motion";
import { BookOpen, Headphones, Pen, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const reviewCategories = [
  {
    id: "vocabulary",
    title: "Vocabulary Review",
    description: "Practice words you've learned",
    icon: BookOpen,
    count: 0,
    color: "bg-blue-50 text-blue-500",
  },
  {
    id: "listening",
    title: "Listening Practice",
    description: "Improve your comprehension",
    icon: Headphones,
    count: 0,
    color: "bg-purple-50 text-purple-500",
  },
  {
    id: "writing",
    title: "Writing Practice",
    description: "Translate and write sentences",
    icon: Pen,
    count: 0,
    color: "bg-emerald-50 text-emerald-500",
  },
  {
    id: "speaking",
    title: "Conversation Practice",
    description: "Practice real dialogue",
    icon: MessageCircle,
    count: 0,
    color: "bg-amber-50 text-amber-500",
  },
];

export default function ReviewPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <header className="bg-[var(--color-card)] border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl px-6 py-4">
          <h1 className="text-lg font-semibold">Review</h1>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[var(--color-muted)] mb-8">
            Strengthen what you&apos;ve learned with targeted practice.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {reviewCategories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${cat.color}`}>
                    <cat.icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm text-[var(--color-muted)]">
                    {cat.count} items
                  </span>
                </div>
                <h3 className="font-semibold mb-1">{cat.title}</h3>
                <p className="text-sm text-[var(--color-muted)] mb-4">
                  {cat.description}
                </p>
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  Start review
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
