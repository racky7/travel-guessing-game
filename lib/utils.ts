import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomIndex(max: number) {
  return Math.floor(Math.random() * max);
}

export function shuffleArray<T>(array: T[]) {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export const playCorrectAudio = () => {
  const audio = new Audio("/sounds/correct.wav");
  audio.play().catch(() => console.error("Error playing sound"));
};

export const playIncorrectAudio = () => {
  const audio = new Audio("/sounds/incorrect.wav");
  audio.play().catch(() => console.error("Error playing sound:"));
};
