import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding LUNO database...\n");

  // ============================================
  // LANGUAGES
  // ============================================
  const ru = await prisma.language.upsert({
    where: { code: "ru" },
    update: {},
    create: {
      code: "ru",
      name: "Russian",
      nativeName: "Русский",
      flagEmoji: "🇷🇺",
      isActive: true,
    },
  });

  const de = await prisma.language.upsert({
    where: { code: "de" },
    update: {},
    create: {
      code: "de",
      name: "German",
      nativeName: "Deutsch",
      flagEmoji: "🇩🇪",
      isActive: true,
    },
  });

  const en = await prisma.language.upsert({
    where: { code: "en" },
    update: {},
    create: {
      code: "en",
      name: "English",
      nativeName: "English",
      flagEmoji: "🇬🇧",
      isActive: true,
    },
  });

  console.log("✓ Languages seeded");

  // ============================================
  // COURSES - RUSSIAN BEGINNER
  // ============================================
  const ruBeginner = await prisma.course.upsert({
    where: { languageId_level: { languageId: ru.id, level: "beginner" } },
    update: {},
    create: {
      languageId: ru.id,
      level: "beginner",
      title: "Russian Basics",
      description: "Start your Russian journey with fundamental words and phrases",
      orderIndex: 1,
    },
  });

  // Units for Russian Beginner
  const ruGreetings = await prisma.unit.create({
    data: {
      courseId: ruBeginner.id,
      title: "Greetings",
      description: "Learn basic Russian greetings and introductions",
      orderIndex: 1,
      isLocked: false,
    },
  });

  const ruIntro = await prisma.unit.create({
    data: {
      courseId: ruBeginner.id,
      title: "Introductions",
      description: "Introduce yourself and ask about others",
      orderIndex: 2,
      isLocked: true,
    },
  });

  const ruNumbers = await prisma.unit.create({
    data: {
      courseId: ruBeginner.id,
      title: "Numbers",
      description: "Count from 1 to 20",
      orderIndex: 3,
      isLocked: true,
    },
  });

  // Russian Greetings Lessons
  const ruLesson1 = await prisma.lesson.create({
    data: {
      unitId: ruGreetings.id,
      title: "Basic Hello",
      description: "Learn Здравствуйте and Привет",
      orderIndex: 1,
      xpReward: 50,
      isLocked: false,
    },
  });

  const ruLesson2 = await prisma.lesson.create({
    data: {
      unitId: ruGreetings.id,
      title: "Goodbye",
      description: "Learn До свидания and Пока",
      orderIndex: 2,
      xpReward: 50,
      isLocked: true,
    },
  });

  await prisma.lesson.create({
    data: {
      unitId: ruGreetings.id,
      title: "Polite Words",
      description: "Please, thank you, excuse me",
      orderIndex: 3,
      xpReward: 50,
      isLocked: true,
    },
  });

  // Russian Introductions Lessons
  await prisma.lesson.create({
    data: {
      unitId: ruIntro.id,
      title: "Self Introduction",
      description: "Меня зовут...",
      orderIndex: 1,
      xpReward: 50,
      isLocked: true,
    },
  });

  await prisma.lesson.create({
    data: {
      unitId: ruIntro.id,
      title: "Asking Names",
      description: "Как вас зовут?",
      orderIndex: 2,
      xpReward: 50,
      isLocked: true,
    },
  });

  // Russian Numbers Lessons
  await prisma.lesson.create({
    data: {
      unitId: ruNumbers.id,
      title: "1-10",
      description: "Один, два, три...",
      orderIndex: 1,
      xpReward: 50,
      isLocked: true,
    },
  });

  await prisma.lesson.create({
    data: {
      unitId: ruNumbers.id,
      title: "11-20",
      description: "Одиннадцать, двенадцать...",
      orderIndex: 2,
      xpReward: 50,
      isLocked: true,
    },
  });

  console.log("✓ Russian courses seeded");

  // ============================================
  // COURSES - GERMAN BEGINNER
  // ============================================
  const deBeginner = await prisma.course.upsert({
    where: { languageId_level: { languageId: de.id, level: "beginner" } },
    update: {},
    create: {
      languageId: de.id,
      level: "beginner",
      title: "German Basics",
      description: "Start your German journey with fundamental words and phrases",
      orderIndex: 1,
    },
  });

  const deGreetings = await prisma.unit.create({
    data: {
      courseId: deBeginner.id,
      title: "Greetings",
      description: "Learn basic German greetings",
      orderIndex: 1,
      isLocked: false,
    },
  });

  const deIntro = await prisma.unit.create({
    data: {
      courseId: deBeginner.id,
      title: "Introductions",
      description: "Introduce yourself",
      orderIndex: 2,
      isLocked: true,
    },
  });

  const deNumbers = await prisma.unit.create({
    data: {
      courseId: deBeginner.id,
      title: "Numbers",
      description: "Count from 1 to 20",
      orderIndex: 3,
      isLocked: true,
    },
  });

  // German Greetings Lessons
  const deLesson1 = await prisma.lesson.create({
    data: {
      unitId: deGreetings.id,
      title: "Basic Hello",
      description: "Learn Hallo and Guten Tag",
      orderIndex: 1,
      xpReward: 50,
      isLocked: false,
    },
  });

  await prisma.lesson.create({
    data: {
      unitId: deGreetings.id,
      title: "Goodbye",
      description: "Learn Auf Wiedersehen and Tschüss",
      orderIndex: 2,
      xpReward: 50,
      isLocked: true,
    },
  });

  await prisma.lesson.create({
    data: {
      unitId: deGreetings.id,
      title: "Polite Words",
      description: "Bitte, Danke, Entschuldigung",
      orderIndex: 3,
      xpReward: 50,
      isLocked: true,
    },
  });

  // German Introductions Lessons
  await prisma.lesson.create({
    data: {
      unitId: deIntro.id,
      title: "Self Introduction",
      description: "Ich heiße...",
      orderIndex: 1,
      xpReward: 50,
      isLocked: true,
    },
  });

  await prisma.lesson.create({
    data: {
      unitId: deIntro.id,
      title: "Asking Names",
      description: "Wie heißen Sie?",
      orderIndex: 2,
      xpReward: 50,
      isLocked: true,
    },
  });

  // German Numbers Lessons
  await prisma.lesson.create({
    data: {
      unitId: deNumbers.id,
      title: "1-10",
      description: "Eins, zwei, drei...",
      orderIndex: 1,
      xpReward: 50,
      isLocked: true,
    },
  });

  await prisma.lesson.create({
    data: {
      unitId: deNumbers.id,
      title: "11-20",
      description: "Elf, zwölf...",
      orderIndex: 2,
      xpReward: 50,
      isLocked: true,
    },
  });

  console.log("✓ German courses seeded");

  // ============================================
  // VOCABULARY - RUSSIAN
  // ============================================
  const ruVocab = [
    { word: "Здравствуйте", translation: "Hello (formal)", partOfSpeech: "interjection", exampleSentence: "Здравствуйте, как дела?", exampleTranslation: "Hello, how are you?" },
    { word: "Привет", translation: "Hi (informal)", partOfSpeech: "interjection", exampleSentence: "Привет, как ты?", exampleTranslation: "Hi, how are you?" },
    { word: "До свидания", translation: "Goodbye (formal)", partOfSpeech: "interjection", exampleSentence: "До свидания, до завтра!", exampleTranslation: "Goodbye, see you tomorrow!" },
    { word: "Пока", translation: "Bye (informal)", partOfSpeech: "interjection", exampleSentence: "Пока, увидимся!", exampleTranslation: "Bye, see you!" },
    { word: "Пожалуйста", translation: "Please / You're welcome", partOfSpeech: "adverb", exampleSentence: "Пожалуйста, помогите мне.", exampleTranslation: "Please, help me." },
    { word: "Спасибо", translation: "Thank you", partOfSpeech: "interjection", exampleSentence: "Спасибо большое!", exampleTranslation: "Thank you very much!" },
    { word: "Извините", translation: "Excuse me / Sorry", partOfSpeech: "interjection", exampleSentence: "Извините, где станция?", exampleTranslation: "Excuse me, where is the station?" },
    { word: "Да", translation: "Yes", partOfSpeech: "adverb", exampleSentence: "Да, конечно.", exampleTranslation: "Yes, of course." },
    { word: "Нет", translation: "No", partOfSpeech: "adverb", exampleSentence: "Нет, спасибо.", exampleTranslation: "No, thank you." },
    { word: "Меня зовут", translation: "My name is", partOfSpeech: "phrase", exampleSentence: "Меня зовут Анна.", exampleTranslation: "My name is Anna." },
  ];

  for (const v of ruVocab) {
    await prisma.vocabulary.create({
      data: {
        languageId: ru.id,
        difficulty: 1,
        ...v,
      },
    });
  }

  console.log("✓ Russian vocabulary seeded");

  // ============================================
  // VOCABULARY - GERMAN
  // ============================================
  const deVocab = [
    { word: "Hallo", translation: "Hello", partOfSpeech: "interjection", exampleSentence: "Hallo, wie geht es Ihnen?", exampleTranslation: "Hello, how are you?" },
    { word: "Guten Tag", translation: "Good day", partOfSpeech: "interjection", exampleSentence: "Guten Tag, mein Name ist Hans.", exampleTranslation: "Good day, my name is Hans." },
    { word: "Auf Wiedersehen", translation: "Goodbye (formal)", partOfSpeech: "interjection", exampleSentence: "Auf Wiedersehen, bis morgen!", exampleTranslation: "Goodbye, see you tomorrow!" },
    { word: "Tschüss", translation: "Bye (informal)", partOfSpeech: "interjection", exampleSentence: "Tschüss, bis später!", exampleTranslation: "Bye, see you later!" },
    { word: "Bitte", translation: "Please / You're welcome", partOfSpeech: "adverb", exampleSentence: "Bitte, können Sie mir helfen?", exampleTranslation: "Please, can you help me?" },
    { word: "Danke", translation: "Thank you", partOfSpeech: "interjection", exampleSentence: "Danke schön!", exampleTranslation: "Thank you very much!" },
    { word: "Entschuldigung", translation: "Excuse me / Sorry", partOfSpeech: "noun", gender: "feminine", article: "die", exampleSentence: "Entschuldigung, wo ist der Bahnhof?", exampleTranslation: "Excuse me, where is the train station?" },
    { word: "Ja", translation: "Yes", partOfSpeech: "adverb", exampleSentence: "Ja, natürlich.", exampleTranslation: "Yes, of course." },
    { word: "Nein", translation: "No", partOfSpeech: "adverb", exampleSentence: "Nein, danke.", exampleTranslation: "No, thank you." },
    { word: "Ich heiße", translation: "My name is", partOfSpeech: "phrase", exampleSentence: "Ich heiße Anna.", exampleTranslation: "My name is Anna." },
  ];

  for (const v of deVocab) {
    await prisma.vocabulary.create({
      data: {
        languageId: de.id,
        difficulty: 1,
        ...v,
      },
    });
  }

  console.log("✓ German vocabulary seeded");

  // ============================================
  // EXERCISES - RUSSIAN LESSON 1
  // ============================================
  const ruEx1 = await prisma.exercise.create({
    data: {
      lessonId: ruLesson1.id,
      type: "multiple_choice",
      question: 'What does "Здравствуйте" mean?',
      correctAnswer: "Hello (formal)",
      explanation: "Здравствуйте is the formal way to say hello in Russian.",
      orderIndex: 1,
      xpValue: 10,
    },
  });

  await prisma.exerciseOption.createMany({
    data: [
      { exerciseId: ruEx1.id, text: "Goodbye", isCorrect: false, orderIndex: 1 },
      { exerciseId: ruEx1.id, text: "Hello (formal)", isCorrect: true, orderIndex: 2 },
      { exerciseId: ruEx1.id, text: "Thank you", isCorrect: false, orderIndex: 3 },
      { exerciseId: ruEx1.id, text: "Please", isCorrect: false, orderIndex: 4 },
    ],
  });

  await prisma.exercise.create({
    data: {
      lessonId: ruLesson1.id,
      type: "translation",
      question: 'Translate to Russian: "Hello"',
      correctAnswer: "Привет",
      explanation: "Привет is the informal way to say hello.",
      orderIndex: 2,
      xpValue: 10,
    },
  });

  await prisma.exercise.create({
    data: {
      lessonId: ruLesson1.id,
      type: "word_order",
      question: "Arrange the words to form a sentence:",
      correctAnswer: "Как дела?",
      explanation: "Как дела? means How are you?",
      orderIndex: 3,
      xpValue: 10,
      metadata: JSON.stringify({ words: ["как", "дела", "?"] }),
    },
  });

  await prisma.exercise.create({
    data: {
      lessonId: ruLesson1.id,
      type: "fill_blank",
      question: "____, как дела? (Hello, how are you?)",
      correctAnswer: "Привет",
      explanation: "Привет is the informal greeting.",
      orderIndex: 4,
      xpValue: 10,
    },
  });

  const ruEx5 = await prisma.exercise.create({
    data: {
      lessonId: ruLesson1.id,
      type: "multiple_choice",
      question: 'What does "Привет" mean?',
      correctAnswer: "Hi (informal)",
      explanation: "Привет is the informal way to say hi.",
      orderIndex: 5,
      xpValue: 10,
    },
  });

  await prisma.exerciseOption.createMany({
    data: [
      { exerciseId: ruEx5.id, text: "Goodbye", isCorrect: false, orderIndex: 1 },
      { exerciseId: ruEx5.id, text: "Please", isCorrect: false, orderIndex: 2 },
      { exerciseId: ruEx5.id, text: "Hi (informal)", isCorrect: true, orderIndex: 3 },
      { exerciseId: ruEx5.id, text: "Thank you", isCorrect: false, orderIndex: 4 },
    ],
  });

  console.log("✓ Russian exercises seeded");

  // ============================================
  // EXERCISES - GERMAN LESSON 1
  // ============================================
  const deEx1 = await prisma.exercise.create({
    data: {
      lessonId: deLesson1.id,
      type: "multiple_choice",
      question: 'What does "Hallo" mean?',
      correctAnswer: "Hello",
      explanation: "Hallo is the most common informal greeting in German.",
      orderIndex: 1,
      xpValue: 10,
    },
  });

  await prisma.exerciseOption.createMany({
    data: [
      { exerciseId: deEx1.id, text: "Goodbye", isCorrect: false, orderIndex: 1 },
      { exerciseId: deEx1.id, text: "Hello", isCorrect: true, orderIndex: 2 },
      { exerciseId: deEx1.id, text: "Thank you", isCorrect: false, orderIndex: 3 },
      { exerciseId: deEx1.id, text: "Please", isCorrect: false, orderIndex: 4 },
    ],
  });

  await prisma.exercise.create({
    data: {
      lessonId: deLesson1.id,
      type: "translation",
      question: 'Translate to German: "Good day"',
      correctAnswer: "Guten Tag",
      explanation: "Guten Tag is a formal greeting used during the day.",
      orderIndex: 2,
      xpValue: 10,
    },
  });

  await prisma.exercise.create({
    data: {
      lessonId: deLesson1.id,
      type: "word_order",
      question: "Arrange the words to form a sentence:",
      correctAnswer: "Guten Tag",
      explanation: "Guten Tag means Good day.",
      orderIndex: 3,
      xpValue: 10,
      metadata: JSON.stringify({ words: ["Tag", "Guten"] }),
    },
  });

  await prisma.exercise.create({
    data: {
      lessonId: deLesson1.id,
      type: "fill_blank",
      question: "____, wie geht es Ihnen? (Hello, how are you?)",
      correctAnswer: "Hallo",
      explanation: "Hallo is the informal greeting.",
      orderIndex: 4,
      xpValue: 10,
    },
  });

  const deEx5 = await prisma.exercise.create({
    data: {
      lessonId: deLesson1.id,
      type: "multiple_choice",
      question: 'What does "Guten Tag" mean?',
      correctAnswer: "Good day",
      explanation: "Guten Tag is a formal daytime greeting.",
      orderIndex: 5,
      xpValue: 10,
    },
  });

  await prisma.exerciseOption.createMany({
    data: [
      { exerciseId: deEx5.id, text: "Good night", isCorrect: false, orderIndex: 1 },
      { exerciseId: deEx5.id, text: "Good day", isCorrect: true, orderIndex: 2 },
      { exerciseId: deEx5.id, text: "Goodbye", isCorrect: false, orderIndex: 3 },
      { exerciseId: deEx5.id, text: "Good morning", isCorrect: false, orderIndex: 4 },
    ],
  });

  console.log("✓ German exercises seeded");

  // ============================================
  // ACHIEVEMENTS
  // ============================================
  const achievements = [
    { name: "First Steps", description: "Complete your first lesson", icon: "footprints", requirementType: "lessons_completed", requirementValue: 1, xpReward: 100 },
    { name: "Word Collector", description: "Learn 10 vocabulary words", icon: "book-open", requirementType: "words_learned", requirementValue: 10, xpReward: 200 },
    { name: "Dedicated Learner", description: "Maintain a 7-day streak", icon: "flame", requirementType: "streak_days", requirementValue: 7, xpReward: 500 },
    { name: "Century Club", description: "Earn 1,000 XP", icon: "star", requirementType: "total_xp", requirementValue: 1000, xpReward: 300 },
    { name: "Perfect Score", description: "Complete a lesson with 100% accuracy", icon: "target", requirementType: "perfect_lessons", requirementValue: 1, xpReward: 200 },
    { name: "Vocabulary Master", description: "Learn 50 vocabulary words", icon: "graduation-cap", requirementType: "words_learned", requirementValue: 50, xpReward: 1000 },
    { name: "Monthly Dedication", description: "Maintain a 30-day streak", icon: "calendar", requirementType: "streak_days", requirementValue: 30, xpReward: 2000 },
    { name: "High Scorer", description: "Earn 5,000 XP", icon: "trophy", requirementType: "total_xp", requirementValue: 5000, xpReward: 1500 },
  ];

  for (const ach of achievements) {
    await prisma.achievement.upsert({
      where: { name: ach.name },
      update: {},
      create: ach,
    });
  }

  console.log("✓ Achievements seeded");

  // ============================================
  // GRAMMAR RULES
  // ============================================
  await prisma.grammarRule.create({
    data: {
      languageId: ru.id,
      title: "Russian Greetings",
      explanation: "Russian has formal and informal greetings. Use Здравствуйте in formal situations and Привет with friends.",
      examples: JSON.stringify([
        "Здравствуйте - formal hello",
        "Привет - informal hi",
        "Доброе утро - good morning",
        "Добрый вечер - good evening",
      ]),
    },
  });

  await prisma.grammarRule.create({
    data: {
      languageId: ru.id,
      title: "Russian Pronouns",
      explanation: "Russian personal pronouns: Я (I), Ты (you informal), Вы (you formal), Он (he), Она (she), Оно (it), Они (they).",
      examples: JSON.stringify([
        "Я student - I am a student",
        "Ты мой друг - You are my friend",
        "Вы врач? - Are you a doctor? (formal)",
      ]),
    },
  });

  await prisma.grammarRule.create({
    data: {
      languageId: de.id,
      title: "German Articles",
      explanation: "German has three genders: masculine (der), feminine (die), and neuter (das). Learning the article with the noun is essential.",
      examples: JSON.stringify([
        "der Mann - the man (masculine)",
        "die Frau - the woman (feminine)",
        "das Kind - the child (neuter)",
      ]),
    },
  });

  await prisma.grammarRule.create({
    data: {
      languageId: de.id,
      title: "German Greetings",
      explanation: "German has formal and informal greetings. Use Guten Tag in formal situations and Hallo with friends.",
      examples: JSON.stringify([
        "Hallo - informal hello",
        "Guten Tag - good day (formal)",
        "Guten Morgen - good morning",
        "Auf Wiedersehen - goodbye (formal)",
      ]),
    },
  });

  console.log("✓ Grammar rules seeded");

  console.log("\nSeeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
