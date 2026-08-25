import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        exercises: {
          orderBy: { orderIndex: "asc" },
          include: {
            options: {
              orderBy: { orderIndex: "asc" },
              select: { id: true, text: true, isCorrect: true, orderIndex: true },
            },
          },
          select: {
            id: true, type: true, question: true, correctAnswer: true,
            explanation: true, orderIndex: true, xpValue: true, metadata: true, options: true,
          },
        },
      },
    });

    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    return NextResponse.json({ lesson });
  } catch (error) {
    console.error("Failed to fetch lesson:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
