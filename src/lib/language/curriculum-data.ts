/**
 * LUNO Curriculum Data
 *
 * This file defines the curriculum structure for all languages.
 * It can be imported directly or used to seed the database.
 */

export interface CurriculumUnit {
  id: string;
  title: string;
  description: string;
  lessons: CurriculumLesson[];
}

export interface CurriculumLesson {
  id: string;
  title: string;
  description: string;
  xpReward: number;
}

export interface CurriculumCourse {
  languageCode: string;
  level: string;
  title: string;
  description: string;
  units: CurriculumUnit[];
}

export const curriculum: Record<string, CurriculumCourse> = {
  "ru-beginner": {
    languageCode: "ru",
    level: "beginner",
    title: "Russian Basics",
    description: "Start your Russian journey with fundamental words and phrases",
    units: [
      {
        id: "u1000000-0000-0000-0000-000000000001",
        title: "Greetings",
        description: "Learn basic Russian greetings and introductions",
        lessons: [
          { id: "l1000000-0000-0000-0000-000000000001", title: "Basic Hello", description: "Learn Здравствуйте and Привет", xpReward: 50 },
          { id: "l1000000-0000-0000-0000-000000000002", title: "Goodbye", description: "Learn До свидания and Пока", xpReward: 50 },
          { id: "l1000000-0000-0000-0000-000000000003", title: "Polite Words", description: "Please, thank you, excuse me", xpReward: 50 },
        ],
      },
      {
        id: "u1000000-0000-0000-0000-000000000002",
        title: "Introductions",
        description: "Introduce yourself and ask about others",
        lessons: [
          { id: "l1000000-0000-0000-0000-000000000004", title: "Self Introduction", description: "Меня зовут...", xpReward: 50 },
          { id: "l1000000-0000-0000-0000-000000000005", title: "Asking Names", description: "Как вас зовут?", xpReward: 50 },
        ],
      },
      {
        id: "u1000000-0000-0000-0000-000000000003",
        title: "Numbers",
        description: "Count from 1 to 20",
        lessons: [
          { id: "l1000000-0000-0000-0000-000000000006", title: "1-10", description: "Один, два, три...", xpReward: 50 },
          { id: "l1000000-0000-0000-0000-000000000007", title: "11-20", description: "Одиннадцать, двенадцать...", xpReward: 50 },
        ],
      },
    ],
  },
  "de-beginner": {
    languageCode: "de",
    level: "beginner",
    title: "German Basics",
    description: "Start your German journey with fundamental words and phrases",
    units: [
      {
        id: "u2000000-0000-0000-0000-000000000001",
        title: "Greetings",
        description: "Learn basic German greetings",
        lessons: [
          { id: "l2000000-0000-0000-0000-000000000001", title: "Basic Hello", description: "Learn Hallo and Guten Tag", xpReward: 50 },
          { id: "l2000000-0000-0000-0000-000000000002", title: "Goodbye", description: "Learn Auf Wiedersehen and Tschüss", xpReward: 50 },
          { id: "l2000000-0000-0000-0000-000000000003", title: "Polite Words", description: "Bitte, Danke, Entschuldigung", xpReward: 50 },
        ],
      },
      {
        id: "u2000000-0000-0000-0000-000000000002",
        title: "Introductions",
        description: "Introduce yourself",
        lessons: [
          { id: "l2000000-0000-0000-0000-000000000004", title: "Self Introduction", description: "Ich heiße...", xpReward: 50 },
          { id: "l2000000-0000-0000-0000-000000000005", title: "Asking Names", description: "Wie heißen Sie?", xpReward: 50 },
        ],
      },
      {
        id: "u2000000-0000-0000-0000-000000000003",
        title: "Numbers",
        description: "Count from 1 to 20",
        lessons: [
          { id: "l2000000-0000-0000-0000-000000000006", title: "1-10", description: "Eins, zwei, drei...", xpReward: 50 },
          { id: "l2000000-0000-0000-0000-000000000007", title: "11-20", description: "Elf, zwölf...", xpReward: 50 },
        ],
      },
    ],
  },
};
