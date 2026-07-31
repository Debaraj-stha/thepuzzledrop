export type CategoryType = 
  | 'Riddle' 
  | 'Brain Teaser' 
  | 'Math' 
  | 'Logic' 
  | 'Spot Difference' 
  | 'Guess Movie' 
  | 'Emoji Quiz';

export type DifficultyType = 'Easy' | 'Medium' | 'Hard' | 'Expert';

export interface Puzzle {
  id: number;
  title: string;
  difficulty: DifficultyType;
  category: CategoryType;
  question: string;
  answers: string[];
  hint: string;
  explanation: string;
  image?: string;
  date: string;
  likesCount?: number;
}

export interface UserStats {
  solvedPuzzleIds: number[];
  favoritePuzzleIds: number[];
  recentlyViewedIds: number[];
  currentStreak: number;
  lastSolvedDate?: string;
}
