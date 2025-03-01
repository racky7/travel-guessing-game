import { Score } from "@/lib/destination";
import { Trophy } from "lucide-react";

type ImagePrewviewProps = {
  username: string;
  score: Score;
};

export default function ImagePreview({ username, score }: ImagePrewviewProps) {
  return (
    <div className="bg-gradient-to-b from-teal-500 to-blue-600 text-white">
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Hello Travler!</h2>
          <p className="text-xl">
            <span className="text-yellow-800 font-semibold">{username}</span>{" "}
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

            <div className="flex gap-4 mb-4">
              <div className="bg-green-500 backdrop-blur-sm rounded-lg px-4 py-2 flex-1 text-center">
                <p className="text-sm">Correct</p>
                <p className="text-2xl font-bold">{score.correct}</p>
              </div>
              <div className="bg-red-500 backdrop-blur-sm rounded-lg px-4 py-2 flex-1 text-center">
                <p className="text-sm">Incorrect</p>
                <p className="text-2xl font-bold">{score.incorrect}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div />
    </div>
  );
}
