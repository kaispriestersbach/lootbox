import { useAnimationControls, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, type CSSProperties } from 'react';
import { rarityThemes } from '../data/items';
import type { LootItem } from '../data/items';
import './CS2Roller.css';

const CARD_WIDTH = 220;
const CARD_GAP = 18;
const PRE_ITEMS = 22;
const POST_ITEMS = 6;
const HIGHLIGHT_INDEX = 3;

interface CS2RollerProps {
  pool: LootItem[];
  result: LootItem | null;
  triggerKey: number;
  isAnimating: boolean;
  onComplete: () => void;
}

interface SpoolEntry {
  item: LootItem;
  id: string;
  isResult?: boolean;
}

function createSpool(
  pool: LootItem[],
  result: LootItem | null,
  seed: number,
): { entries: SpoolEntry[]; targetIndex: number } {
  if (!result) {
    return { entries: [], targetIndex: 0 };
  }

  const entries: SpoolEntry[] = [];
  const pickRandom = (index: number) => {
    if (pool.length === 0) return result;
    const base = Math.random();
    const offset = Math.abs(Math.sin(seed * 0.73 + index * 0.417)) % 1;
    const idx = Math.floor(((base + offset) % 1) * pool.length);
    return pool[idx] ?? result;
  };

  for (let i = 0; i < PRE_ITEMS; i += 1) {
    const candidate = pickRandom(i);
    entries.push({ item: candidate, id: `${candidate.id}-pre-${i}` });
  }

  const targetIndex = entries.length;
  entries.push({ item: result, id: `${result.id}-result`, isResult: true });

  for (let i = 0; i < POST_ITEMS; i += 1) {
    const candidate = pickRandom(PRE_ITEMS + i + 1);
    entries.push({ item: candidate, id: `${candidate.id}-post-${i}` });
  }

  return { entries, targetIndex };
}

export function CS2Roller({ pool, result, triggerKey, isAnimating, onComplete }: CS2RollerProps) {
  const controls = useAnimationControls();
  const hasCompleted = useRef(false);

  const { entries, targetIndex } = useMemo(
    () => createSpool(pool, result, triggerKey),
    [pool, result, triggerKey],
  );

  useEffect(() => {
    if (!result || entries.length === 0) {
      return;
    }

    hasCompleted.current = false;
    const targetOffset = Math.max(targetIndex - HIGHLIGHT_INDEX, 0) * (CARD_WIDTH + CARD_GAP);

    if (!isAnimating) {
      controls.stop();
      controls.set({ x: 0 });
      return;
    }

    controls.set({ x: 0 });

    controls
      .start({
        x: [0, -targetOffset * 0.55, -targetOffset * 0.85, -targetOffset * 0.95, -targetOffset],
        transition: {
          duration: 6.6,
          times: [0, 0.45, 0.72, 0.9, 1],
          ease: ['easeOut', 'easeInOut', [0.42, 0, 0.25, 1], [0.22, 0.03, 0.17, 1], [0.23, 1, 0.32, 1]],
        },
      })
      .then(() => {
        if (!hasCompleted.current) {
          hasCompleted.current = true;
          onComplete();
        }
      });
  }, [controls, entries, isAnimating, onComplete, result, targetIndex]);

  return (
    <div className="cs2-roller">
      <div className="cs2-roller__track" data-active={isAnimating}>
        <motion.div
          className="cs2-roller__spool"
          animate={controls}
          style={{
            gap: `${CARD_GAP}px`,
          }}
        >
          {entries.map((entry) => {
            const rarity = rarityThemes[entry.item.gameId][entry.item.rarity];
            return (
              <div
                key={entry.id}
                className={`cs2-roller__card pattern-${entry.item.theme.pattern ?? 'stripes'} ${
                  entry.isResult ? 'cs2-roller__card--result' : ''
                }`}
                style={
                  {
                    '--card-border': rarity?.border ?? 'rgba(255,255,255,0.18)',
                    '--card-glow': rarity?.glow ?? 'rgba(255,255,255,0.08)',
                    '--card-primary': entry.item.theme.primary,
                    '--card-secondary': entry.item.theme.secondary,
                    '--card-text': entry.item.theme.text ?? '#f6f8ff',
                  } as CSSProperties
                }
              >
                <div className="cs2-roller__card-rarity">{entry.item.rarity}</div>
                <div className="cs2-roller__card-name">{entry.item.name}</div>
                <div className="cs2-roller__card-meta">{entry.item.type}</div>
              </div>
            );
          })}
        </motion.div>
        <div className="cs2-roller__highlight" />
        <div className="cs2-roller__pointer">
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
