"use client";
import { Button } from "@/components/ui/button";
import { Destination } from "@/lib/destination";
import { cn, getRandomIndex } from "@/lib/utils";
import { RefreshCw, Share2, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function GamePage() {
  const [destination, setDestination] = useState<Destination | undefined>();
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<
    number | undefined
  >();

  const isSelected = typeof selectedAnswerIndex !== "undefined";
  const correctChoice = destination
    ? destination.choices.find((choice) => choice.correct)
    : undefined;
  const selectedChoice =
    isSelected && destination
      ? destination.choices[selectedAnswerIndex]
      : undefined;

  const isCorrect =
    correctChoice && selectedChoice
      ? correctChoice.correct === selectedChoice.correct
      : false;

  if (isCorrect) {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  const fetchDestination = async () => {
    const response = await fetch("/api/destinations/random");
    const data: Destination = await response.json();
    setDestination(data);
  };

  const handleNextDestination = () => {
    setSelectedAnswerIndex(undefined);
    fetchDestination();
  };

  useEffect(() => {
    fetchDestination();
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-white" />
          <span className="font-semibold">Score: 7 / 10</span>
        </div>
      </div>
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-lg">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Where am I?</h2>
          <div className="bg-white/20 p-6 rounded-lg mb-4">
            <ul className="list-disc pl-5 space-y-2">
              {destination?.clues.map((clue, i) => (
                <li key={`clue-${i}`} className="text-xl italic">
                  {clue}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Select your answer:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {destination?.choices.map((choice, i) => (
              <Button
                key={i}
                size="lg"
                className={cn(
                  "h-15 text-lg w-full transition-colors duration-200 cursor-pointer",
                  isSelected && selectedAnswerIndex === i && !choice.correct
                    ? "bg-red-500 hover:bg-red-400"
                    : "bg-white/30 hover:bg-white/40",
                  isSelected && choice.correct
                    ? "bg-green-500 hover:bg-green-400"
                    : null,
                  isSelected ? "pointer-events-none" : null
                )}
                onClick={() => setSelectedAnswerIndex(i)}
              >
                {choice.name}
              </Button>
            ))}
          </div>
        </div>
        {isSelected ? (
          <div
            className={`p-6 rounded-lg mb-8 ${
              isCorrect ? "bg-green-500/40" : "bg-red-500/40"
            }`}
          >
            <h3 className="text-xl font-bold mb-2">
              {isCorrect ? "Correct! 🎉" : "Not quite right! 😢"}
            </h3>

            <p className="text-lg mb-4">
              {isCorrect
                ? `You correctly identified ${selectedChoice?.name}!`
                : `The correct answer was ${correctChoice?.name}.`}
            </p>

            <div className="bg-white/20 p-4 rounded-lg">
              <h4 className="font-bold mb-1">Fun Fact:</h4>
              <p className="text-lg">
                {
                  destination?.fun_fact[
                    getRandomIndex(destination.fun_fact.length)
                  ]
                }
              </p>
            </div>
          </div>
        ) : null}
        <div className="flex flex-wrap gap-4 justify-center">
          {isSelected && (
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold"
              onClick={handleNextDestination}
            >
              <RefreshCw className="w-5 h-5 mr-1" />
              Play Again
            </Button>
          )}
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-500 text-white hover:text-white font-bold"
          >
            <Share2 className="w-5 h-5 mr-1" />
            Challenge a Friend
          </Button>
        </div>
      </div>
    </div>
  );
}
