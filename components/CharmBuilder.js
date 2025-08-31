import React, { useState } from 'react';

const CATEGORIES = ['Birthstones', 'Initials', 'Animals', 'Sea & Beach'];
// (Keep your existing CHARM_OPTIONS here)

export default function CharmBuilder({ slots = 5 }) {
  const [selectedCharms, setSelectedCharms] = useState(
    Array.from({ length: slots }, () => null)
  );
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);

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
    <div className="flex flex-col items-center gap-6 p-6 bg-[#FFFAF0] text-[#8C6A4E] border rounded-lg shadow">
      {/* Step 2 heading */}
      <h2 className="text-2xl font-semibold text-center">
        Step 2: Design Your Custom Charm Jewelry
      </h2>
      <p className="text-center text-sm mb-4">
        Select a category below and click charms to add them to your jewelry.
        Click a charm on the bracelet to remove it.
      </p>

      {/* Category buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`px-3 py-2 rounded-full border transition-colors text-sm font-medium ${
              activeCategory === cat
                ? 'bg-[#B76E79] text-white border-[#B76E79]'
                : 'bg-[#FFF5F0] text-[#8C6A4E] border-[#E2C8B0] hover:bg-[#F5E2DA] hover:text-[#8C6A4E]'
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Charm slots */}
      <div className="flex justify-center mb-4">
        {selectedCharms.map((charm, idx) => (
          <div
            key={idx}
            className="w-12 h-12 m-1 flex items-center justify-center rounded-full bg-[#F5E2DA] text-[#8C6A4E] border border-[#E2C8B0] cursor-pointer"
            onClick={() => handleRemoveCharm(idx)}
          >
            {charm ? charm.label : '+'}
          </div>
        ))}
      </div>

      {/* Charm options */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {CHARM_OPTIONS[activeCategory].map((c) => (
          <button
            key={c.id}
            className="flex flex-col items-center p-2 border rounded-lg bg-white hover:bg-[#FFF5F0] text-[#8C6A4E]"
            onClick={() => handleAddCharm(c)}
          >
            <span className="text-sm">{c.label}</span>
            <span className="text-xs">${c.price.toFixed(2)}</span>
          </button>
        ))}
      </div>

      <p className="text-lg font-medium mt-4">
        Total price: ${totalPrice.toFixed(2)}
      </p>
    </div>
  );
}
