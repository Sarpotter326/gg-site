import React, { useState } from 'react';

const CATEGORIES = ['Birthstones', 'Initials', 'Animals', 'Sea & Beach'];

const CHARM_OPTIONS = {
  Birthstones: [
    { id: 'jan', label: 'Jan', price: 10 },
    { id: 'feb', label: 'Feb', price: 10 },
    { id: 'mar', label: 'Mar', price: 10 },
    { id: 'apr', label: 'Apr', price: 10 },
    { id: 'may', label: 'May', price: 10 },
    { id: 'jun', label: 'Jun', price: 10 },
    { id: 'jul', label: 'Jul', price: 10 },
    { id: 'aug', label: 'Aug', price: 10 },
    { id: 'sep', label: 'Sep', price: 10 },
    { id: 'oct', label: 'Oct', price: 10 },
    { id: 'nov', label: 'Nov', price: 10 },
    { id: 'dec', label: 'Dec', price: 10 }
  ],
  Initials: [
    { id: 'A', label: 'A', price: 5 },
    { id: 'B', label: 'B', price: 5 },
    { id: 'C', label: 'C', price: 5 },
    // …repeat for the rest of the alphabet…
    { id: 'Z', label: 'Z', price: 5 }
  ],
  Animals: [
    { id: 'cat', label: '🐱', price: 7 },
    { id: 'dog', label: '🐶', price: 7 },
    { id: 'bunny', label: '🐰', price: 7 },
    { id: 'bird', label: '🐦', price: 7 },
    { id: 'butterfly', label: '🦋', price: 7 },
    { id: 'horse', label: '🐴', price: 7 }
  ],
  'Sea & Beach': [
    { id: 'shell', label: '🐚', price: 8 },
    { id: 'starfish', label: '⭐️', price: 8 },
    { id: 'wave', label: '🌊', price: 8 },
    { id: 'palm', label: '🌴', price: 8 },
    { id: 'fish', label: '🐟', price: 8 }
  ]
};

export default function CharmBuilder({ slots = 5 }) {
  const [selectedCharms, setSelectedCharms] = useState(
    Array.from({ length: slots }, () => null)
  );
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);

  // total price of all selected charms
  const totalPrice = selectedCharms.reduce(
    (sum, charm) => sum + (charm?.price || 0),
    0
  );

  const handleAddCharm = (charm) => {
    const index = selectedCharms.findIndex((c) => c === null);
    if (index !== -1) {
      const updated = [...selectedCharms];
      updated[index] = charm;
      setSelectedCharms(updated);
    }
  };

  const handleRemoveCharm = (idx) => {
    const updated = [...selectedCharms];
    updated[idx] = null;
    setSelectedCharms(updated);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-gradient-to-b from-[#FFE9E9] to-[#F7CAC9] text-[#8C6A4E] rounded-xl shadow-xl">
      <h2 className="text-3xl font-bold mb-2">Design Your Custom Charm</h2>
      <p className="text-center text-sm mb-2">
        Select a category below and click charms to add them to your bracelet.
        Click a charm on the bracelet to remove it.
      </p>

      {/* category buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full border transition-colors text-sm md:text-base shadow ${
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

      {/* charm slots */}
      <div className="flex justify-center mb-4">
        {selectedCharms.map((charm, idx) => (
          <div
            key={idx}
            className="relative w-16 h-16 mx-2 flex items-center justify-center rounded-full border-2 border-[#D4AF37] bg-[#FFF6F6] cursor-pointer shadow"
            onClick={() => charm && handleRemoveCharm(idx)}
            title={charm ? 'Click to remove charm' : 'Empty slot'}
          >
            {/* slot number in corner */}
            <span className="absolute -top-2 -right-2 text-xs text-[#C2185B]">
              {idx + 1}
            </span>
            {charm ? (
              <span className="text-2xl">{charm.label}</span>
            ) : (
              <span className="text-2xl text-[#C2185B]">+</span>
            )}
          </div>
        ))}
      </div>

      {/* charm palette */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 max-w-md">
        {CHARM_OPTIONS[activeCategory].map((charm) => (
          <button
            key={charm.id}
            className="p-3 flex flex-col items-center justify-center rounded-lg border-2 border-[#D4AF37] bg-[#FFF6F6] hover:bg-[#FADADD] shadow text-sm"
            onClick={() => handleAddCharm(charm)}
            title="Add charm"
          >
            <span className="text-2xl mb-1">{charm.label}</span>
            <span className="text-xs">{charm.id.toUpperCase()}</span>
            <span className="text-xs mt-1 font-medium text-[#8C6A4E]">
              ${charm.price}
            </span>
          </button>
        ))}
      </div>

      {/* total and add to bag */}
      <div className="mt-6 flex flex-col items-center">
        <span className="text-lg font-semibold">Total: ${totalPrice}</span>
        <button
          className="mt-3 px-6 py-3 rounded-full bg-[#C2185B] text-white font-medium shadow hover:bg-[#B21753] transition-colors"
          onClick={() =>
            alert(
              `You added ${
                selectedCharms.filter((c) => c).length
              } charms totaling $${totalPrice}`
            )
          }
        >
          Add to Bag
        </button>
      </div>
    </div>
  );
}
