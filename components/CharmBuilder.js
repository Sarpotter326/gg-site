import React, { useState } from 'react';

/*
 * CharmBuilder
 *
 * This component renders an interactive charm‑building bar.  It accepts a
 * `slots` prop that determines the number of positions available on the
 * bracelet or necklace.  Users can select from a palette of charms
 * organised by category and add them to the bar.  Selected charms can
 * be removed by clicking on them.  The palette shows only charms from
 * the currently selected category to keep the interface uncluttered.
 */

const CATEGORIES = ['Birthstones', 'Initials', 'Animals', 'Sea & Beach'];

// A simple data set of placeholder charms.  In a production system these
// would be replaced with actual images or icons.  Each object has an
// `id` and a `label`.  Emojis are used for Animals and Sea categories to
// give a sense of the theme without sourcing external assets.
const CHARM_OPTIONS = {
  Birthstones: [
    { id: 'jan', label: 'Jan' },
    { id: 'feb', label: 'Feb' },
    { id: 'mar', label: 'Mar' },
    { id: 'apr', label: 'Apr' },
    { id: 'may', label: 'May' },
    { id: 'jun', label: 'Jun' },
    { id: 'jul', label: 'Jul' },
    { id: 'aug', label: 'Aug' },
    { id: 'sep', label: 'Sep' },
    { id: 'oct', label: 'Oct' },
    { id: 'nov', label: 'Nov' },
    { id: 'dec', label: 'Dec' }
  ],
  Initials: [
    { id: 'A', label: 'A' },
    { id: 'B', label: 'B' },
    { id: 'C', label: 'C' },
    { id: 'D', label: 'D' },
    { id: 'E', label: 'E' },
    { id: 'F', label: 'F' },
    { id: 'G', label: 'G' },
    { id: 'H', label: 'H' },
    { id: 'I', label: 'I' },
    { id: 'J', label: 'J' },
    { id: 'K', label: 'K' },
    { id: 'L', label: 'L' },
    { id: 'M', label: 'M' },
    { id: 'N', label: 'N' },
    { id: 'O', label: 'O' },
    { id: 'P', label: 'P' },
    { id: 'Q', label: 'Q' },
    { id: 'R', label: 'R' },
    { id: 'S', label: 'S' },
    { id: 'T', label: 'T' },
    { id: 'U', label: 'U' },
    { id: 'V', label: 'V' },
    { id: 'W', label: 'W' },
    { id: 'X', label: 'X' },
    { id: 'Y', label: 'Y' },
    { id: 'Z', label: 'Z' }
  ],
  Animals: [
    { id: 'cat', label: '🐱' },
    { id: 'dog', label: '🐶' },
    { id: 'bunny', label: '🐰' },
    { id: 'bird', label: '🐦' },
    { id: 'butterfly', label: '🦋' },
    { id: 'horse', label: '🐴' }
  ],
  'Sea & Beach': [
    { id: 'shell', label: '🐚' },
    { id: 'starfish', label: '⭐️' },
    { id: 'wave', label: '🌊' },
    { id: 'palm', label: '🌴' },
    { id: 'fish', label: '🐟' }
  ]
};

export default function CharmBuilder({ slots = 5 }) {
  // State to track which charms are placed in each slot.  Null represents
  // an empty position on the chain.
  const [selectedCharms, setSelectedCharms] = useState(
    Array.from({ length: slots }, () => null)
  );
  // Track the current category filter for the palette.
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);

  // Add a charm to the first available empty slot.
  const handleAddCharm = (charm) => {
    const index = selectedCharms.findIndex((c) => c === null);
    if (index !== -1) {
      const updated = [...selectedCharms];
      updated[index] = charm;
      setSelectedCharms(updated);
    }
  };

  // Remove a charm at a given slot by setting it back to null.
  const handleRemoveCharm = (idx) => {
    const updated = [...selectedCharms];
    updated[idx] = null;
    setSelectedCharms(updated);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-[#F7CAC9] text-[#8C6A4E] rounded-lg shadow">
      <h2 className="text-2xl font-semibold">Build Your Custom Charm Piece</h2>

      {/* Category Selector */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`px-3 py-1 rounded-full border transition-colors text-sm ${
              activeCategory === cat
                ? 'bg-[#C2185B] text-white border-[#C2185B]'
                : 'bg-white text-[#8C6A4E] border-[#D4AF37] hover:bg-[#F5F5F5]'
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Charm Slots */}
      <div className="flex justify-center mb-4">
        {selectedCharms.map((charm, idx) => (
          <div
            key={idx}
            className="w-12 h-12 mx-1 flex items-center justify-center rounded-full border border-[#D4AF37] bg-white cursor-pointer"
            onClick={() => charm && handleRemoveCharm(idx)}
            title={charm ? 'Click to remove charm' : 'Empty slot'}
          >
            {charm ? (
              <span className="text-xl">{charm.label}</span>
            ) : (
              <span className="text-gray-400">+</span>
            )}
          </div>
        ))}
      </div>

      {/* Charm Palette */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-w-md">
        {CHARM_OPTIONS[activeCategory].map((charm) => (
          <button
            key={charm.id}
            className="p-2 flex flex-col items-center justify-center rounded-md border border-[#D4AF37] bg-white hover:bg-[#F5F5F5] text-sm"
            onClick={() => handleAddCharm(charm)}
            title="Add charm"
          >
            <span className="text-2xl mb-1">{charm.label}</span>
            <span>{charm.id.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
