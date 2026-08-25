import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

type ExerciseData = {
  type: string;
  question: string;
  correctAnswer: string;
  explanation: string;
  orderIndex: number;
  xpValue: number;
  metadata?: string;
  options?: { text: string; isCorrect: boolean; orderIndex: number }[];
};

async function createExercises(lessonId: string, exercises: ExerciseData[]) {
  for (const ex of exercises) {
    const created = await prisma.exercise.create({
      data: {
        lessonId,
        type: ex.type,
        question: ex.question,
        correctAnswer: ex.correctAnswer,
        explanation: ex.explanation,
        orderIndex: ex.orderIndex,
        xpValue: ex.xpValue,
        metadata: ex.metadata || "{}",
      },
    });
    if (ex.options) {
      await prisma.exerciseOption.createMany({
        data: ex.options.map((o) => ({ ...o, exerciseId: created.id })),
      });
    }
  }
}

async function main() {
  console.log("Seeding LUNO database...\n");

  // ============================================
  // LANGUAGES
  // ============================================
  const ru = await prisma.language.upsert({
    where: { code: "ru" },
    update: {},
    create: { code: "ru", name: "Russian", nativeName: "Русский", flagEmoji: "🇷🇺", isActive: true },
  });

  const de = await prisma.language.upsert({
    where: { code: "de" },
    update: {},
    create: { code: "de", name: "German", nativeName: "Deutsch", flagEmoji: "🇩🇪", isActive: true },
  });

  const en = await prisma.language.upsert({
    where: { code: "en" },
    update: {},
    create: { code: "en", name: "English", nativeName: "English", flagEmoji: "🇬🇧", isActive: true },
  });

  console.log("✓ Languages seeded");

  // ============================================
  // COURSES - RUSSIAN BEGINNER
  // ============================================
  const ruBeginner = await prisma.course.upsert({
    where: { languageId_level: { languageId: ru.id, level: "beginner" } },
    update: {},
    create: { languageId: ru.id, level: "beginner", title: "Russian Basics", description: "Start your Russian journey", orderIndex: 1 },
  });

  const ruGreetings = await prisma.unit.create({
    data: { courseId: ruBeginner.id, title: "Greetings", description: "Basic Russian greetings", orderIndex: 1, isLocked: false },
  });
  const ruIntro = await prisma.unit.create({
    data: { courseId: ruBeginner.id, title: "Introductions", description: "Introduce yourself", orderIndex: 2, isLocked: true },
  });
  const ruNumbers = await prisma.unit.create({
    data: { courseId: ruBeginner.id, title: "Numbers", description: "Count from 1 to 20", orderIndex: 3, isLocked: true },
  });

  // ============================================
  // COURSES - GERMAN BEGINNER
  // ============================================
  const deBeginner = await prisma.course.upsert({
    where: { languageId_level: { languageId: de.id, level: "beginner" } },
    update: {},
    create: { languageId: de.id, level: "beginner", title: "German Basics", description: "Start your German journey", orderIndex: 1 },
  });

  const deGreetings = await prisma.unit.create({
    data: { courseId: deBeginner.id, title: "Greetings", description: "Basic German greetings", orderIndex: 1, isLocked: false },
  });
  const deIntro = await prisma.unit.create({
    data: { courseId: deBeginner.id, title: "Introductions", description: "Introduce yourself", orderIndex: 2, isLocked: true },
  });
  const deNumbers = await prisma.unit.create({
    data: { courseId: deBeginner.id, title: "Numbers", description: "Count from 1 to 20", orderIndex: 3, isLocked: true },
  });

  console.log("✓ Courses & units seeded");

  // ============================================
  // RUSSIAN LESSONS (with specific IDs matching dashboard)
  // ============================================
  const ruLesson1 = await prisma.lesson.upsert({
    where: { id: "l1000000-0000-0000-0000-000000000001" },
    update: {},
    create: { id: "l1000000-0000-0000-0000-000000000001", unitId: ruGreetings.id, title: "Basic Hello", description: "Learn Здравствуйте and Привет", orderIndex: 1, xpReward: 50, isLocked: false },
  });
  const ruLesson2 = await prisma.lesson.upsert({
    where: { id: "l1000000-0000-0000-0000-000000000002" },
    update: {},
    create: { id: "l1000000-0000-0000-0000-000000000002", unitId: ruGreetings.id, title: "Goodbye", description: "Learn До свидания and Пока", orderIndex: 2, xpReward: 50, isLocked: true },
  });
  const ruLesson3 = await prisma.lesson.upsert({
    where: { id: "l1000000-0000-0000-0000-000000000003" },
    update: {},
    create: { id: "l1000000-0000-0000-0000-000000000003", unitId: ruGreetings.id, title: "Polite Words", description: "Please, thank you, excuse me", orderIndex: 3, xpReward: 50, isLocked: true },
  });
  const ruLesson4 = await prisma.lesson.upsert({
    where: { id: "l1000000-0000-0000-0000-000000000004" },
    update: {},
    create: { id: "l1000000-0000-0000-0000-000000000004", unitId: ruIntro.id, title: "Self Introduction", description: "Меня зовут...", orderIndex: 1, xpReward: 50, isLocked: true },
  });
  const ruLesson5 = await prisma.lesson.upsert({
    where: { id: "l1000000-0000-0000-0000-000000000005" },
    update: {},
    create: { id: "l1000000-0000-0000-0000-000000000005", unitId: ruIntro.id, title: "Asking Names", description: "Как вас зовут?", orderIndex: 2, xpReward: 50, isLocked: true },
  });
  const ruLesson6 = await prisma.lesson.upsert({
    where: { id: "l1000000-0000-0000-0000-000000000006" },
    update: {},
    create: { id: "l1000000-0000-0000-0000-000000000006", unitId: ruNumbers.id, title: "1-10", description: "Один, два, три...", orderIndex: 1, xpReward: 50, isLocked: true },
  });
  const ruLesson7 = await prisma.lesson.upsert({
    where: { id: "l1000000-0000-0000-0000-000000000007" },
    update: {},
    create: { id: "l1000000-0000-0000-0000-000000000007", unitId: ruNumbers.id, title: "11-20", description: "Одиннадцать, двенадцать...", orderIndex: 2, xpReward: 50, isLocked: true },
  });

  console.log("✓ Russian lessons created");

  // ============================================
  // GERMAN LESSONS (with specific IDs matching dashboard)
  // ============================================
  const deLesson1 = await prisma.lesson.upsert({
    where: { id: "l2000000-0000-0000-0000-000000000001" },
    update: {},
    create: { id: "l2000000-0000-0000-0000-000000000001", unitId: deGreetings.id, title: "Basic Hello", description: "Learn Hallo and Guten Tag", orderIndex: 1, xpReward: 50, isLocked: false },
  });
  const deLesson2 = await prisma.lesson.upsert({
    where: { id: "l2000000-0000-0000-0000-000000000002" },
    update: {},
    create: { id: "l2000000-0000-0000-0000-000000000002", unitId: deGreetings.id, title: "Goodbye", description: "Learn Auf Wiedersehen and Tschüss", orderIndex: 2, xpReward: 50, isLocked: true },
  });
  const deLesson3 = await prisma.lesson.upsert({
    where: { id: "l2000000-0000-0000-0000-000000000003" },
    update: {},
    create: { id: "l2000000-0000-0000-0000-000000000003", unitId: deGreetings.id, title: "Polite Words", description: "Bitte, Danke, Entschuldigung", orderIndex: 3, xpReward: 50, isLocked: true },
  });
  const deLesson4 = await prisma.lesson.upsert({
    where: { id: "l2000000-0000-0000-0000-000000000004" },
    update: {},
    create: { id: "l2000000-0000-0000-0000-000000000004", unitId: deIntro.id, title: "Self Introduction", description: "Ich heiße...", orderIndex: 1, xpReward: 50, isLocked: true },
  });
  const deLesson5 = await prisma.lesson.upsert({
    where: { id: "l2000000-0000-0000-0000-000000000005" },
    update: {},
    create: { id: "l2000000-0000-0000-0000-000000000005", unitId: deIntro.id, title: "Asking Names", description: "Wie heißen Sie?", orderIndex: 2, xpReward: 50, isLocked: true },
  });
  const deLesson6 = await prisma.lesson.upsert({
    where: { id: "l2000000-0000-0000-0000-000000000006" },
    update: {},
    create: { id: "l2000000-0000-0000-0000-000000000006", unitId: deNumbers.id, title: "1-10", description: "Eins, zwei, drei...", orderIndex: 1, xpReward: 50, isLocked: true },
  });
  const deLesson7 = await prisma.lesson.upsert({
    where: { id: "l2000000-0000-0000-0000-000000000007" },
    update: {},
    create: { id: "l2000000-0000-0000-0000-000000000007", unitId: deNumbers.id, title: "11-20", description: "Elf, zwölf...", orderIndex: 2, xpReward: 50, isLocked: true },
  });

  console.log("✓ German lessons created");

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
    await prisma.vocabulary.create({ data: { languageId: ru.id, difficulty: 1, ...v } });
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
    { word: "Entschuldigung", translation: "Excuse me / Sorry", partOfSpeech: "noun", exampleSentence: "Entschuldigung, wo ist der Bahnhof?", exampleTranslation: "Excuse me, where is the train station?" },
    { word: "Ja", translation: "Yes", partOfSpeech: "adverb", exampleSentence: "Ja, natürlich.", exampleTranslation: "Yes, of course." },
    { word: "Nein", translation: "No", partOfSpeech: "adverb", exampleSentence: "Nein, danke.", exampleTranslation: "No, thank you." },
    { word: "Ich heiße", translation: "My name is", partOfSpeech: "phrase", exampleSentence: "Ich heiße Anna.", exampleTranslation: "My name is Anna." },
  ];

  for (const v of deVocab) {
    await prisma.vocabulary.create({ data: { languageId: de.id, difficulty: 1, ...v } });
  }

  console.log("✓ German vocabulary seeded");

  // ============================================
  // EXERCISES - RUSSIAN LESSON 1: Basic Hello
  // ============================================
  await createExercises(ruLesson1.id, [
    { type: "multiple_choice", question: 'What does "Здравствуйте" mean?', correctAnswer: "Hello (formal)", explanation: "Здравствуйте is the formal way to say hello in Russian.", orderIndex: 1, xpValue: 10,
      options: [{ text: "Goodbye", isCorrect: false, orderIndex: 1 }, { text: "Hello (formal)", isCorrect: true, orderIndex: 2 }, { text: "Thank you", isCorrect: false, orderIndex: 3 }, { text: "Please", isCorrect: false, orderIndex: 4 }] },
    { type: "translation", question: 'Translate to Russian: "Hello"', correctAnswer: "Привет", explanation: "Привет is the informal way to say hello.", orderIndex: 2, xpValue: 10 },
    { type: "word_order", question: "Arrange the words to form a sentence:", correctAnswer: "Как дела?", explanation: "Как дела? means How are you?", orderIndex: 3, xpValue: 10, metadata: JSON.stringify({ words: ["как", "дела", "?"] }) },
    { type: "fill_blank", question: "____, как дела? (Hello, how are you?)", correctAnswer: "Привет", explanation: "Привет is the informal greeting.", orderIndex: 4, xpValue: 10 },
    { type: "multiple_choice", question: 'What does "Привет" mean?', correctAnswer: "Hi (informal)", explanation: "Привет is the informal way to say hi.", orderIndex: 5, xpValue: 10,
      options: [{ text: "Goodbye", isCorrect: false, orderIndex: 1 }, { text: "Please", isCorrect: false, orderIndex: 2 }, { text: "Hi (informal)", isCorrect: true, orderIndex: 3 }, { text: "Thank you", isCorrect: false, orderIndex: 4 }] },
    { type: "listening", question: 'Listen and type what you hear: "Здравствуйте"', correctAnswer: "Здравствуйте", explanation: "Здравствуйте means Hello (formal) in Russian.", orderIndex: 6, xpValue: 15, metadata: JSON.stringify({ words: ["Здравствуйте"] }) },
    { type: "translation", question: 'Translate to Russian: "Thank you"', correctAnswer: "Спасибо", explanation: "Спасибо is how you say thank you.", orderIndex: 7, xpValue: 10 },
  ]);

  // ============================================
  // EXERCISES - RUSSIAN LESSON 2: Goodbye
  // ============================================
  await createExercises(ruLesson2.id, [
    { type: "multiple_choice", question: 'What does "До свидания" mean?', correctAnswer: "Goodbye (formal)", explanation: "До свидания is the formal way to say goodbye.", orderIndex: 1, xpValue: 10,
      options: [{ text: "Hello", isCorrect: false, orderIndex: 1 }, { text: "Goodbye (formal)", isCorrect: true, orderIndex: 2 }, { text: "Thank you", isCorrect: false, orderIndex: 3 }, { text: "Please", isCorrect: false, orderIndex: 4 }] },
    { type: "translation", question: 'Translate to Russian: "Bye"', correctAnswer: "Пока", explanation: "Пока is the informal way to say bye.", orderIndex: 2, xpValue: 10 },
    { type: "word_order", question: "Arrange the words:", correctAnswer: "До свидания, до завтра!", explanation: "До свидания, до завтра! means Goodbye, see you tomorrow!", orderIndex: 3, xpValue: 10, metadata: JSON.stringify({ words: ["До", "свидания,", "до", "завтра!"] }) },
    { type: "fill_blank", question: "____ свидания! (Goodbye!)", correctAnswer: "До", explanation: "До свидания is the full formal goodbye phrase.", orderIndex: 4, xpValue: 10 },
    { type: "multiple_choice", question: 'What does "Пока" mean?', correctAnswer: "Bye (informal)", explanation: "Пока is an informal farewell.", orderIndex: 5, xpValue: 10,
      options: [{ text: "Hello", isCorrect: false, orderIndex: 1 }, { text: "Yes", isCorrect: false, orderIndex: 2 }, { text: "Bye (informal)", isCorrect: true, orderIndex: 3 }, { text: "No", isCorrect: false, orderIndex: 4 }] },
    { type: "listening", question: 'Listen and type: "До свидания"', correctAnswer: "До свидания", explanation: "До свидания means Goodbye (formal).", orderIndex: 6, xpValue: 15, metadata: JSON.stringify({ words: ["До свидания"] }) },
    { type: "translation", question: 'Translate to Russian: "See you tomorrow!"', correctAnswer: "До завтра!", explanation: "До завтра! means See you tomorrow!", orderIndex: 7, xpValue: 10 },
  ]);

  // ============================================
  // EXERCISES - RUSSIAN LESSON 3: Polite Words
  // ============================================
  await createExercises(ruLesson3.id, [
    { type: "multiple_choice", question: 'What does "Пожалуйста" mean?', correctAnswer: "Please / You're welcome", explanation: "Пожалуйста means both please and you're welcome.", orderIndex: 1, xpValue: 10,
      options: [{ text: "Thank you", isCorrect: false, orderIndex: 1 }, { text: "Sorry", isCorrect: false, orderIndex: 2 }, { text: "Please / You're welcome", isCorrect: true, orderIndex: 3 }, { text: "Goodbye", isCorrect: false, orderIndex: 4 }] },
    { type: "translation", question: 'Translate to Russian: "Thank you very much"', correctAnswer: "Спасибо большое", explanation: "Спасибо большое means Thank you very much.", orderIndex: 2, xpValue: 10 },
    { type: "word_order", question: "Arrange the words:", correctAnswer: "Извините, где станция?", explanation: "Извините, где станция? means Excuse me, where is the station?", orderIndex: 3, xpValue: 10, metadata: JSON.stringify({ words: ["Извините,", "где", "станция?"] }) },
    { type: "fill_blank", question: "____, помогите мне. (Please, help me.)", correctAnswer: "Пожалуйста", explanation: "Пожалуйста means Please.", orderIndex: 4, xpValue: 10 },
    { type: "multiple_choice", question: 'What does "Извините" mean?', correctAnswer: "Excuse me / Sorry", explanation: "Извините is used to apologize or get attention.", orderIndex: 5, xpValue: 10,
      options: [{ text: "Hello", isCorrect: false, orderIndex: 1 }, { text: "Thank you", isCorrect: false, orderIndex: 2 }, { text: "Excuse me / Sorry", isCorrect: true, orderIndex: 3 }, { text: "Goodbye", isCorrect: false, orderIndex: 4 }] },
    { type: "listening", question: 'Listen and type: "Спасибо"', correctAnswer: "Спасибо", explanation: "Спасибо means Thank you.", orderIndex: 6, xpValue: 15, metadata: JSON.stringify({ words: ["Спасибо"] }) },
    { type: "translation", question: 'Translate to Russian: "Excuse me, where is the station?"', correctAnswer: "Извините, где станция?", explanation: "Извините is the polite way to ask for directions.", orderIndex: 7, xpValue: 10 },
  ]);

  // ============================================
  // EXERCISES - RUSSIAN LESSON 4: Self Introduction
  // ============================================
  await createExercises(ruLesson4.id, [
    { type: "multiple_choice", question: 'What does "Меня зовут" mean?', correctAnswer: "My name is", explanation: "Меня зовут is used to introduce yourself.", orderIndex: 1, xpValue: 10,
      options: [{ text: "How are you?", isCorrect: false, orderIndex: 1 }, { text: "My name is", isCorrect: true, orderIndex: 2 }, { text: "Where are you from?", isCorrect: false, orderIndex: 3 }, { text: "Goodbye", isCorrect: false, orderIndex: 4 }] },
    { type: "translation", question: 'Translate to Russian: "My name is Ahmed"', correctAnswer: "Меня зовут Ahmed", explanation: "Меня зовут + name is the standard introduction.", orderIndex: 2, xpValue: 10 },
    { type: "word_order", question: "Arrange the words:", correctAnswer: "Меня зовут Анна.", explanation: "Меня зовут Анна means My name is Anna.", orderIndex: 3, xpValue: 10, metadata: JSON.stringify({ words: ["Меня", "зовут", "Анна."] }) },
    { type: "fill_blank", question: "____ зовут Алексей. (My name is Alexey.)", correctAnswer: "Меня", explanation: "Меня зовут is the introduction phrase.", orderIndex: 4, xpValue: 10 },
    { type: "multiple_choice", question: 'How do you say "I am a student" in Russian?', correctAnswer: "Я студент", explanation: "Я студент means I am a student.", orderIndex: 5, xpValue: 10,
      options: [{ text: "Я студент", isCorrect: true, orderIndex: 1 }, { text: "Ты студент", isCorrect: false, orderIndex: 2 }, { text: "Он студент", isCorrect: false, orderIndex: 3 }, { text: "Мы студенты", isCorrect: false, orderIndex: 4 }] },
    { type: "listening", question: 'Listen and type: "Меня зовут"', correctAnswer: "Меня зовут", explanation: "Меня зовут means My name is.", orderIndex: 6, xpValue: 15, metadata: JSON.stringify({ words: ["Меня", "зовут"] }) },
    { type: "translation", question: 'Translate to Russian: "I am from Pakistan"', correctAnswer: "Я из Пакистана", explanation: "Я из + country (in genitive case) means I am from.", orderIndex: 7, xpValue: 10 },
  ]);

  // ============================================
  // EXERCISES - RUSSIAN LESSON 5: Asking Names
  // ============================================
  await createExercises(ruLesson5.id, [
    { type: "multiple_choice", question: 'What does "Как вас зовут?" mean?', correctAnswer: "What is your name? (formal)", explanation: "Как вас зовут? is the formal way to ask someone's name.", orderIndex: 1, xpValue: 10,
      options: [{ text: "How are you?", isCorrect: false, orderIndex: 1 }, { text: "What is your name? (formal)", isCorrect: true, orderIndex: 2 }, { text: "Where are you from?", isCorrect: false, orderIndex: 3 }, { text: "How old are you?", isCorrect: false, orderIndex: 4 }] },
    { type: "translation", question: 'Translate to Russian: "What is your name? (informal)"', correctAnswer: "Как тебя зовут?", explanation: "Как тебя зовут? is the informal version.", orderIndex: 2, xpValue: 10 },
    { type: "word_order", question: "Arrange the words:", correctAnswer: "Как вас зовут?", explanation: "Как вас зовут? means What is your name? (formal)", orderIndex: 3, xpValue: 10, metadata: JSON.stringify({ words: ["Как", "вас", "зовут?"] }) },
    { type: "fill_blank", question: "____ зовут? (What is your name? - informal)", correctAnswer: "Как тебя", explanation: "Как тебя зовут? uses the informal ты form.", orderIndex: 4, xpValue: 10 },
    { type: "multiple_choice", question: 'Which is the INFORMAL way to ask "What\'s your name?"', correctAnswer: "Как тебя зовут?", explanation: "Тебя is the informal singular form of you.", orderIndex: 5, xpValue: 10,
      options: [{ text: "Как вас зовут?", isCorrect: false, orderIndex: 1 }, { text: "Как тебя зовут?", isCorrect: true, orderIndex: 2 }, { text: "Как дела?", isCorrect: false, orderIndex: 3 }, { text: "Где вы?", isCorrect: false, orderIndex: 4 }] },
    { type: "listening", question: 'Listen and type: "Как вас зовут?"', correctAnswer: "Как вас зовут?", explanation: "Как вас зовут? means What is your name? (formal)", orderIndex: 6, xpValue: 15, metadata: JSON.stringify({ words: ["Как", "вас", "зовут?"] }) },
    { type: "translation", question: 'Translate to Russian: "My name is Yusuf"', correctAnswer: "Меня зовут Yusuf", explanation: "Меня зовут is the standard introduction.", orderIndex: 7, xpValue: 10 },
  ]);

  // ============================================
  // EXERCISES - RUSSIAN LESSON 6: Numbers 1-10
  // ============================================
  await createExercises(ruLesson6.id, [
    { type: "multiple_choice", question: 'What is "один" in English?', correctAnswer: "One", explanation: "Один means one in Russian.", orderIndex: 1, xpValue: 10,
      options: [{ text: "Two", isCorrect: false, orderIndex: 1 }, { text: "One", isCorrect: true, orderIndex: 2 }, { text: "Three", isCorrect: false, orderIndex: 3 }, { text: "Ten", isCorrect: false, orderIndex: 4 }] },
    { type: "translation", question: 'Translate to Russian: "five"', correctAnswer: "пять", explanation: "Пять means five.", orderIndex: 2, xpValue: 10 },
    { type: "word_order", question: "Put the numbers in order (1, 2, 3):", correctAnswer: "один два три", explanation: "один=1, два=2, три=3.", orderIndex: 3, xpValue: 10, metadata: JSON.stringify({ words: ["три", "один", "два"] }) },
    { type: "fill_blank", question: "____ (seven) вables to seven in Russian", correctAnswer: "семь", explanation: "Семь means seven.", orderIndex: 4, xpValue: 10 },
    { type: "multiple_choice", question: 'What is "десять" in English?', correctAnswer: "Ten", explanation: "Десять means ten.", orderIndex: 5, xpValue: 10,
      options: [{ text: "Eight", isCorrect: false, orderIndex: 1 }, { text: "Nine", isCorrect: false, orderIndex: 2 }, { text: "Ten", isCorrect: true, orderIndex: 3 }, { text: "Seven", isCorrect: false, orderIndex: 4 }] },
    { type: "listening", question: 'Listen and type: "четыре"', correctAnswer: "четыре", explanation: "Четыре means four.", orderIndex: 6, xpValue: 15, metadata: JSON.stringify({ words: ["четыре"] }) },
    { type: "translation", question: 'Translate to Russian: "three"', correctAnswer: "три", explanation: "Три means three.", orderIndex: 7, xpValue: 10 },
  ]);

  // ============================================
  // EXERCISES - RUSSIAN LESSON 7: Numbers 11-20
  // ============================================
  await createExercises(ruLesson7.id, [
    { type: "multiple_choice", question: 'What is "одиннадцать" in English?', correctAnswer: "Eleven", explanation: "Одиннадцать means eleven.", orderIndex: 1, xpValue: 10,
      options: [{ text: "Twelve", isCorrect: false, orderIndex: 1 }, { text: "Eleven", isCorrect: true, orderIndex: 2 }, { text: "Thirteen", isCorrect: false, orderIndex: 3 }, { text: "Ten", isCorrect: false, orderIndex: 4 }] },
    { type: "translation", question: 'Translate to Russian: "fifteen"', correctAnswer: "пятнадцать", explanation: "Пятнадцать means fifteen.", orderIndex: 2, xpValue: 10 },
    { type: "word_order", question: "Put the numbers in order (11, 12, 13):", correctAnswer: "одиннадцать двенадцать тринадцать", explanation: "11=одиннадцать, 12=двенадцать, 13=тринадцать.", orderIndex: 3, xpValue: 10, metadata: JSON.stringify({ words: ["тринадцать", "одиннадцать", "двенадцать"] }) },
    { type: "fill_blank", question: "____ (twenty) вables to twenty in Russian", correctAnswer: "двадцать", explanation: "Двадцать means twenty.", orderIndex: 4, xpValue: 10 },
    { type: "multiple_choice", question: 'What is "восемнадцать" in English?', correctAnswer: "Eighteen", explanation: "Восемнадцать means eighteen (8+10 pattern).", orderIndex: 5, xpValue: 10,
      options: [{ text: "Seventeen", isCorrect: false, orderIndex: 1 }, { text: "Sixteen", isCorrect: false, orderIndex: 2 }, { text: "Eighteen", isCorrect: true, orderIndex: 3 }, { text: "Nineteen", isCorrect: false, orderIndex: 4 }] },
    { type: "listening", question: 'Listen and type: "четырнадцать"', correctAnswer: "четырнадцать", explanation: "Четырнадцать means fourteen.", orderIndex: 6, xpValue: 15, metadata: JSON.stringify({ words: ["четырнадцать"] }) },
    { type: "translation", question: 'Translate to Russian: "seventeen"', correctAnswer: "семнадцать", explanation: "Семнадцать means seventeen.", orderIndex: 7, xpValue: 10 },
  ]);

  console.log("✓ All Russian exercises seeded");

  // ============================================
  // EXERCISES - GERMAN LESSON 1: Basic Hello
  // ============================================
  await createExercises(deLesson1.id, [
    { type: "multiple_choice", question: 'What does "Hallo" mean?', correctAnswer: "Hello", explanation: "Hallo is the most common informal greeting in German.", orderIndex: 1, xpValue: 10,
      options: [{ text: "Goodbye", isCorrect: false, orderIndex: 1 }, { text: "Hello", isCorrect: true, orderIndex: 2 }, { text: "Thank you", isCorrect: false, orderIndex: 3 }, { text: "Please", isCorrect: false, orderIndex: 4 }] },
    { type: "translation", question: 'Translate to German: "Good day"', correctAnswer: "Guten Tag", explanation: "Guten Tag is a formal greeting used during the day.", orderIndex: 2, xpValue: 10 },
    { type: "word_order", question: "Arrange the words to form a greeting:", correctAnswer: "Guten Tag", explanation: "Guten Tag means Good day.", orderIndex: 3, xpValue: 10, metadata: JSON.stringify({ words: ["Tag", "Guten"] }) },
    { type: "fill_blank", question: "____, wie geht es Ihnen? (Hello, how are you?)", correctAnswer: "Guten Tag", explanation: "Guten Tag is the formal daytime greeting.", orderIndex: 4, xpValue: 10 },
    { type: "multiple_choice", question: 'What does "Guten Tag" mean?', correctAnswer: "Good day", explanation: "Guten Tag is a formal daytime greeting.", orderIndex: 5, xpValue: 10,
      options: [{ text: "Good night", isCorrect: false, orderIndex: 1 }, { text: "Good day", isCorrect: true, orderIndex: 2 }, { text: "Goodbye", isCorrect: false, orderIndex: 3 }, { text: "Good morning", isCorrect: false, orderIndex: 4 }] },
    { type: "listening", question: 'Listen and type: "Danke"', correctAnswer: "Danke", explanation: "Danke means Thank you in German.", orderIndex: 6, xpValue: 15, metadata: JSON.stringify({ words: ["Danke"] }) },
    { type: "translation", question: 'Translate to German: "Goodbye"', correctAnswer: "Auf Wiedersehen", explanation: "Auf Wiedersehen is the formal way to say goodbye.", orderIndex: 7, xpValue: 10 },
  ]);

  // ============================================
  // EXERCISES - GERMAN LESSON 2: Goodbye
  // ============================================
  await createExercises(deLesson2.id, [
    { type: "multiple_choice", question: 'What does "Auf Wiedersehen" mean?', correctAnswer: "Goodbye (formal)", explanation: "Auf Wiedersehen is the formal farewell.", orderIndex: 1, xpValue: 10,
      options: [{ text: "Hello", isCorrect: false, orderIndex: 1 }, { text: "Goodbye (formal)", isCorrect: true, orderIndex: 2 }, { text: "Thank you", isCorrect: false, orderIndex: 3 }, { text: "Please", isCorrect: false, orderIndex: 4 }] },
    { type: "translation", question: 'Translate to German: "Bye"', correctAnswer: "Tschüss", explanation: "Tschüss is the informal bye.", orderIndex: 2, xpValue: 10 },
    { type: "word_order", question: "Arrange the words:", correctAnswer: "Tschüss, bis später!", explanation: "Tschüss, bis später! means Bye, see you later!", orderIndex: 3, xpValue: 10, metadata: JSON.stringify({ words: ["später!", "Tschüss,", "bis"] }) },
    { type: "fill_blank", question: "____ Wiedersehen! (Goodbye! - formal)", correctAnswer: "Auf", explanation: "Auf Wiedersehen is the formal goodbye.", orderIndex: 4, xpValue: 10 },
    { type: "multiple_choice", question: 'What does "Tschüss" mean?', correctAnswer: "Bye (informal)", explanation: "Tschüss is an informal farewell.", orderIndex: 5, xpValue: 10,
      options: [{ text: "Hello", isCorrect: false, orderIndex: 1 }, { text: "Yes", isCorrect: false, orderIndex: 2 }, { text: "Bye (informal)", isCorrect: true, orderIndex: 3 }, { text: "No", isCorrect: false, orderIndex: 4 }] },
    { type: "listening", question: 'Listen and type: "Auf Wiedersehen"', correctAnswer: "Auf Wiedersehen", explanation: "Auf Wiedersehen means Goodbye (formal).", orderIndex: 6, xpValue: 15, metadata: JSON.stringify({ words: ["Auf", "Wiedersehen"] }) },
    { type: "translation", question: 'Translate to German: "See you tomorrow!"', correctAnswer: "Bis morgen!", explanation: "Bis morgen! means See you tomorrow!", orderIndex: 7, xpValue: 10 },
  ]);

  // ============================================
  // EXERCISES - GERMAN LESSON 3: Polite Words
  // ============================================
  await createExercises(deLesson3.id, [
    { type: "multiple_choice", question: 'What does "Bitte" mean?', correctAnswer: "Please / You're welcome", explanation: "Bitte means both please and you're welcome.", orderIndex: 1, xpValue: 10,
      options: [{ text: "Thank you", isCorrect: false, orderIndex: 1 }, { text: "Sorry", isCorrect: false, orderIndex: 2 }, { text: "Please / You're welcome", isCorrect: true, orderIndex: 3 }, { text: "Goodbye", isCorrect: false, orderIndex: 4 }] },
    { type: "translation", question: 'Translate to German: "Thank you very much"', correctAnswer: "Danke schön", explanation: "Danke schön means Thank you very much.", orderIndex: 2, xpValue: 10 },
    { type: "word_order", question: "Arrange the words:", correctAnswer: "Entschuldigung, wo ist der Bahnhof?", explanation: "Entschuldigung, wo ist der Bahnhof? means Excuse me, where is the train station?", orderIndex: 3, xpValue: 10, metadata: JSON.stringify({ words: ["Bahnhof?", "Entschuldigung,", "wo", "ist", "der"] }) },
    { type: "fill_blank", question: "____, können Sie mir helfen? (Please, can you help me?)", correctAnswer: "Bitte", explanation: "Bitte means Please.", orderIndex: 4, xpValue: 10 },
    { type: "multiple_choice", question: 'What does "Entschuldigung" mean?', correctAnswer: "Excuse me / Sorry", explanation: "Entschuldigung is used to apologize or get attention.", orderIndex: 5, xpValue: 10,
      options: [{ text: "Hello", isCorrect: false, orderIndex: 1 }, { text: "Thank you", isCorrect: false, orderIndex: 2 }, { text: "Excuse me / Sorry", isCorrect: true, orderIndex: 3 }, { text: "Goodbye", isCorrect: false, orderIndex: 4 }] },
    { type: "listening", question: 'Listen and type: "Danke schön"', correctAnswer: "Danke schön", explanation: "Danke schön means Thank you very much.", orderIndex: 6, xpValue: 15, metadata: JSON.stringify({ words: ["Danke", "schön"] }) },
    { type: "translation", question: 'Translate to German: "Excuse me, where is the station?"', correctAnswer: "Entschuldigung, wo ist die Station?", explanation: "Entschuldigung is the polite way to ask for directions.", orderIndex: 7, xpValue: 10 },
  ]);

  // ============================================
  // EXERCISES - GERMAN LESSON 4: Self Introduction
  // ============================================
  await createExercises(deLesson4.id, [
    { type: "multiple_choice", question: 'What does "Ich heiße" mean?', correctAnswer: "My name is", explanation: "Ich heiße is used to introduce yourself.", orderIndex: 1, xpValue: 10,
      options: [{ text: "How are you?", isCorrect: false, orderIndex: 1 }, { text: "My name is", isCorrect: true, orderIndex: 2 }, { text: "Where are you from?", isCorrect: false, orderIndex: 3 }, { text: "Goodbye", isCorrect: false, orderIndex: 4 }] },
    { type: "translation", question: 'Translate to German: "My name is Ahmed"', correctAnswer: "Ich heiße Ahmed", explanation: "Ich heiße + name is the standard introduction.", orderIndex: 2, xpValue: 10 },
    { type: "word_order", question: "Arrange the words:", correctAnswer: "Ich heiße Anna.", explanation: "Ich heiße Anna means My name is Anna.", orderIndex: 3, xpValue: 10, metadata: JSON.stringify({ words: ["Anna.", "Ich", "heiße"] }) },
    { type: "fill_blank", question: "____ heiße Thomas. (My name is Thomas.)", correctAnswer: "Ich", explanation: "Ich heiße is the introduction phrase.", orderIndex: 4, xpValue: 10 },
    { type: "multiple_choice", question: 'How do you say "I am a student" in German?', correctAnswer: "Ich bin Student", explanation: "Ich bin Student means I am a student.", orderIndex: 5, xpValue: 10,
      options: [{ text: "Ich bin Student", isCorrect: true, orderIndex: 1 }, { text: "Du bist Student", isCorrect: false, orderIndex: 2 }, { text: "Er ist Student", isCorrect: false, orderIndex: 3 }, { text: "Wir sind Studenten", isCorrect: false, orderIndex: 4 }] },
    { type: "listening", question: 'Listen and type: "Ich heiße"', correctAnswer: "Ich heiße", explanation: "Ich heiße means My name is.", orderIndex: 6, xpValue: 15, metadata: JSON.stringify({ words: ["Ich", "heiße"] }) },
    { type: "translation", question: 'Translate to German: "I am from Pakistan"', correctAnswer: "Ich komme aus Pakistan", explanation: "Ich komme aus + country means I am from.", orderIndex: 7, xpValue: 10 },
  ]);

  // ============================================
  // EXERCISES - GERMAN LESSON 5: Asking Names
  // ============================================
  await createExercises(deLesson5.id, [
    { type: "multiple_choice", question: 'What does "Wie heißen Sie?" mean?', correctAnswer: "What is your name? (formal)", explanation: "Wie heißen Sie? is the formal way to ask someone's name.", orderIndex: 1, xpValue: 10,
      options: [{ text: "How are you?", isCorrect: false, orderIndex: 1 }, { text: "What is your name? (formal)", isCorrect: true, orderIndex: 2 }, { text: "Where are you from?", isCorrect: false, orderIndex: 3 }, { text: "How old are you?", isCorrect: false, orderIndex: 4 }] },
    { type: "translation", question: 'Translate to German: "What is your name? (informal)"', correctAnswer: "Wie heißt du?", explanation: "Wie heißt du? is the informal version.", orderIndex: 2, xpValue: 10 },
    { type: "word_order", question: "Arrange the words:", correctAnswer: "Wie heißen Sie?", explanation: "Wie heißen Sie? means What is your name? (formal)", orderIndex: 3, xpValue: 10, metadata: JSON.stringify({ words: ["Sie?", "Wie", "heißen"] }) },
    { type: "fill_blank", question: "____ heißt du? (What is your name? - informal)", correctAnswer: "Wie", explanation: "Wie heißt du? uses the informal du form.", orderIndex: 4, xpValue: 10 },
    { type: "multiple_choice", question: 'Which is the INFORMAL way to ask "What\'s your name?"', correctAnswer: "Wie heißt du?", explanation: "Du is the informal singular form of you.", orderIndex: 5, xpValue: 10,
      options: [{ text: "Wie heißen Sie?", isCorrect: false, orderIndex: 1 }, { text: "Wie heißt du?", isCorrect: true, orderIndex: 2 }, { text: "Wie geht es?", isCorrect: false, orderIndex: 3 }, { text: "Wo sind Sie?", isCorrect: false, orderIndex: 4 }] },
    { type: "listening", question: 'Listen and type: "Wie heißen Sie?"', correctAnswer: "Wie heißen Sie?", explanation: "Wie heißen Sie? means What is your name? (formal)", orderIndex: 6, xpValue: 15, metadata: JSON.stringify({ words: ["Wie", "heißen", "Sie?"] }) },
    { type: "translation", question: 'Translate to German: "My name is Yusuf"', correctAnswer: "Ich heiße Yusuf", explanation: "Ich heiße is the standard introduction.", orderIndex: 7, xpValue: 10 },
  ]);

  // ============================================
  // EXERCISES - GERMAN LESSON 6: Numbers 1-10
  // ============================================
  await createExercises(deLesson6.id, [
    { type: "multiple_choice", question: 'What is "eins" in English?', correctAnswer: "One", explanation: "Eins means one in German.", orderIndex: 1, xpValue: 10,
      options: [{ text: "Two", isCorrect: false, orderIndex: 1 }, { text: "One", isCorrect: true, orderIndex: 2 }, { text: "Three", isCorrect: false, orderIndex: 3 }, { text: "Ten", isCorrect: false, orderIndex: 4 }] },
    { type: "translation", question: 'Translate to German: "five"', correctAnswer: "fünf", explanation: "Fünf means five.", orderIndex: 2, xpValue: 10 },
    { type: "word_order", question: "Put the numbers in order (1, 2, 3):", correctAnswer: "eins zwei drei", explanation: "eins=1, zwei=2, drei=3.", orderIndex: 3, xpValue: 10, metadata: JSON.stringify({ words: ["drei", "eins", "zwei"] }) },
    { type: "fill_blank", question: "____ (sieben) means seven in German", correctAnswer: "sieben", explanation: "Sieben means seven.", orderIndex: 4, xpValue: 10 },
    { type: "multiple_choice", question: 'What is "zehn" in English?', correctAnswer: "Ten", explanation: "Zehn means ten.", orderIndex: 5, xpValue: 10,
      options: [{ text: "Eight", isCorrect: false, orderIndex: 1 }, { text: "Nine", isCorrect: false, orderIndex: 2 }, { text: "Ten", isCorrect: true, orderIndex: 3 }, { text: "Seven", isCorrect: false, orderIndex: 4 }] },
    { type: "listening", question: 'Listen and type: "vier"', correctAnswer: "vier", explanation: "Vier means four.", orderIndex: 6, xpValue: 15, metadata: JSON.stringify({ words: ["vier"] }) },
    { type: "translation", question: 'Translate to German: "three"', correctAnswer: "drei", explanation: "Drei means three.", orderIndex: 7, xpValue: 10 },
  ]);

  // ============================================
  // EXERCISES - GERMAN LESSON 7: Numbers 11-20
  // ============================================
  await createExercises(deLesson7.id, [
    { type: "multiple_choice", question: 'What is "elf" in English?', correctAnswer: "Eleven", explanation: "Elf means eleven in German.", orderIndex: 1, xpValue: 10,
      options: [{ text: "Twelve", isCorrect: false, orderIndex: 1 }, { text: "Eleven", isCorrect: true, orderIndex: 2 }, { text: "Thirteen", isCorrect: false, orderIndex: 3 }, { text: "Ten", isCorrect: false, orderIndex: 4 }] },
    { type: "translation", question: 'Translate to German: "fifteen"', correctAnswer: "fünfzehn", explanation: "Fünfzehn means fifteen (fünf+zehn).", orderIndex: 2, xpValue: 10 },
    { type: "word_order", question: "Put the numbers in order (11, 12, 13):", correctAnswer: "elf zwölf dreizehn", explanation: "11=elf, 12=zwölf, 13=dreizehn.", orderIndex: 3, xpValue: 10, metadata: JSON.stringify({ words: ["dreizehn", "elf", "zwölf"] }) },
    { type: "fill_blank", question: "____ (zwanzig) means twenty in German", correctAnswer: "zwanzig", explanation: "Zwanzig means twenty.", orderIndex: 4, xpValue: 10 },
    { type: "multiple_choice", question: 'What is "achtzehn" in English?', correctAnswer: "Eighteen", explanation: "Achtzehn means eighteen (acht+zehn).", orderIndex: 5, xpValue: 10,
      options: [{ text: "Seventeen", isCorrect: false, orderIndex: 1 }, { text: "Sixteen", isCorrect: false, orderIndex: 2 }, { text: "Eighteen", isCorrect: true, orderIndex: 3 }, { text: "Nineteen", isCorrect: false, orderIndex: 4 }] },
    { type: "listening", question: 'Listen and type: "vierzehn"', correctAnswer: "vierzehn", explanation: "Vierzehn means fourteen.", orderIndex: 6, xpValue: 15, metadata: JSON.stringify({ words: ["vierzehn"] }) },
    { type: "translation", question: 'Translate to German: "seventeen"', correctAnswer: "siebzehn", explanation: "Siebzehn means seventeen.", orderIndex: 7, xpValue: 10 },
  ]);

  console.log("✓ All German exercises seeded");

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
    await prisma.achievement.upsert({ where: { name: ach.name }, update: {}, create: ach });
  }

  console.log("✓ Achievements seeded");

  // ============================================
  // GRAMMAR RULES
  // ============================================
  await prisma.grammarRule.create({
    data: { languageId: ru.id, title: "Russian Greetings", explanation: "Russian has formal and informal greetings. Use Здравствуйте in formal situations and Привет with friends.", examples: JSON.stringify(["Здравствуйте - formal hello", "Привет - informal hi", "Доброе утро - good morning", "Добрый вечер - good evening"]) },
  });
  await prisma.grammarRule.create({
    data: { languageId: ru.id, title: "Russian Pronouns", explanation: "Russian personal pronouns: Я (I), Ты (you informal), Вы (you formal), Он (he), Она (she).", examples: JSON.stringify(["Я студент - I am a student", "Ты мой друг - You are my friend", "Вы врач? - Are you a doctor? (formal)"]) },
  });
  await prisma.grammarRule.create({
    data: { languageId: de.id, title: "German Articles", explanation: "German has three genders: masculine (der), feminine (die), and neuter (das).", examples: JSON.stringify(["der Mann - the man (masculine)", "die Frau - the woman (feminine)", "das Kind - the child (neuter)"]) },
  });
  await prisma.grammarRule.create({
    data: { languageId: de.id, title: "German Greetings", explanation: "German has formal and informal greetings. Use Guten Tag in formal situations and Hallo with friends.", examples: JSON.stringify(["Hallo - informal hello", "Guten Tag - good day (formal)", "Guten Morgen - good morning", "Auf Wiedersehen - goodbye (formal)"]) },
  });

  console.log("✓ Grammar rules seeded");
  console.log("\nSeeding complete!");
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
