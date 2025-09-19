# Lootbox Animation Simulator

A high-fidelity, streamer-ready lootbox opening simulator that recreates the suspense and spectacle from **Counter-Strike 2** and **PUBG: Battlegrounds**. Re-run authentic roulettes with true weighted randomness, or script a dramatic reveal pulled straight from the in-game library.

https://github.com/your-org/lootbox

## ✨ Feature Highlights

- **Authentic animations** – bespoke recreations of the CS2 weapon case roulette and PUBG survivor crate drop, tuned with easing curves that mirror the games.
- **Weighted RNG** – rarity tables mirror in-game drop rates so random runs feel believable.
- **Scripted reveals** – browse every skin in the library, pick your prize, and trigger a fake opening for streams or memes.
- **Responsive UI** – neon-glass aesthetic, library filters, and result overlays optimised for capture cards and multi-monitor setups.

## 🧱 Project Structure

```
frontend/
  ├─ src/
  │   ├─ components/       # Animation primitives and UI building blocks
  │   ├─ data/             # Game + loot table definitions
  │   ├─ App.tsx           # Main simulator shell
  │   └─ index.css         # Global theming
  ├─ public/
  ├─ package.json
  └─ vite.config.ts
```

## 🚀 Getting Started

From the repository root:

```bash
cd frontend
npm install
npm run dev
```

The dev server defaults to `http://localhost:5173`. Use the control bar to switch games, flip between random or scripted mode, and trigger openings.

### Production build

```bash
npm run build
npm run preview
```

## 🎯 Usage Tips

- **Scripted reveals** require selecting a skin from the item library while “Scripted Reveal” mode is active.
- **Reset** the stage after a reveal via the button in the result panel — handy for tight broadcast loops.
- **Extend the library** by editing `src/data/items.ts`. Every entry controls colour themes, rarity weighting, and descriptive copy.

## ⚠️ Disclaimer

This simulator is unaffiliated with Valve, Krafton, or any official publishers. It is provided for educational and entertainment purposes only.
