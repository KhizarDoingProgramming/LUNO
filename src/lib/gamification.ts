export interface GamificationState {
  total_xp: number;
  current_streak: number;
  longest_streak: number;
  completed_lessons: string[];
  last_practice_date: string | null;
}

const STORAGE_KEY = "luno_gamification";
const PROFILE_KEY = "luno_profile";

function todayStr(): string {
  return new Date().toISOString().split("T")[0];
}

function isYesterday(dateStr: string): boolean {
  const d = new Date(dateStr);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return d.toISOString().split("T")[0] === yesterday.toISOString().split("T")[0];
}

export function getGamification(): GamificationState {
  if (typeof window === "undefined") {
    return { total_xp: 0, current_streak: 0, longest_streak: 0, completed_lessons: [], last_practice_date: null };
  }
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  return { total_xp: 0, current_streak: 0, longest_streak: 0, completed_lessons: [], last_practice_date: null };
}

export function saveGamification(state: GamificationState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function addLessonXp(lessonId: string, xp: number): GamificationState {
  const state = getGamification();
  const today = todayStr();

  if (!state.completed_lessons.includes(lessonId)) {
    state.completed_lessons.push(lessonId);
  }

  state.total_xp += xp;

  if (state.last_practice_date !== today) {
    if (state.last_practice_date && isYesterday(state.last_practice_date)) {
      state.current_streak += 1;
    } else if (state.last_practice_date !== today) {
      state.current_streak = 1;
    }
    state.last_practice_date = today;
  }

  if (state.current_streak > state.longest_streak) {
    state.longest_streak = state.current_streak;
  }

  saveGamification(state);
  syncProfile(state);
  return state;
}

export function initGamification(): GamificationState {
  const state = getGamification();
  const today = todayStr();

  if (state.last_practice_date && !isYesterday(state.last_practice_date) && state.last_practice_date !== today) {
    state.current_streak = 0;
    saveGamification(state);
  }

  return state;
}

function syncProfile(state: GamificationState): void {
  const raw = localStorage.getItem(PROFILE_KEY);
  if (!raw) return;
  const profile = JSON.parse(raw);
  profile.total_xp = state.total_xp;
  profile.current_streak = state.current_streak;
  profile.longest_streak = state.longest_streak;
  profile.completed_lessons = state.completed_lessons;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}
