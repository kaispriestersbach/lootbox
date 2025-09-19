import type { GameDefinition, GameId } from '../data/items';
import './GameSelector.css';

interface GameSelectorProps {
  games: GameDefinition[];
  activeGame: GameId;
  disabled?: boolean;
  onChange: (gameId: GameId) => void;
}

export function GameSelector({ games, activeGame, onChange, disabled }: GameSelectorProps) {
  return (
    <div className="game-selector">
      {games.map((game) => {
        const isActive = game.id === activeGame;
        return (
          <button
            key={game.id}
            className={`game-chip ${isActive ? 'game-chip--active' : ''}`}
            onClick={() => onChange(game.id)}
            disabled={disabled}
            type="button"
          >
            <span className="game-chip__name">{game.name}</span>
            <span className="game-chip__tagline">{game.tagline}</span>
          </button>
        );
      })}
    </div>
  );
}
