import React, { useState } from 'react';

// Define your categories
const CATEGORIES = ['Birthstones', 'Initials', 'Animals', 'Sea & Beach'];

// Define available charms for each category
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
    { id: 'D', label: 'D', price: 5 },
    { id: 'E', label: 'E', price: 5 },
    // ... repeat for the full alphabet ...
    { id: 'Z', label: 'Z', price: 5 }
  ],
  Animals: [
    { id: 'cat', label: 'Cat', price: 7 },
    { id: 'dog', label: 'Dog', price: 7 },
    { id: 'bunny', label: 'Bunny', price: 7 },
    { id: 'bird', label: 'Bird', price: 7 },
    { id: 'butterfly', label: 'Butterfly', price: 7 },
    { id: 'horse', label: 'Horse', price: 7 }
  ],
  'Sea & Beach': [
    { id: 'shell', label: 'Shell', price: 8 },
    { id: 'starfish', label: 'Starfish', price: 8 },
    { id: 'anchor', label: 'Anchor', price: 8 },
    { id: 'wave', label: 'Wave', price: 8 },
    { id: 'palm', label: 'Palm', price: 8 },
    { id: 'fish', label: 'Fish', price: 8 }
  ]
};

export default function CharmBuilder({ slots = 5 }) {
  const [selectedCharms, setSelectedCharms] = useState(
    Array.from({ length: slots }, () => null)
  );
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);

  // Calculate the total price of all selected charms
  const totalPrice = selectedCharms.reduce(
    (sum, charm) => sum + (charm?.price || 0),
    0
  );

  // Add a charm to the next available slot
  const handleAddCharm = (charm) => {
    const index = selectedCharms.findIndex((c) => c === null);
    if (index !== -1) {
      const updated = [...selectedCharms];
      updated[index] = charm;
      setSelectedCharms(updated);
    }
  };

  // Remove a charm from a slot
  const handleRemoveCharm = (idx) => {
    const updated = [...selectedCharms];
    updated[idx] = null;
    setSelectedCharms(updated);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-[#FFFAF0] text-[#8C6A4E] border rounded-lg shadow">
      <h2 className="text-3xl font-semibold text-center">
        Design Your Custom Charm
      </h2>
      <p className="text-center text-sm mb-4">
        Select a category below and click charms to add them to your bracelet.
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
