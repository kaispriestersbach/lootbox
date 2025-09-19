import { useCallback, useMemo, useState } from 'react';
import { GameSelector } from './components/GameSelector';
import { ItemLibrary } from './components/ItemLibrary';
import { CS2Roller } from './components/CS2Roller';
import { PUBGCrate } from './components/PUBGCrate';
import { ResultPanel } from './components/ResultPanel';
import { games, getRarityWeight, itemsByGame } from './data/items';
import type { GameId, LootItem } from './data/items';
import './App.css';

type Mode = 'random' | 'scripted';

function pickWeightedRandom(gameId: GameId, pool: LootItem[]): LootItem {
  const expanded = pool.map((item) => ({
    item,
    weight: (item.weight || 1) * getRarityWeight(gameId, item.rarity),
  }));
  const total = expanded.reduce((sum, entry) => sum + entry.weight, 0);
  const threshold = Math.random() * total;
  let accumulator = 0;
  for (const entry of expanded) {
    accumulator += entry.weight;
    if (threshold <= accumulator) {
      return entry.item;
    }
  }
  return expanded[expanded.length - 1]?.item ?? pool[0];
}

export default function App() {
  const [activeGame, setActiveGame] = useState<GameId>('cs2');
  const [mode, setMode] = useState<Mode>('random');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState<LootItem | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasRevealCompleted, setHasRevealCompleted] = useState(false);

  const currentGame = useMemo(() => games.find((game) => game.id === activeGame)!, [activeGame]);
  const itemPool = itemsByGame[activeGame];
  const selectedItem = selectedItemId ? itemPool.find((entry) => entry.id === selectedItemId) ?? null : null;

  const canTrigger = mode === 'random' || !!selectedItem;

  const handleSelectGame = useCallback(
    (gameId: GameId) => {
      if (isAnimating) return;
      setActiveGame(gameId);
      setSelectedItemId(null);
      setSearchTerm('');
      setResult(null);
      setHasRevealCompleted(false);
      setMode('random');
    },
    [isAnimating],
  );

  const handleOpen = useCallback(() => {
    if (isAnimating || !itemPool.length) return;
    const finalItem = mode === 'scripted' && selectedItem ? selectedItem : pickWeightedRandom(activeGame, itemPool);
    setResult(finalItem);
    setHasRevealCompleted(false);
    setAnimationKey((prev) => prev + 1);
    setIsAnimating(true);
  }, [activeGame, isAnimating, itemPool, mode, selectedItem]);

  const handleComplete = useCallback(() => {
    setIsAnimating(false);
    setHasRevealCompleted(true);
  }, []);

  const handleReset = useCallback(() => {
    setResult(null);
    setHasRevealCompleted(false);
    setAnimationKey((prev) => prev + 1);
  }, []);

  const handleModeChange = useCallback((nextMode: Mode) => {
    setMode(nextMode);
    if (nextMode === 'random') {
      setSelectedItemId(null);
    }
  }, []);

  const handleSelectItem = useCallback((item: LootItem) => {
    setSelectedItemId((prev) => (prev === item.id ? null : item.id));
    setMode('scripted');
  }, []);

  const contextHint = useMemo(() => {
    if (mode === 'scripted' && selectedItem) {
      return `Scripted reveal: ${selectedItem.name}`;
    }
    if (mode === 'scripted' && !selectedItem) {
      return 'Select an item from the library to script the reveal.';
    }
    return 'True random roll with in-game rarity weighting.';
  }, [mode, selectedItem]);

  return (
    <div className="app" style={{ background: currentGame.background }}>
      <div className="app__vignette" style={{ background: currentGame.vignette }} />
      <main className="app__layout">
        <header className="app__hero">
          <div>
            <span className="app__hero-eyebrow">Lootbox Animation Simulator</span>
            <h1>{currentGame.name}</h1>
            <p>
              Recreate the tension of authentic {currentGame.name} openings. Script a reward for theatrics or let the weighted RNG
              decide your fate live on stream.
            </p>
          </div>
          <GameSelector games={games} activeGame={activeGame} onChange={handleSelectGame} disabled={isAnimating} />
        </header>

        <section className="app__controls">
          <div className="mode-toggle" role="group" aria-label="Reveal mode">
            <button
              type="button"
              className={mode === 'random' ? 'mode-toggle__button mode-toggle__button--active' : 'mode-toggle__button'}
              onClick={() => handleModeChange('random')}
              disabled={isAnimating}
            >
              True Random
            </button>
            <button
              type="button"
              className={mode === 'scripted' ? 'mode-toggle__button mode-toggle__button--active' : 'mode-toggle__button'}
              onClick={() => handleModeChange('scripted')}
              disabled={isAnimating}
            >
              Scripted Reveal
            </button>
          </div>
          <span className="mode-toggle__hint">{contextHint}</span>
        </section>

        <div className="app__stage">
          <div className="app__animation">
            {activeGame === 'cs2' && (
              <CS2Roller
                key={`cs2-${animationKey}`}
                pool={itemPool}
                result={result}
                triggerKey={animationKey}
                isAnimating={isAnimating && !!result}
                onComplete={handleComplete}
              />
            )}
            {activeGame === 'pubg' && (
              <PUBGCrate
                key={`pubg-${animationKey}`}
                pool={itemPool}
                result={result}
                triggerKey={animationKey}
                isAnimating={isAnimating && !!result}
                onComplete={handleComplete}
              />
            )}
            <div className="app__actions">
              <button
                type="button"
                onClick={handleOpen}
                disabled={!canTrigger || isAnimating}
                className="app__open-button"
              >
                {isAnimating ? 'Opening...' : 'Open Lootbox'}
              </button>
              {selectedItem && mode === 'scripted' ? (
                <div className="app__selected">
                  <span>Forced item</span>
                  <strong>{selectedItem.name}</strong>
                </div>
              ) : null}
            </div>
          </div>

          <div className="app__sidebar">
            <ResultPanel
              item={result}
              game={currentGame}
              visible={hasRevealCompleted}
              onReset={handleReset}
            />
          </div>
        </div>

        <ItemLibrary
          gameId={activeGame}
          items={itemPool}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSelect={handleSelectItem}
          selectedItemId={selectedItemId}
          disabled={isAnimating}
        />
      </main>
    </div>
  );
}
