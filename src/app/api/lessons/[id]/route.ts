import { NextResponse } from "next/server";
import { Client } from "pg";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  try {
    const { id } = await params;
    await client.connect();

    const lessonResult = await client.query(
      'SELECT id, title, description, "xpReward" FROM "Lesson" WHERE id = $1',
      [id]
    );

    if (lessonResult.rows.length === 0) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    const lesson = lessonResult.rows[0];

    const exercisesResult = await client.query(
      `SELECT id, type, question, "correctAnswer" as "correctAnswer", explanation, "orderIndex", "xpValue", metadata
       FROM "Exercise"
       WHERE "lessonId" = $1
       ORDER BY "orderIndex" ASC`,
      [id]
    );

    const exercises = [];
    for (const ex of exercisesResult.rows) {
      const optionsResult = await client.query(
        `SELECT id, text, "isCorrect", "orderIndex"
         FROM "ExerciseOption"
         WHERE "exerciseId" = $1
         ORDER BY "orderIndex" ASC`,
        [ex.id]
      );

      exercises.push({
        id: ex.id,
        type: ex.type,
        question: ex.question,
        correctAnswer: ex.correctAnswer,
        explanation: ex.explanation,
        orderIndex: ex.orderIndex,
        xpValue: ex.xpValue,
        metadata: ex.metadata || "{}",
        options: optionsResult.rows.map((o) => ({
          id: o.id,
          text: o.text,
          isCorrect: o.isCorrect,
          orderIndex: o.orderIndex,
        })),
      });
    }

    return NextResponse.json({ lesson: { ...lesson, exercises } });
  } catch (error) {
    console.error("Failed to fetch lesson:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    await client.end();
  }
}
