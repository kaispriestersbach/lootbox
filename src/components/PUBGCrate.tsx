import React from "react";

type PUBGCrateItem = {
  id: string | number;
  name: string;
  rarity: string;
  imageUrl: string;
};

type PUBGCrateProps = {
  stagedItems: PUBGCrateItem[];
};

export const PUBGCrate: React.FC<PUBGCrateProps> = ({ stagedItems }) => {
  if (!stagedItems?.length) {
    return null;
  }

  return (
    <div className="pubg-crate">
      <div className="pubg-crate__spark-columns" aria-hidden>
        {stagedItems.map((item, index) => (
          <span
            key={`${item.id}-${index}`}
            className="pubg-crate__spark-column"
            data-lane-index={index}
          />
        ))}
      </div>
      <ol className="pubg-crate__items">
        {stagedItems.map((item) => (
          <li key={item.id} className={`pubg-crate__item pubg-crate__item--${item.rarity}`}>
            <img src={item.imageUrl} alt={item.name} />
            <span className="pubg-crate__item-name">{item.name}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default PUBGCrate;
