"use client";

import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  Star,
  Flame,
  RotateCcw,
  Trophy,
  Volume2,
  Shuffle,
  PenLine,
  ListOrdered,
} from "lucide-react";

interface ExerciseOption {
  id: string;
  text: string;
  is_correct: boolean;
}

interface Exercise {
  id: string;
  type: string;
  question: string;
  correct_answer: string;
  explanation?: string;
  xp_value: number;
  options?: ExerciseOption[];
  metadata?: { words?: string[] };
}

interface LessonData {
  id: string;
  title: string;
  exercises: Exercise[];
}

const lessonDatabase: Record<string, LessonData> = {
  "l1000000-0000-0000-0000-000000000001": {
    id: "l1000000-0000-0000-0000-000000000001",
    title: "Basic Hello",
    exercises: [
      {
        id: "e1", type: "multiple_choice",
        question: 'What does "Здравствуйте" mean?',
        correct_answer: "Hello (formal)", xp_value: 10,
        explanation: "Здравствуйте is the formal way to say hello in Russian.",
        options: [
          { id: "1", text: "Goodbye", is_correct: false },
          { id: "2", text: "Hello (formal)", is_correct: true },
          { id: "3", text: "Thank you", is_correct: false },
          { id: "4", text: "Please", is_correct: false },
        ],
      },
      {
        id: "e2", type: "translation",
        question: 'Translate to Russian: "Hello"',
        correct_answer: "Привет", xp_value: 10,
        explanation: "Привет is the informal way to say hello.",
      },
      {
        id: "e3", type: "word_order",
        question: "Arrange the words to form a sentence:",
        correct_answer: "Как дела?", xp_value: 10,
        explanation: "Как дела? means How are you?",
        metadata: { words: ["как", "дела", "?"] },
      },
      {
        id: "e4", type: "fill_blank",
        question: '____, как дела? (Hello, how are you?)',
        correct_answer: "Привет", xp_value: 10,
        explanation: "Привет is the informal greeting.",
      },
      {
        id: "e5", type: "multiple_choice",
        question: 'What does "Привет" mean?',
        correct_answer: "Hi (informal)", xp_value: 10,
        explanation: "Привет is the informal way to say hi.",
        options: [
          { id: "1", text: "Goodbye", is_correct: false },
          { id: "2", text: "Please", is_correct: false },
          { id: "3", text: "Hi (informal)", is_correct: true },
          { id: "4", text: "Thank you", is_correct: false },
        ],
      },
      {
        id: "e6", type: "listening",
        question: 'Listen and type what you hear: "Спасибо"',
        correct_answer: "Спасибо", xp_value: 15,
        explanation: "Спасибо means Thank you in Russian.",
        metadata: { words: ["Спасибо"] },
      },
      {
        id: "e7", type: "translation",
        question: 'Translate to Russian: "Thank you"',
        correct_answer: "Спасибо", xp_value: 10,
        explanation: "Спасибо is how you say thank you.",
      },
    ],
  },
  "l2000000-0000-0000-0000-000000000001": {
    id: "l2000000-0000-0000-0000-000000000001",
    title: "Basic Hello",
    exercises: [
      {
        id: "e21", type: "multiple_choice",
        question: 'What does "Hallo" mean?',
        correct_answer: "Hello", xp_value: 10,
        explanation: "Hallo is the most common informal greeting in German.",
        options: [
          { id: "1", text: "Goodbye", is_correct: false },
          { id: "2", text: "Hello", is_correct: true },
          { id: "3", text: "Thank you", is_correct: false },
          { id: "4", text: "Please", is_correct: false },
        ],
      },
      {
        id: "e22", type: "translation",
        question: 'Translate to German: "Good day"',
        correct_answer: "Guten Tag", xp_value: 10,
        explanation: "Guten Tag is a formal greeting used during the day.",
      },
      {
        id: "e23", type: "word_order",
        question: "Arrange the words to form a greeting:",
        correct_answer: "Guten Tag", xp_value: 10,
        explanation: "Guten Tag means Good day.",
        metadata: { words: ["Tag", "Guten"] },
      },
      {
        id: "e24", type: "fill_blank",
        question: '____, wie geht es Ihnen? (Hello, how are you?)',
        correct_answer: "Guten Tag", xp_value: 10,
        explanation: "Guten Tag is the formal daytime greeting.",
      },
      {
        id: "e25", type: "multiple_choice",
        question: 'What does "Danke" mean?',
        correct_answer: "Thank you", xp_value: 10,
        explanation: "Danke means Thank you.",
        options: [
          { id: "1", text: "Please", is_correct: false },
          { id: "2", text: "Hello", is_correct: false },
          { id: "3", text: "Thank you", is_correct: true },
          { id: "4", text: "Goodbye", is_correct: false },
        ],
      },
      {
        id: "e26", type: "listening",
        question: 'Listen and type what you hear: "Bitte"',
        correct_answer: "Bitte", xp_value: 15,
        explanation: "Bitte means Please / You're welcome in German.",
        metadata: { words: ["Bitte"] },
      },
      {
        id: "e27", type: "translation",
        question: 'Translate to German: "Goodbye"',
        correct_answer: "Auf Wiedersehen", xp_value: 10,
        explanation: "Auf Wiedersehen is the formal way to say goodbye.",
      },
    ],
  },
};

type ExerciseState = "active" | "correct" | "incorrect" | "completed";

const exerciseIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  multiple_choice: MultipleChoiceIcon,
  translation: PenLine,
  word_order: ListOrdered,
  fill_blank: PenLine,
  listening: Volume2,
};

function MultipleChoiceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
    </svg>
  );
}

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.id as string;

  const initialLesson = lessonDatabase[lessonId] || null;
  const [lesson] = useState<LessonData | null>(initialLesson);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exerciseState, setExerciseState] = useState<ExerciseState>("active");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [textInput, setTextInput] = useState("");
  const [wordOrder, setWordOrder] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [totalXp, setTotalXp] = useState(0);
  const [answers, setAnswers] = useState<Array<{ exerciseId: string; correct: boolean; xp: number }>>([]);
  const [showHint, setShowHint] = useState(false);
  const [isReview, setIsReview] = useState(false);
  const [failedExercises, setFailedExercises] = useState<Exercise[]>([]);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [speaking, setSpeaking] = useState(false);

  const speak = (text: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = text.match(/[а-яА-ЯёЁ]/) ? "ru-RU" : "de-DE";
    utterance.rate = 0.85;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const initWordOrder = useCallback(() => {
    if (initialLesson?.exercises[0]?.type === "word_order" && initialLesson.exercises[0].metadata?.words) {
      setAvailableWords([...initialLesson.exercises[0].metadata.words].sort(() => Math.random() - 0.5));
    }
  }, [initialLesson]);

  useEffect(() => { initWordOrder(); }, [initWordOrder]);

  useEffect(() => {
    const exs = isReview ? failedExercises : lesson?.exercises || [];
    const idx = isReview ? reviewIndex : currentIndex;
    const ex = exs[idx];
    if (ex?.type === "word_order" && ex.metadata?.words) {
      setWordOrder([]);
      setAvailableWords([...ex.metadata.words].sort(() => Math.random() - 0.5));
    }
  }, [currentIndex, reviewIndex, isReview, failedExercises, lesson]);

  useEffect(() => {
    setTextInput("");
    setSelectedAnswer("");
    setShowHint(false);
  }, [currentIndex, reviewIndex, isReview]);

  if (!lesson || !lesson.exercises[currentIndex]) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cloud">
        <div className="text-center">
          <p className="text-muted mb-4">Lesson not found</p>
          <button onClick={() => router.push("/dashboard")} className="btn-primary">Back to Dashboard</button>
        </div>
      </div>
    );
  }

  const activeExercises = isReview ? failedExercises : lesson.exercises;
  const activeIndex = isReview ? reviewIndex : currentIndex;
  const currentExercise = activeExercises[activeIndex];
  const totalForProgress = isReview ? lesson.exercises.length + failedExercises.length : lesson.exercises.length;
  const progressIndex = isReview ? lesson.exercises.length + reviewIndex : currentIndex;
  const progress = (progressIndex / totalForProgress) * 100;
  const Icon = exerciseIcons[currentExercise.type] || MultipleChoiceIcon;

  const checkAnswer = () => {
    let isCorrect = false;
    switch (currentExercise.type) {
      case "multiple_choice":
        isCorrect = currentExercise.options?.find((o) => o.text === selectedAnswer)?.is_correct || false;
        break;
      case "translation":
      case "fill_blank":
      case "listening":
        isCorrect = textInput.trim().toLowerCase() === currentExercise.correct_answer.toLowerCase();
        break;
      case "word_order":
        isCorrect = wordOrder.join(" ") === currentExercise.correct_answer;
        break;
    }
    if (isCorrect) { setScore(score + 1); setTotalXp(totalXp + currentExercise.xp_value); }
    setAnswers([...answers, { exerciseId: currentExercise.id, correct: isCorrect, xp: isCorrect ? currentExercise.xp_value : 0 }]);
    setExerciseState(isCorrect ? "correct" : "incorrect");
  };

  const nextExercise = () => {
    if (isReview) {
      if (reviewIndex < failedExercises.length - 1) {
        setReviewIndex(reviewIndex + 1);
        setExerciseState("active");
      } else {
        setExerciseState("completed");
      }
      return;
    }
    if (currentIndex < lesson.exercises.length - 1) { setCurrentIndex(currentIndex + 1); setExerciseState("active"); }
    else {
      const failed = answers.filter((a) => !a.correct).map((a) => lesson.exercises.find((e) => e.id === a.exerciseId)!).filter(Boolean);
      if (failed.length > 0) {
        setFailedExercises(failed);
        setIsReview(true);
        setReviewIndex(0);
        setExerciseState("active");
      } else {
        setExerciseState("completed");
      }
    }
  };

  const addWord = (word: string) => { setAvailableWords(availableWords.filter((w) => w !== word)); setWordOrder([...wordOrder, word]); };
  const removeWord = (i: number) => { const w = wordOrder[i]; setWordOrder(wordOrder.filter((_, idx) => idx !== i)); setAvailableWords([...availableWords, w]); };

  const accuracy = answers.length > 0 ? Math.round((answers.filter((a) => a.correct).length / answers.length) * 100) : 0;

  if (exerciseState === "completed") {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-cloud">
        <motion.div className="w-full max-w-md text-center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="bg-white rounded-3xl border border-border p-8 shadow-lg">
            <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <Trophy className="h-10 w-10 text-success" />
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-navy mb-2">Lesson Complete!</h1>
            <p className="text-muted mb-8">Great work on &ldquo;{lesson.title}&rdquo;</p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-surface">
                <p className="text-2xl font-bold text-primary">{score}/{lesson.exercises.length}</p>
                <p className="text-xs text-muted mt-1">Correct</p>
              </div>
              <div className="p-4 rounded-xl bg-surface">
                <p className="text-2xl font-bold text-xp">+{totalXp}</p>
                <p className="text-xs text-muted mt-1">XP Earned</p>
              </div>
              <div className="p-4 rounded-xl bg-surface">
                <p className="text-2xl font-bold text-success">{accuracy}%</p>
                <p className="text-xs text-muted mt-1">Accuracy</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mb-6 text-sm text-muted">
              <Flame className="h-4 w-4 text-streak" /> Streak maintained!
              <Star className="h-4 w-4 text-xp ml-2" /> +{totalXp} XP
            </div>

            <div className="space-y-3">
              <button className="btn-primary w-full" onClick={() => router.push("/dashboard")}>Continue <ArrowRight className="h-5 w-5 ml-2" /></button>
              <button className="btn-secondary w-full" onClick={() => { setCurrentIndex(0); setScore(0); setTotalXp(0); setAnswers([]); setExerciseState("active"); setIsReview(false); setFailedExercises([]); setReviewIndex(0); }}>
                <RotateCcw className="h-4 w-4 mr-2" /> Practice again
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cloud">
      <header className="bg-white border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-4 flex items-center gap-4">
          <button onClick={() => router.push("/dashboard")} className="p-2 rounded-xl hover:bg-surface transition-colors" aria-label="Back">
            <ArrowLeft className="h-5 w-5 text-navy" />
          </button>
          <div className="flex-1">
            <div className="w-full h-2.5 bg-surface rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
            </div>
          </div>
          <span className="text-sm font-semibold text-navy">
            {isReview && <span className="text-primary mr-1">Review:</span>}
            {activeIndex + 1}/{activeExercises.length}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8 md:py-12">
        {isReview && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center gap-3">
            <RotateCcw className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <p className="font-semibold text-navy text-sm">Review Round</p>
              <p className="text-xs text-muted">Let&apos;s practice the ones you missed. You got this!</p>
            </div>
          </motion.div>
        )}
        <AnimatePresence mode="wait">
          <motion.div key={currentIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {isReview ? "Review" : currentExercise.type.replace("_", " ")}
                </div>
                <div className="text-xs text-muted">+{currentExercise.xp_value} XP</div>
              </div>
            </div>

            <h2 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold text-navy mb-8 leading-snug">
              {currentExercise.question}
            </h2>

            {currentExercise.type === "multiple_choice" && currentExercise.options && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {currentExercise.options.map((option) => (
                  <button key={option.id} onClick={() => exerciseState === "active" && setSelectedAnswer(option.text)} disabled={exerciseState !== "active"}
                    className={`p-4 rounded-xl border-2 text-left font-medium transition-all duration-200 ${
                      selectedAnswer === option.text
                        ? exerciseState === "correct" && option.is_correct ? "border-success bg-success/5 text-success"
                        : exerciseState === "incorrect" && option.text === selectedAnswer ? "border-danger bg-danger/5 text-danger"
                        : "border-primary bg-primary/5 text-primary"
                        : exerciseState !== "active" && option.is_correct ? "border-success bg-success/5 text-success"
                        : "border-border bg-white hover:border-primary/30 text-navy"
                    }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                        selectedAnswer === option.text ? "bg-primary text-white" : "bg-surface text-muted"
                      }`}>
                        {exerciseState !== "active" && option.is_correct ? <Check className="w-4 h-4" /> : String.fromCharCode(65 + currentExercise.options!.indexOf(option))}
                      </div>
                      {option.text}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {(currentExercise.type === "translation" || currentExercise.type === "fill_blank" || currentExercise.type === "listening") && (
              <div className="mb-8">
                {currentExercise.type === "listening" && (
                  <button onClick={() => speak(currentExercise.correct_answer)}
                    className={`mb-4 flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-colors ${
                      speaking ? "bg-primary text-white animate-pulse" : "bg-primary/10 text-primary hover:bg-primary/15"
                    }`}>
                    <Volume2 className="w-5 h-5" /> {speaking ? "Speaking..." : "Play Audio"}
                  </button>
                )}
                <input type="text" value={textInput} onChange={(e) => setTextInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && textInput.trim() && exerciseState === "active") checkAnswer(); }}
                  disabled={exerciseState !== "active"} placeholder="Type your answer..."
                  className={`w-full p-4 rounded-xl border-2 text-lg font-medium bg-white transition-all duration-200 ${
                    exerciseState === "correct" ? "border-success bg-success/5"
                    : exerciseState === "incorrect" ? "border-danger bg-danger/5"
                    : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10"
                  }`} autoFocus />
                {currentExercise.type === "translation" && !showHint && exerciseState === "active" && (
                  <button onClick={() => setShowHint(true)} className="mt-2 text-sm text-primary hover:underline">Need a hint?</button>
                )}
                {showHint && (
                  <p className="mt-2 text-sm text-muted">Hint: The answer starts with &ldquo;{currentExercise.correct_answer[0]}&rdquo;</p>
                )}
              </div>
            )}

            {currentExercise.type === "word_order" && (
              <div className="mb-8">
                <div className="min-h-[60px] p-4 rounded-xl border-2 border-dashed border-border bg-white mb-4 flex flex-wrap gap-2 items-center">
                  {wordOrder.length === 0 && <p className="text-muted text-sm">Tap words to build the sentence</p>}
                  {wordOrder.map((word, i) => (
                    <button key={`placed-${i}`} onClick={() => exerciseState === "active" && removeWord(i)}
                      className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors">
                      {word}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableWords.map((word, i) => (
                    <button key={`avail-${i}`} onClick={() => exerciseState === "active" && addWord(word)}
                      className="px-4 py-2 rounded-xl bg-surface border border-border text-sm font-semibold text-navy hover:bg-primary/5 hover:border-primary/30 transition-all">
                      {word}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {exerciseState !== "active" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl mb-6 ${exerciseState === "correct" ? "bg-success/10 border border-success/20" : "bg-danger/10 border border-danger/20"}`}>
                <div className="flex items-center gap-2 mb-1">
                  {exerciseState === "correct" ? <Check className="h-5 w-5 text-success" /> : <X className="h-5 w-5 text-danger" />}
                  <span className={`font-semibold ${exerciseState === "correct" ? "text-success" : "text-danger"}`}>
                    {exerciseState === "correct" ? "Correct!" : "Incorrect"}
                  </span>
                </div>
                {currentExercise.explanation && (
                  <p className={`text-sm ${exerciseState === "correct" ? "text-success/80" : "text-danger/80"}`}>
                    {currentExercise.explanation}
                  </p>
                )}
                {exerciseState === "incorrect" && (
                  <p className="text-sm text-danger mt-1">Answer: <strong>{currentExercise.correct_answer}</strong></p>
                )}
              </motion.div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted">
                <Star className="h-4 w-4 text-xp" /> {currentExercise.xp_value} XP
              </div>
              {exerciseState === "active" ? (
                <button onClick={checkAnswer} disabled={
                  (currentExercise.type === "multiple_choice" && !selectedAnswer) ||
                  (currentExercise.type === "word_order" && wordOrder.length === 0) ||
                  (["translation", "fill_blank", "listening"].includes(currentExercise.type) && !textInput.trim())
                } className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed">
                  Check
                </button>
              ) : (
                <button onClick={nextExercise} className="btn-primary">
                  {isReview
                    ? reviewIndex < failedExercises.length - 1 ? "Continue" : "Finish"
                    : currentIndex < lesson.exercises.length - 1 ? "Continue" : "Finish"
                  } <ArrowRight className="h-5 w-5 ml-2" />
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
