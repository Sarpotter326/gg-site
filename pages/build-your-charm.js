import React, { useState } from 'react';
import CharmBuilder from '../components/CharmBuilder';

export default function BuildYourCharm() {
  const [slotCount, setSlotCount] = useState(5);

  return (
    <div className="min-h-screen bg-[#FFFAF0] text-[#8C6A4E] flex flex-col items-center py-10 px-4">
      {/* Title in script style */}
      <h1
        className="text-5xl text-center mb-6 italic"
        style={{ fontFamily: "'Brush Script MT', cursive", color: '#B76E79' }}
      >
        So Charming..
      </h1>

      {/* Step 1: Select number of charms */}
      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold text-[#8C6A4E] mb-2">
          Step 1: Choose the number of charms
        </h2>
        <select
          value={slotCount}
          onChange={(e) => setSlotCount(parseInt(e.target.value, 10))}
          className="border p-2 rounded bg-[#F5E2DA] text-[#8C6A4E] focus:outline-none"
        >
          <option value={2}>2 charms (anklet 7 in)</option>
          <option value={5}>5 charms (bracelet 7 in)</option>
          <option value={10}>10 charms (bracelet 7 in)</option>
        </select>
      </div>

      {/* Step 2: Charm builder */}
      <CharmBuilder slots={slotCount} />
    </div>
  );
}
