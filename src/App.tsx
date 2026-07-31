import { useState } from 'react';
import { usePuzzleStore } from './hooks/usePuzzleStore';
import { Navbar } from './components/Navbar';
import { FloatingPuzzlePieces } from './components/FloatingPuzzlePieces';
import { Hero } from './components/Hero';
import { DailyPuzzleCard } from './components/DailyPuzzleCard';
import { PuzzleArchive } from './components/PuzzleArchive';
import { CategoriesSection } from './components/CategoriesSection';
import { StatsSection } from './components/StatsSection';
import { WhyUsSection } from './components/WhyUsSection';
import { GallerySection } from './components/GallerySection';
import { FaqSection } from './components/FaqSection';
import { SocialSection } from './components/SocialSection';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { FavoritesModal, RecentModal, LegalModal } from './components/Modals';

export default function App() {
  const {
    puzzles,
    activePuzzle,
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
  } = usePuzzleStore();

  const [favoritesModalOpen, setFavoritesModalOpen] = useState(false);
  const [recentModalOpen, setRecentModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  const activeIndex = puzzles.findIndex(p => p.id === activePuzzle.id);

  const handleStartSolving = () => {
    const el = document.getElementById('daily-puzzle');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearchClick = () => {
    const el = document.getElementById('archive');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const searchInput = document.getElementById('archive-search-input');
      if (searchInput) searchInput.focus();
    }
  };

  const handleSelectPuzzle = (id: number) => {
    addRecentlyViewed(id);
    const el = document.getElementById('daily-puzzle');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      handleSelectPuzzle(puzzles[activeIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (activeIndex < puzzles.length - 1) {
      handleSelectPuzzle(puzzles[activeIndex + 1].id);
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-[#0F172A] text-slate-100' 
        : 'bg-slate-900 text-slate-100'
    }`}>
      {/* Navbar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onRandomClick={selectRandomPuzzle}
        favoritesCount={favoriteIds.length}
        streak={streak}
        onOpenFavorites={() => setFavoritesModalOpen(true)}
        onOpenRecent={() => setRecentModalOpen(true)}
        onSearchClick={handleSearchClick}
      />

      <main className="relative overflow-hidden">
        {/* Background Glow Elements */}
        <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-[#38BDF8] opacity-10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-[#FACC15] opacity-5 rounded-full blur-[120px] pointer-events-none" />

        {/* Floating background graphics */}
        <FloatingPuzzlePieces />

        {/* Hero */}
        <Hero onStartSolving={handleStartSolving} />

        {/* Daily Puzzle Card */}
        <DailyPuzzleCard
          puzzle={activePuzzle}
          totalPuzzles={puzzles.length}
          currentIndex={activeIndex}
          isSolved={solvedIds.includes(activePuzzle.id)}
          isFavorite={favoriteIds.includes(activePuzzle.id)}
          onSolve={markSolved}
          onToggleFavorite={toggleFavorite}
          onPrev={handlePrev}
          onNext={handleNext}
        />

        {/* Archive / Grid */}
        <PuzzleArchive
          puzzles={filteredPuzzles}
          solvedIds={solvedIds}
          favoriteIds={favoriteIds}
          selectedCategory={selectedCategory}
          selectedDifficulty={selectedDifficulty}
          searchQuery={searchQuery}
          onSelectPuzzle={handleSelectPuzzle}
          onToggleFavorite={toggleFavorite}
          onCategoryChange={setSelectedCategory}
          onDifficultyChange={setSelectedDifficulty}
          onSearchChange={setSearchQuery}
        />

        {/* Categories */}
        <CategoriesSection onSelectCategory={setSelectedCategory} />

        {/* Stats */}
        <StatsSection
          solvedCount={solvedIds.length}
          streak={streak}
          favoritesCount={favoriteIds.length}
        />

        {/* Why Us */}
        <WhyUsSection />

        {/* Gallery */}
        <GallerySection onSelectPuzzle={handleSelectPuzzle} />

        {/* FAQ */}
        <FaqSection />

        {/* Social */}
        <SocialSection />

        {/* Newsletter */}
        <NewsletterSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
      />

      {/* Modals */}
      <FavoritesModal
        isOpen={favoritesModalOpen}
        onClose={() => setFavoritesModalOpen(false)}
        puzzles={puzzles}
        favoriteIds={favoriteIds}
        onSelectPuzzle={handleSelectPuzzle}
        onToggleFavorite={toggleFavorite}
      />

      <RecentModal
        isOpen={recentModalOpen}
        onClose={() => setRecentModalOpen(false)}
        puzzles={puzzles}
        recentIds={recentIds}
        onSelectPuzzle={handleSelectPuzzle}
      />

      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
