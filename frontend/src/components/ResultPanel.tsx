import { AnimatePresence, motion } from 'framer-motion';
import { type CSSProperties } from 'react';
import { rarityThemes } from '../data/items';
import type { GameDefinition, LootItem } from '../data/items';
import './ResultPanel.css';

interface ResultPanelProps {
  item: LootItem | null;
  game: GameDefinition;
  visible: boolean;
  onReset: () => void;
}

export function ResultPanel({ item, game, visible, onReset }: ResultPanelProps) {
  const rarity = item ? rarityThemes[item.gameId][item.rarity] : undefined;

  return (
    <AnimatePresence>
      {visible && item ? (
        <motion.aside
          className="result-panel"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          style={
            {
              '--result-accent': game.accent,
              '--result-highlight': rarity?.glow ?? 'rgba(255,255,255,0.25)',
              '--result-border': rarity?.border ?? 'rgba(255,255,255,0.4)',
              '--result-primary': item.theme.primary,
              '--result-secondary': item.theme.secondary,
              '--result-text': item.theme.text ?? '#f5f5f5',
            } as CSSProperties
          }
        >
          <header>
            <span className="result-panel__eyebrow">{game.name}</span>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </header>
          <div className={`result-panel__card pattern-${item.theme.pattern ?? 'pulse'}`}>
            <div className="result-panel__rarity">{item.rarity}</div>
            <div className="result-panel__type">{item.type}</div>
            <div className="result-panel__collection">{item.collection}</div>
          </div>
          <footer>
            <button type="button" onClick={onReset}>
              Reset for next opening
            </button>
          </footer>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
