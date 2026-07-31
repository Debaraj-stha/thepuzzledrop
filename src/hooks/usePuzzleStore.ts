import { useState, useEffect, useCallback } from 'react';
import { INITIAL_PUZZLES } from '../data/puzzles';
import { Puzzle, CategoryType, DifficultyType } from '../types';

const SOLVED_STORAGE_KEY = 'thepuzzledrop_solved_v1';
const FAVORITES_STORAGE_KEY = 'thepuzzledrop_favorites_v1';
const RECENT_STORAGE_KEY = 'thepuzzledrop_recent_v1';
const THEME_STORAGE_KEY = 'thepuzzledrop_theme_v1';
const STREAK_STORAGE_KEY = 'thepuzzledrop_streak_v1';

export function usePuzzleStore() {
  const [puzzles] = useState<Puzzle[]>(INITIAL_PUZZLES);
  const [activePuzzleId, setActivePuzzleId] = useState<number>(INITIAL_PUZZLES[0].id);
  
  // Local storage state
  const [solvedIds, setSolvedIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(SOLVED_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favoriteIds, setFavoriteIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [recentIds, setRecentIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(RECENT_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [INITIAL_PUZZLES[0].id];
    } catch {
      return [INITIAL_PUZZLES[0].id];
    }
  });

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {}
    return 'dark';
  });

  const [streak, setStreak] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STREAK_STORAGE_KEY);
      return saved ? parseInt(saved, 10) : 3;
    } catch {
      return 3;
    }
  });

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'All'>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sync localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SOLVED_STORAGE_KEY, JSON.stringify(solvedIds));
    } catch {}
  }, [solvedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch {}
  }, [favoriteIds]);

  useEffect(() => {
    try {
      localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(recentIds));
    } catch {}
  }, [recentIds]);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch {}
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem(STREAK_STORAGE_KEY, streak.toString());
    } catch {}
  }, [streak]);

  // Active puzzle object
  const activePuzzle = puzzles.find(p => p.id === activePuzzleId) || puzzles[0];

  // Actions
  const markSolved = useCallback((id: number) => {
    setSolvedIds(prev => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
    setStreak(prev => prev + 1);
  }, []);

  const toggleFavorite = useCallback((id: number) => {
    setFavoriteIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  }, []);

  const addRecentlyViewed = useCallback((id: number) => {
    setActivePuzzleId(id);
    setRecentIds(prev => {
      const filtered = prev.filter(item => item !== id);
      return [id, ...filtered].slice(0, 10);
    });
  }, []);

  const selectRandomPuzzle = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * puzzles.length);
    const randomPuzzle = puzzles[randomIndex];
    addRecentlyViewed(randomPuzzle.id);
  }, [puzzles, addRecentlyViewed]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  // Filtered puzzles for archive
  const filteredPuzzles = puzzles.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesDiff = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
    const matchesSearch = searchQuery === '' || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesDiff && matchesSearch;
  });

  return {
    puzzles,
    activePuzzle,
    activePuzzleId,
    solvedIds,
    favoriteIds,
    recentIds,
    theme,
    streak,
    selectedCategory,
    selectedDifficulty,
    searchQuery,
    filteredPuzzles,
    markSolved,
    toggleFavorite,
    addRecentlyViewed,
    selectRandomPuzzle,
    toggleTheme,
    setSelectedCategory,
    setSelectedDifficulty,
    setSearchQuery,
  };
}
