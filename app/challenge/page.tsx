import { Button } from "@/components/ui/button";
import { UserScore } from "@/lib/destination";
import { ArrowRight, Trophy } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = {
  openGraph: {
    images: [
      {
        url: "https://travel-guessing-game.vercel.app/challenge?score=67c31880169b41718a32ec18",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function ChallengePage({
  searchParams,
}: {
  searchParams: Promise<{ user?: string; score?: string }>;
}) {
  const searchParamsObj = await searchParams;

  const { score } = searchParamsObj;
  if (!score) {
    return notFound(); // Show 404 if query params are missing
  }

  let userScore: UserScore | null = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/score?id=${score}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user score");
    }

    userScore = await response.json();
  } catch (error) {
    console.error("Error fetching user score:", error);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Hello Travler!</h2>
          <p className="text-xl">
            <span className="text-yellow-800 font-semibold">
              {userScore?.user.username}
            </span>{" "}
            has challenged you to a Globetrotter duel!
          </p>
        </div>
        <div className="mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="bg-white/20 backdrop-blur-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-2xl">Can you beat their score?</p>
              </div>
              <Trophy className="w-12 h-12 text-yellow-800" />
            </div>

            {userScore && (
              <div className="flex gap-4 mb-4">
                <div className="bg-green-500 backdrop-blur-sm rounded-lg px-4 py-2 flex-1 text-center">
                  <p className="text-sm">Correct</p>
                  <p className="text-2xl font-bold">
                    {userScore.points.correct}
                  </p>
                </div>
                <div className="bg-red-500 backdrop-blur-sm rounded-lg px-4 py-2 flex-1 text-center">
                  <p className="text-sm">Incorrect</p>
                  <p className="text-2xl font-bold">
                    {userScore.points.incorrect}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="max-w-md mx-auto">
          <Link href="/play">
            <Button
              size="lg"
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold"
            >
              Challenge Accepted <ArrowRight className="h-6 w-6 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
