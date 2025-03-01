export type Destination = {
  clues: string[];
  choices: { name: string; correct: boolean }[];
  fun_fact: string[];
};

export type Score = {
  correct: number;
  incorrect: number;
};

export type User = {
  id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
};

export type UserScore = {
  id: string;
  userId: string;
  points: Score;
  createdAt: string;
  user: User;
};
