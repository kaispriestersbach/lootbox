import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useMemo, useRef, type CSSProperties } from 'react';
import { rarityThemes } from '../data/items';
import type { LootItem } from '../data/items';
import './PUBGCrate.css';

interface PUBGCrateProps {
  pool: LootItem[];
  result: LootItem | null;
  triggerKey: number;
  isAnimating: boolean;
  onComplete: () => void;
}

function createStagedItems(pool: LootItem[], seed: number): LootItem[] {
  const bag: LootItem[] = [];
  const randomPick = (index: number) => {
    if (pool.length === 0) return undefined;
    const base = Math.random();
    const offset = Math.abs(Math.sin(seed * 1.13 + index * 0.27)) % 1;
    const idx = Math.floor(((base + offset) % 1) * pool.length);
    return pool[idx];
  };
  for (let i = 0; i < 5; i += 1) {
    bag.push(randomPick(i) ?? pool[i % pool.length]);
  }
  return bag;
}

export function PUBGCrate({ pool, result, triggerKey, isAnimating, onComplete }: PUBGCrateProps) {
  const crateControls = useAnimationControls();
  const doorControls = useAnimationControls();
  const glowControls = useAnimationControls();
  const itemControls = useAnimationControls();
  const sparksControls = useAnimationControls();
  const hasCompleted = useRef(false);

  const stagedItems = useMemo(() => createStagedItems(pool, triggerKey), [pool, triggerKey]);

  useEffect(() => {
    if (!result) {
      return;
    }

    const resetStates = () => {
      crateControls.set({ y: -420, scale: 0.92 });
      doorControls.set({ rotateX: 0 });
      glowControls.set({ opacity: 0 });
      sparksControls.set({ opacity: 0 });
      itemControls.set({ opacity: 0, y: 120, scale: 0.92 });
      hasCompleted.current = false;
    };

    resetStates();

    if (!isAnimating) {
      return;
    }

    (async () => {
      await crateControls.start({
        y: [-420, 0, -20, 0],
        scale: [0.92, 1.02, 0.98, 1],
        transition: {
          duration: 2.1,
          times: [0, 0.58, 0.78, 1],
          ease: ['easeIn', 'easeOut', [0.2, 0, 0.35, 1], [0.12, 0, 0.4, 1]],
        },
      });

      glowControls.start({
        opacity: [0, 0.8, 1, 0.85],
        transition: { duration: 1.8, ease: ['linear', 'easeInOut', 'easeOut'] },
      });

      sparksControls.start({
        opacity: [0, 1, 0.3, 1],
        transition: { duration: 2.2, ease: 'easeInOut' },
      });

      await doorControls.start({
        rotateX: [0, -92],
        transition: {
          duration: 1,
          delay: 0.1,
          ease: [0.34, 0.01, 0.21, 1],
        },
      });

      await itemControls.start({
        opacity: [0, 1],
        y: [120, -20],
        scale: [0.92, 1],
        transition: {
          duration: 1.2,
          ease: [0.14, 0.38, 0.03, 0.99],
        },
      });

      if (!hasCompleted.current) {
        hasCompleted.current = true;
        onComplete();
      }
    })();
  }, [crateControls, doorControls, glowControls, sparksControls, itemControls, isAnimating, onComplete, result, triggerKey]);

  const rarity = result ? rarityThemes[result.gameId][result.rarity] : undefined;

  return (
    <div className="pubg-stage">
      <div className="pubg-stage__crane">
        <div className="pubg-stage__chains" />
      </div>
      <motion.div className="pubg-crate" animate={crateControls}>
        <motion.div className="pubg-crate__door" animate={doorControls}>
          <div className="pubg-crate__door-inner" />
        </motion.div>
        <div className="pubg-crate__body">
          <div className="pubg-crate__strap" />
          <div className="pubg-crate__strap pubg-crate__strap--right" />
          <motion.div className="pubg-crate__glow" animate={glowControls} />
            <motion.div className="pubg-crate__sparks" animate={sparksControls}>
              {stagedItems.map((item) => (
                <span key={item.id} />
              ))}
            </motion.div>
            {result && (
              <motion.div
                className={`pubg-crate__item pattern-${result.theme.pattern ?? 'pulse'}`}
                animate={itemControls}
                style={
                  {
                    '--loot-border': rarity?.border ?? 'rgba(255,255,255,0.25)',
                    '--loot-glow': rarity?.glow ?? 'rgba(255,255,255,0.2)',
                    '--loot-primary': result.theme.primary,
                    '--loot-secondary': result.theme.secondary,
                    '--loot-text': result.theme.text ?? '#f5f7ff',
                  } as CSSProperties
                }
              >
              <div className="pubg-crate__item-rarity">{result.rarity}</div>
              <div className="pubg-crate__item-name">{result.name}</div>
              <div className="pubg-crate__item-meta">{result.type}</div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
