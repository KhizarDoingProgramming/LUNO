<div align="center">

# 🅛 LUNO

### learn languages. level up. repeat.

**a gamified language learning platform for russian & german**

[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://lunolearn.vercel.app)
[![Built with Next.js](https://img.shields.io/badge/Built_with-Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![Made with Prisma](https://img.shields.io/badge/Made_with-Prisma_7-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://prisma.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)

**[try it live →](https://lunolearn.vercel.app)**

</div>

---

## what is luno?

luno is a full-stack web app that makes learning russian & german actually fun. think duolingo vibes but with a custom-built engine, real-time gamification, AI-powered tutoring, and a UI that doesn't look like it came from 2015.

built from scratch. no boilerplate templates. every pixel is intentional.

---

## ✨ features

### learning engine
- **5 exercise types** — multiple choice, translation, word ordering, fill-in-the-blank, listening comprehension
- **speech synthesis** — hear native pronunciation with Web Speech API
- **review rounds** — miss a question? you'll replay it at the end until you nail it
- **spaced repetition** — smart scheduling that brings words back right before you forget them
- **structured curriculum** — units & lessons that build on each other from basics to fluency

### gamification
- **XP system** — earn experience points for every correct answer
- **streak tracking** — daily streaks with automatic calculation
- **level progression** — beginner → intermediate → advanced
- **daily goals** — customizable practice targets
- **achievements** — unlock badges as you hit milestones
- **confetti celebrations** — because learning should feel rewarding 🎉

### haptics & sounds
- **synthesized sound effects** — click, correct, incorrect, completion fanfare (Web Audio API, zero audio files)
- **mobile haptic feedback** — vibration patterns for every interaction (`navigator.vibrate()`)
- **canvas-confetti** — party poppers when you complete a lesson

### ai integration
- **OpenRouter AI** — auto-routing to the best available model for conversational practice
- **AI-powered tutoring** — real dialogue practice with context-aware responses

### ui/ux
- **banorama-inspired landing page** — full-screen scroll sections, parallax effects, animated marquee
- **floating glassmorphism navbar** — adapts to scroll position
- **dark mode** — full dark theme across every page with CSS variable system
- **framer motion animations** — scroll reveals, page transitions, micro-interactions
- **count-up stats** — animated number counters on the landing page
- **responsive design** — works beautifully from mobile to ultrawide

---

## 🛠 tech stack

| Layer | Tech |
|---|---|
| **framework** | Next.js 16 (App Router) |
| **language** | TypeScript 5 |
| **styling** | Tailwind CSS 4 |
| **database** | PostgreSQL (Neon) |
| **ORM** | Prisma 7 |
| **auth** | NextAuth 4 |
| **AI** | OpenRouter API |
| **animations** | Framer Motion 13 |
| **confetti** | canvas-confetti |
| **sounds** | Web Audio API (synth) |
| **haptics** | Navigator Vibration API |
| **UI primitives** | Radix UI |
| **icons** | Lucide React |
| **deployment** | Vercel |

---

## 📁 project structure

```
luno/
├── prisma/
│   ├── schema.prisma          # 18 models — users, courses, lessons, exercises, progress
│   ├── seed.ts                # 600+ lines of seed data (courses, vocabulary, exercises)
│   └── prisma.config.ts
├── src/
│   ├── app/
│   │   ├── page.tsx           # landing page (700+ lines, 6 scroll sections)
│   │   ├── layout.tsx         # root layout with custom fonts
│   │   ├── dashboard/         # gamified dashboard with progress tracking
│   │   ├── lesson/[id]/       # lesson engine (5 exercise types + review round)
│   │   ├── auth/              # login & signup pages
│   │   ├── onboarding/        # language & level selection
│   │   ├── profile/           # user stats & achievements
│   │   └── api/               # auth endpoints
│   ├── components/
│   │   ├── layout/            # navbar, side navigation
│   │   └── ui/                # button, badge, progress, input, scroll-reveal
│   ├── lib/
│   │   ├── effects.ts         # sound effects + haptic feedback (Web Audio API)
│   │   ├── gamification.ts    # XP, streak, completion tracking (localStorage)
│   │   ├── auth/              # NextAuth config
│   │   ├── ai/                # OpenRouter integration
│   │   └── db/                # Prisma client singleton
│   ├── config/                # app configuration
│   └── types/                 # TypeScript type definitions
├── public/
│   ├── favicon.svg            # custom purple L logo
│   └── ...
└── package.json
```

---

## 🚀 getting started

### prerequisites
- node.js 18+
- a neon postgres database (free tier works)
- an openrouter api key (for AI features)

### setup

```bash
# clone the repo
git clone https://github.com/KhizarDoingProgramming/LUNO.git
cd LUNO

# install dependencies
npm install

# set up environment variables
cp .env.local.example .env.local
# fill in your DATABASE_URL, NEXTAUTH_SECRET, OPENROUTER_API_KEY

# push the database schema
npx prisma db push

# seed the database
npx prisma db seed

# start the dev server
npm run dev
```

open [http://localhost:3000](http://localhost:3000) and you're good.

### scripts

| command | what it does |
|---|---|
| `npm run dev` | start dev server |
| `npm run build` | generate prisma client + build for production |
| `npm run db:push` | push schema changes to database |
| `npm run db:seed` | seed database with courses & exercises |
| `npm run db:studio` | open prisma studio (visual DB browser) |
| `npm run lint` | run eslint |

---

## 🗄 database

18 prisma models powering the full learning system:

- **User** / **Profile** — auth + learning preferences
- **Language** / **Course** / **Unit** / **Lesson** — curriculum structure
- **Exercise** / **ExerciseOption** — 5 exercise types with metadata
- **UserProgress** / **UserAnswer** — per-exercise tracking
- **UserVocabulary** — spaced repetition scheduling
- **UserAchievement** / **Achievement** — gamification rewards
- **DailyGoal** — daily practice targets
- **Streak** — streak history

---

## 🎨 design system

- **fonts**: Space Grotesk (display), Outfit (body), JetBrains Mono (code)
- **colors**: purple primary (#6C3CE1), navy text (#1E285A), cloud blue backgrounds
- **dark mode**: full CSS variable system — every token redefined for `html.dark`
- **animations**: Framer Motion scroll reveals, parallax, count-up, marquee dividers

---

## 📄 license

this project is private. don't be weird about it.

---

<div align="center">

**built with 💜 by mustafa**

[↑ back to top](#-luno)

</div>
