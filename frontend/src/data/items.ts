export type GameId = 'cs2' | 'pubg';

export interface GameDefinition {
  id: GameId;
  name: string;
  tagline: string;
  accent: string;
  background: string;
  highlight: string;
  vignette: string;
}

export interface LootItem {
  id: string;
  gameId: GameId;
  name: string;
  rarity: string;
  type: string;
  collection: string;
  description: string;
  preview: string;
  weight: number;
  theme: {
    primary: string;
    secondary: string;
    pattern?: 'stripes' | 'grid' | 'pulse' | 'spark' | 'carbon' | 'plasma';
    text?: string;
  };
}

export const games: GameDefinition[] = [
  {
    id: 'cs2',
    name: 'Counter-Strike 2',
    tagline: 'Premium Weapon Case Animation',
    accent: '#ffb347',
    background:
      'radial-gradient(circle at 50% 0%, rgba(255, 187, 85, 0.28), rgba(13, 18, 33, 0.85) 45%, rgba(4, 6, 12, 0.96) 100%)',
    highlight:
      'linear-gradient(180deg, rgba(255, 215, 141, 0.28) 0%, rgba(255, 215, 141, 0.6) 50%, rgba(255, 215, 141, 0.08) 100%)',
    vignette:
      'linear-gradient(90deg, rgba(4, 6, 12, 0.98) 0%, rgba(4, 6, 12, 0) 30%, rgba(4, 6, 12, 0) 70%, rgba(4, 6, 12, 0.98) 100%)',
  },
  {
    id: 'pubg',
    name: 'PUBG Battlegrounds',
    tagline: 'Survivor Crate Reveal Sequence',
    accent: '#f5d15c',
    background:
      'radial-gradient(circle at 50% 20%, rgba(245, 209, 92, 0.25), rgba(16, 18, 9, 0.92) 50%, rgba(4, 5, 2, 0.98) 100%)',
    highlight:
      'linear-gradient(180deg, rgba(255, 240, 191, 0.7) 0%, rgba(94, 66, 10, 0.9) 50%, rgba(28, 18, 0, 0.7) 100%)',
    vignette:
      'linear-gradient(90deg, rgba(9, 6, 0, 0.95) 0%, rgba(9, 6, 0, 0.35) 40%, rgba(9, 6, 0, 0.35) 60%, rgba(9, 6, 0, 0.95) 100%)',
  },
];

export const rarityThemes: Record<
  GameId,
  Record<
    string,
    {
      label: string;
      border: string;
      glow: string;
      weight: number;
    }
  >
> = {
  cs2: {
    'Consumer Grade': {
      label: 'Consumer Grade (Common)',
      border: '#b0c4d6',
      glow: 'rgba(129, 161, 193, 0.35)',
      weight: 38,
    },
    'Industrial Grade': {
      label: 'Industrial Grade',
      border: '#a9d1f7',
      glow: 'rgba(109, 183, 255, 0.45)',
      weight: 26,
    },
    'Mil-Spec': {
      label: 'Mil-Spec',
      border: '#4f6cff',
      glow: 'rgba(79, 108, 255, 0.55)',
      weight: 16,
    },
    Restricted: {
      label: 'Restricted',
      border: '#8846ff',
      glow: 'rgba(136, 70, 255, 0.6)',
      weight: 10,
    },
    Classified: {
      label: 'Classified',
      border: '#ef3bff',
      glow: 'rgba(239, 59, 255, 0.65)',
      weight: 6,
    },
    Covert: {
      label: 'Covert',
      border: '#ff5733',
      glow: 'rgba(255, 87, 51, 0.7)',
      weight: 3,
    },
    'Exceedingly Rare': {
      label: 'Exceedingly Rare (Special Item)',
      border: '#fdd663',
      glow: 'rgba(253, 214, 99, 0.85)',
      weight: 1,
    },
  },
  pubg: {
    Common: {
      label: 'Common',
      border: '#8f8f8f',
      glow: 'rgba(143, 143, 143, 0.35)',
      weight: 40,
    },
    Special: {
      label: 'Special',
      border: '#3f73ff',
      glow: 'rgba(63, 115, 255, 0.45)',
      weight: 22,
    },
    Rare: {
      label: 'Rare',
      border: '#6f3fff',
      glow: 'rgba(111, 63, 255, 0.55)',
      weight: 15,
    },
    Epic: {
      label: 'Epic',
      border: '#b53fff',
      glow: 'rgba(181, 63, 255, 0.6)',
      weight: 11,
    },
    Legendary: {
      label: 'Legendary',
      border: '#f56f3d',
      glow: 'rgba(245, 111, 61, 0.65)',
      weight: 8,
    },
    Mythic: {
      label: 'Mythic',
      border: '#ffd45a',
      glow: 'rgba(255, 212, 90, 0.85)',
      weight: 4,
    },
  },
};

const cs2Items: LootItem[] = [
  {
    id: 'cs2-ak-asiimov',
    gameId: 'cs2',
    name: 'AK-47 | Asiimov',
    rarity: 'Covert',
    type: 'Rifle Skin',
    collection: 'Prisma 2 Case',
    description: 'Cutting-edge polymer shrouding wrapped in orange, black and white energy panels.',
    preview: 'AK-47 rifle with white sci-fi plating and orange power cores.',
    weight: 1,
    theme: {
      primary: '#f3622d',
      secondary: '#1a1e28',
      pattern: 'plasma',
      text: '#ffffff',
    },
  },
  {
    id: 'cs2-m4-printstream',
    gameId: 'cs2',
    name: 'M4A1-S | Printstream',
    rarity: 'Covert',
    type: 'Rifle Skin',
    collection: 'Operation Broken Fang Case',
    description: 'Pearlescent black polymer with an iridescent pearl ink and subtle HALFTONE overlays.',
    preview: 'Monochromatic M4A1-S with iridescent accents and typography.',
    weight: 1,
    theme: {
      primary: '#f0f0f0',
      secondary: '#111216',
      pattern: 'grid',
      text: '#0a0a0a',
    },
  },
  {
    id: 'cs2-knife-karambit',
    gameId: 'cs2',
    name: '★ Karambit | Doppler (Phase 4)',
    rarity: 'Exceedingly Rare',
    type: 'Knife',
    collection: 'Operation Breakout Weapon Case',
    description: 'Chromed talon blade swirling with cosmic blue and violet Doppler hues.',
    preview: 'Karambit knife blade shimmering with sapphire and amethyst finish.',
    weight: 1,
    theme: {
      primary: '#4f8cff',
      secondary: '#9a5dff',
      pattern: 'spark',
      text: '#ffffff',
    },
  },
  {
    id: 'cs2-awp-dragon',
    gameId: 'cs2',
    name: 'AWP | Dragon Lore',
    rarity: 'Covert',
    type: 'Sniper Skin',
    collection: 'Cobblestone Collection',
    description: 'An ancient dragon unfurls along a royal gold and green body.',
    preview: 'AWP with ornate golden dragon breathing fire across the stock.',
    weight: 1,
    theme: {
      primary: '#bf9b30',
      secondary: '#3c4820',
      pattern: 'pulse',
      text: '#1f1503',
    },
  },
  {
    id: 'cs2-deagle-code',
    gameId: 'cs2',
    name: 'Desert Eagle | Code Red',
    rarity: 'Covert',
    type: 'Pistol Skin',
    collection: 'Danger Zone Case',
    description: 'Red and white paneling with translucent polymer windows and warning glyphs.',
    preview: 'Desert Eagle with red tactical shell and carbon accents.',
    weight: 2,
    theme: {
      primary: '#f53939',
      secondary: '#10131f',
      pattern: 'carbon',
      text: '#ffffff',
    },
  },
  {
    id: 'cs2-mp9-bioleak',
    gameId: 'cs2',
    name: 'MP9 | Bioleak',
    rarity: 'Mil-Spec',
    type: 'SMG Skin',
    collection: 'Recoil Case',
    description: 'Toxic green hazard stripes glow beneath translucent polymer plating.',
    preview: 'Compact SMG soaked in neon green hazard ooze.',
    weight: 12,
    theme: {
      primary: '#5bff84',
      secondary: '#0b1e11',
      pattern: 'stripes',
      text: '#021006',
    },
  },
  {
    id: 'cs2-usp-blueprint',
    gameId: 'cs2',
    name: 'USP-S | Blueprint',
    rarity: 'Restricted',
    type: 'Pistol Skin',
    collection: 'Spectrum 2 Case',
    description: 'Deep cobalt base layered with technical blueprint callouts and outlines.',
    preview: 'Blueprint themed USP-S with technical drawings and white ink.',
    weight: 6,
    theme: {
      primary: '#1040ff',
      secondary: '#0c1129',
      pattern: 'grid',
      text: '#cfd9ff',
    },
  },
  {
    id: 'cs2-ak-nightwish',
    gameId: 'cs2',
    name: 'AK-47 | Nightwish',
    rarity: 'Classified',
    type: 'Rifle Skin',
    collection: 'Dreams & Nightmares Case',
    description: 'UV reactive neon beast erupts across the receiver with psychedelic highlights.',
    preview: 'AK-47 with neon neon creature and glowing purple bones.',
    weight: 4,
    theme: {
      primary: '#7a5bff',
      secondary: '#23d7f7',
      pattern: 'plasma',
      text: '#0a0118',
    },
  },
  {
    id: 'cs2-famas-rapid',
    gameId: 'cs2',
    name: 'FAMAS | Rapid Eye Movement',
    rarity: 'Restricted',
    type: 'Rifle Skin',
    collection: 'Dreams & Nightmares Case',
    description: 'Hypnotic vector art swirling with neon eyes and neon gradients.',
    preview: 'FAMAS covered in psychedelic spirals and neon stare.',
    weight: 7,
    theme: {
      primary: '#ff4f9b',
      secondary: '#2d2c8d',
      pattern: 'pulse',
      text: '#ffffff',
    },
  },
  {
    id: 'cs2-mag7-justice',
    gameId: 'cs2',
    name: 'MAG-7 | Justice',
    rarity: 'Classified',
    type: 'Shotgun Skin',
    collection: 'Prisma Case',
    description: 'Comic styled blindfolded statue wielding lightning and cosmic rays.',
    preview: 'Shotgun with dramatic comic art and radiant yellow flare.',
    weight: 5,
    theme: {
      primary: '#ffdd3c',
      secondary: '#2d3192',
      pattern: 'spark',
      text: '#1f224a',
    },
  },
  {
    id: 'cs2-p250-see-ya',
    gameId: 'cs2',
    name: 'P250 | See Ya Later',
    rarity: 'Restricted',
    type: 'Pistol Skin',
    collection: 'Spectrum 2 Case',
    description: 'Cartoon gator slashing across aqua panels with riveted plating.',
    preview: 'Playful teal pistol with cartoon reptile art.',
    weight: 9,
    theme: {
      primary: '#00c7b7',
      secondary: '#0a3b41',
      pattern: 'stripes',
      text: '#ffffff',
    },
  },
  {
    id: 'cs2-sg-cyrex',
    gameId: 'cs2',
    name: 'SG 553 | Cyrex',
    rarity: 'Restricted',
    type: 'Rifle Skin',
    collection: 'Falchion Case',
    description: 'Tactical tri-tone layering with red hazard stripes and carbon fiber plating.',
    preview: 'Black, white, and red SG 553 with aggressive geometry.',
    weight: 8,
    theme: {
      primary: '#ff4747',
      secondary: '#111418',
      pattern: 'carbon',
      text: '#f5f5f5',
    },
  },
  {
    id: 'cs2-glock-water',
    gameId: 'cs2',
    name: 'Glock-18 | Water Elemental',
    rarity: 'Classified',
    type: 'Pistol Skin',
    collection: 'Operation Breakout Weapon Case',
    description: 'Crashing turquoise waves forming a mythic creature with coral red undertones.',
    preview: 'Glock swirling with water spirit in blues and reds.',
    weight: 6,
    theme: {
      primary: '#28c3ff',
      secondary: '#ff5a64',
      pattern: 'pulse',
      text: '#0e1126',
    },
  },
];

const pubgItems: LootItem[] = [
  {
    id: 'pubg-awm-glacier',
    gameId: 'pubg',
    name: 'AWM | Glacier',
    rarity: 'Mythic',
    type: 'Sniper Finish',
    collection: 'Survivor Pass Crate',
    description: 'Ice-crusted finish with reactive frost bloom and pale glow.',
    preview: 'Sniper rifle encapsulated in translucent glacier ice.',
    weight: 1,
    theme: {
      primary: '#94d7ff',
      secondary: '#1f2f45',
      pattern: 'plasma',
      text: '#041120',
    },
  },
  {
    id: 'pubg-m416-glacier',
    gameId: 'pubg',
    name: 'M416 | Glacier',
    rarity: 'Legendary',
    type: 'Rifle Finish',
    collection: 'Contraband Crate',
    description: 'Translucent ice plates with embedded frost veins and reactive shine.',
    preview: 'M416 drenched in glassy blue ice and snow.',
    weight: 2,
    theme: {
      primary: '#7fc4ff',
      secondary: '#16273d',
      pattern: 'spark',
      text: '#051524',
    },
  },
  {
    id: 'pubg-pan-labs',
    gameId: 'pubg',
    name: 'BattleStat Pan | Labs',
    rarity: 'Epic',
    type: 'Melee Skin',
    collection: 'Laboratory Crate',
    description: 'Reinforced experimental alloy with neon yellow hazard mesh.',
    preview: 'Pan glowing with lab hazard mesh and counters.',
    weight: 4,
    theme: {
      primary: '#f5d15c',
      secondary: '#10131f',
      pattern: 'grid',
      text: '#211a00',
    },
  },
  {
    id: 'pubg-helmet-lv3',
    gameId: 'pubg',
    name: 'Helm Lv.3 | Glory',
    rarity: 'Epic',
    type: 'Headgear',
    collection: 'Survivor Crate',
    description: 'Carbon titan shell with golden trims and reactive lights.',
    preview: 'Iconic level 3 helmet with gold banding and battle marks.',
    weight: 5,
    theme: {
      primary: '#ffd76b',
      secondary: '#1c1c1c',
      pattern: 'carbon',
      text: '#241500',
    },
  },
  {
    id: 'pubg-ghillie-bloom',
    gameId: 'pubg',
    name: 'Ghillie Suit | Bloom',
    rarity: 'Legendary',
    type: 'Full Outfit',
    collection: 'Field Gear Crate',
    description: 'Adaptive flora mesh shifting between mossy greens and seasonal petals.',
    preview: 'Ghillie suit layered with flowering moss and leaves.',
    weight: 3,
    theme: {
      primary: '#6fa362',
      secondary: '#2c3b1f',
      pattern: 'pulse',
      text: '#0d1507',
    },
  },
  {
    id: 'pubg-m249-biorisk',
    gameId: 'pubg',
    name: 'M249 | BioRisk',
    rarity: 'Rare',
    type: 'LMG Finish',
    collection: 'Hazmat Crate',
    description: 'Industrial yellow hazard plating with warning glyphs and carbon underframe.',
    preview: 'M249 layered with hazard yellow plates and black carbon fiber.',
    weight: 8,
    theme: {
      primary: '#ffc748',
      secondary: '#101010',
      pattern: 'stripes',
      text: '#1d1200',
    },
  },
  {
    id: 'pubg-sks-rose',
    gameId: 'pubg',
    name: 'SKS | Rosebound',
    rarity: 'Rare',
    type: 'DMR Finish',
    collection: 'Valentine Crate',
    description: 'Polished crimson receiver entwined with metallic roses.',
    preview: 'SKS trimmed with crimson petals and brass highlights.',
    weight: 9,
    theme: {
      primary: '#ce445d',
      secondary: '#341018',
      pattern: 'pulse',
      text: '#ffe2e8',
    },
  },
  {
    id: 'pubg-vector-quantum',
    gameId: 'pubg',
    name: 'Vector | Quantum Storm',
    rarity: 'Special',
    type: 'SMG Finish',
    collection: 'Futuristic Crate',
    description: 'Electric cyan conduits dancing across matte midnight chassis.',
    preview: 'Vector SMG charged with electric cyan conduits.',
    weight: 12,
    theme: {
      primary: '#42efff',
      secondary: '#00141c',
      pattern: 'plasma',
      text: '#01161c',
    },
  },
  {
    id: 'pubg-car98-ember',
    gameId: 'pubg',
    name: 'Kar98k | Ember Rise',
    rarity: 'Epic',
    type: 'Sniper Finish',
    collection: 'Survivor Pass',
    description: 'Charred wood body glowing with molten ember veins.',
    preview: 'Kar98k rifle with burning embers set into the stock.',
    weight: 6,
    theme: {
      primary: '#f05f2a',
      secondary: '#1a0904',
      pattern: 'spark',
      text: '#2b0b00',
    },
  },
  {
    id: 'pubg-scar-l-urban',
    gameId: 'pubg',
    name: 'SCAR-L | Urban Hunter',
    rarity: 'Special',
    type: 'Rifle Finish',
    collection: 'Urban Ops Crate',
    description: 'Digital charcoal camo with reactive neon orange piping.',
    preview: 'SCAR-L rifle with urban greys and neon edges.',
    weight: 13,
    theme: {
      primary: '#2c343b',
      secondary: '#ff7b3b',
      pattern: 'carbon',
      text: '#f2f2f2',
    },
  },
  {
    id: 'pubg-ump-safari',
    gameId: 'pubg',
    name: 'UMP45 | Safari Bronze',
    rarity: 'Special',
    type: 'SMG Finish',
    collection: 'Explorer Crate',
    description: 'Polished bronze plating with etched topography and leather strap details.',
    preview: 'UMP45 blending warm bronze with weathered leather.',
    weight: 14,
    theme: {
      primary: '#c1873c',
      secondary: '#2b1907',
      pattern: 'grid',
      text: '#331c00',
    },
  },
  {
    id: 'pubg-level3-backpack',
    gameId: 'pubg',
    name: 'Backpack Lv.3 | Survivalist',
    rarity: 'Rare',
    type: 'Backpack',
    collection: 'Supply Crate',
    description: 'Reinforced fabric pack with luminous trims and tactical cords.',
    preview: 'Level 3 backpack with luminous piping and modular attachments.',
    weight: 10,
    theme: {
      primary: '#3a4b3a',
      secondary: '#0d1309',
      pattern: 'grid',
      text: '#d0f5d2',
    },
  },
  {
    id: 'pubg-vss-nebula',
    gameId: 'pubg',
    name: 'VSS | Nebula Hunter',
    rarity: 'Rare',
    type: 'DMR Finish',
    collection: 'Galactic Crate',
    description: 'Space-tinted receiver swirling with purple nebula dust.',
    preview: 'VSS rifle glowing with purple and blue nebula clouds.',
    weight: 8,
    theme: {
      primary: '#5c4bff',
      secondary: '#100626',
      pattern: 'plasma',
      text: '#b4aaff',
    },
  },
];

export const itemsByGame: Record<GameId, LootItem[]> = {
  cs2: cs2Items,
  pubg: pubgItems,
};

export const getRarityWeight = (gameId: GameId, rarity: string): number => {
  const rarityTheme = rarityThemes[gameId][rarity];
  return rarityTheme?.weight ?? 1;
};
