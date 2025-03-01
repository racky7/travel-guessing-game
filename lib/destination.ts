export type Destination = {
  clues: string[];
  choices: { name: string; correct: boolean }[];
  fun_fact: string[];
};

export type Score = {
  correct: number;
  incorrect: number;
};
