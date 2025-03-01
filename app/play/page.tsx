"use client";

import { Button } from "@/components/ui/button";
import { Destination, Score } from "@/lib/destination";
import { cn, getRandomIndex } from "@/lib/utils";
import { RefreshCw, Share2, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import ChallengeFriendModal from "./_components/challenge-friend-modal";

export default function GamePage() {
  const [score, setScore] = useState<Score>({
    correct: 0,
    incorrect: 0,
  });
  const [destination, setDestination] = useState<Destination | null>(null);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );
  const [openChallengeModal, setOpenChallengeModal] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const isSelected = selectedAnswerIndex !== null;
  const correctChoice = destination?.choices.find((choice) => choice.correct);
  const selectedChoice = isSelected
    ? destination?.choices[selectedAnswerIndex]
    : null;

  const isCorrect =
    isSelected && correctChoice?.correct === selectedChoice?.correct;

  const fetchDestination = async () => {
    const response = await fetch("/api/destinations/random");
    const data: Destination = await response.json();
    setDestination(data);
  };

  const handleNextDestination = () => {
    setSelectedAnswerIndex(null);
    fetchDestination();
  };

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswerIndex(index);
    if (destination?.choices[index].correct) {
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }
  };

  const handleUserCreate = async (username: string) => {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username }),
    });
    const data = await response.json();
    setUsername(data.username);
  };

  useEffect(() => {
    fetchDestination();
  }, []);

  useEffect(() => {
    if (isCorrect) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [isCorrect]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-white" />
          <span className="font-semibold">
            Score: {score.correct} / {score.correct + score.incorrect}
          </span>
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
            {destination?.choices.map((choice, idx) => (
              <Button
                key={`choice-${idx}`}
                size="lg"
                className={cn(
                  "h-15 text-lg w-full transition-colors duration-200 cursor-pointer",
                  isSelected && selectedAnswerIndex === idx && !choice.correct
                    ? "bg-red-500 hover:bg-red-400"
                    : "bg-white/30 hover:bg-white/40",
                  isSelected && choice.correct
                    ? "bg-green-500 hover:bg-green-400"
                    : null,
                  isSelected ? "pointer-events-none" : null
                )}
                onClick={() => handleAnswerSelect(idx)}
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
            <>
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold cursor-pointer"
                onClick={handleNextDestination}
              >
                <RefreshCw className="w-5 h-5 mr-1" />
                Play Again
              </Button>
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-500 text-white hover:text-white font-bold"
                onClick={() => {
                  setOpenChallengeModal(true);
                }}
              >
                <Share2 className="w-5 h-5 mr-1" />
                Challenge a Friend
              </Button>
            </>
          )}
        </div>
      </div>
      <ChallengeFriendModal
        open={openChallengeModal}
        setOpen={setOpenChallengeModal}
        score={score}
        onSubmit={handleUserCreate}
        username={username}
      />
    </div>
  );
}
