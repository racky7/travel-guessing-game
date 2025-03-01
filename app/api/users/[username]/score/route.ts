import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const paramsObj = await params;
    const username = paramsObj.username;
    const { score } = await request.json();

    if (
      !score ||
      typeof score !== "object" ||
      typeof score.correct !== "number" ||
      typeof score.incorrect !== "number"
    ) {
      return NextResponse.json(
        { message: "Invalid score data" },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Create new score object
    const userScore = await db.score.create({
      data: {
        points: {
          correct: score.correct,
          incorrect: score.incorrect,
        },
        userId: user.id,
      },
    });

    return NextResponse.json(userScore, { status: 201 });
  } catch (error) {
    console.error("Error updating score:", error);
    return NextResponse.json(
      { message: "Failed to update score" },
      { status: 500 }
    );
  }
}
