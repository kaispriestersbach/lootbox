import { type CSSProperties, type ChangeEvent } from 'react';
import { rarityThemes } from '../data/items';
import type { GameId, LootItem } from '../data/items';
import './ItemLibrary.css';

interface ItemLibraryProps {
  gameId: GameId;
  items: LootItem[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSelect: (item: LootItem) => void;
  selectedItemId: string | null;
  disabled?: boolean;
}

export function ItemLibrary({
  gameId,
  items,
  searchTerm,
  onSearchChange,
  onSelect,
  selectedItemId,
  disabled,
}: ItemLibraryProps) {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  const filtered = items.filter((item) => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return true;
    return (
      item.name.toLowerCase().includes(query) ||
      item.collection.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query)
    );
  });

  return (
    <section className="library-panel">
      <div className="library-panel__header">
        <div>
          <h2>Item Library</h2>
          <p>Select an item to script the reveal or browse what is available in the crate.</p>
        </div>
        <div className="library-panel__search">
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search skins, crates, collections..."
            disabled={disabled}
          />
        </div>
      </div>

      <div className="library-grid">
        {filtered.length > 0 ? (
          filtered.map((item) => {
            const rarity = rarityThemes[gameId][item.rarity];
            const isActive = item.id === selectedItemId;
            return (
              <button
                key={item.id}
                type="button"
                className={`library-card ${isActive ? 'library-card--active' : ''}`}
                onClick={() => onSelect(item)}
                disabled={disabled}
                style={
                  {
                    '--library-border': rarity?.border ?? 'rgba(255,255,255,0.2)',
                    '--library-glow': rarity?.glow ?? 'rgba(255,255,255,0.12)',
                    '--library-primary': item.theme.primary,
                    '--library-secondary': item.theme.secondary,
                    '--library-text': item.theme.text ?? '#f5f7ff',
                  } as CSSProperties
                }
              >
                <div className={`library-card__preview pattern-${item.theme.pattern ?? 'stripes'}`}>
                  <div className="library-card__rarity">{item.rarity}</div>
                  <span className="library-card__name">{item.name}</span>
                </div>
                <div className="library-card__meta">
                  <span>{item.type}</span>
                  <span>{item.collection}</span>
                </div>
              </button>
            );
          })
        ) : (
          <div className="library-empty">No items match your search.</div>
        )}
      </div>
    </section>
  );
}
