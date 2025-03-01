import { NextResponse } from "next/server";
import { destinations } from "@/lib/data";
import { getRandomIndex, shuffleArray } from "@/lib/utils";

export async function GET() {
  try {
    const randomIndex = getRandomIndex(destinations.length);
    const randomDestination = destinations[randomIndex];

    const choices = getRandomNames(randomDestination.city);

    return NextResponse.json({
      clues: randomDestination.clues,
      choices,
      fun_fact: randomDestination.fun_fact,
    });
  } catch (error) {
    console.error("Error fetching random destination:", error);
    return NextResponse.json(
      { error: "Failed to fetch random destination" },
      { status: 500 }
    );
  }
}

function getRandomNames(excludeName: string, count: number = 4) {
  // Filter out the correct answer and map to names
  const possibleAnswers = shuffleArray(destinations)
    .filter((dest) => dest.city !== excludeName)
    .slice(0, count - 1)
    .map((dest) => ({ name: dest.city, correct: false }));

  const shuffledAnswers = shuffleArray([
    ...possibleAnswers,
    { name: excludeName, correct: true },
  ]);

  return shuffledAnswers;
}
