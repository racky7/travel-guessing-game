import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const scoreId = searchParams.get("id");
    if (!scoreId) {
      return NextResponse.json(
        { message: "Score ID not provided" },
        { status: 400 }
      );
    }

    const userScore = await db.score.findUnique({
      where: { id: scoreId },
      include: { user: true },
    });

    if (!userScore) {
      return NextResponse.json({ message: "Score not found" }, { status: 404 });
    }

    return NextResponse.json(userScore, { status: 200 });
  } catch (error) {
    console.error("Error fetching scores:", error);
    return NextResponse.json(
      { message: "Failed to fetch scores" },
      { status: 500 }
    );
  }
}
