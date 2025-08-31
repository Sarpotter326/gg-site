import React, { useState } from 'react';
import CharmBuilder from '../components/CharmBuilder';

export default function BuildYourCharm() {
  const [slotCount, setSlotCount] = useState(5);

  return (
    <div className="min-h-screen bg-[#FFFAF0] text-[#8C6A4E] flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-extrabold text-center mb-6">
        Build Your <span className="text-[#B76E79]">Charm Bar</span>
      </h1>
      <div className="mb-6">
        <label className="block mb-2 text-[#8C6A4E]">Select number of charms:</label>
        <select
          value={slotCount}
          onChange={(e) => setSlotCount(parseInt(e.target.value, 10))}
          className="border p-2 rounded bg-[#F5E2DA] text-[#8C6A4E] focus:outline-none"
        >
          <option value={2}>2 charms (anklet 7in)</option>
          <option value={5}>5 charms (bracelet 7in)</option>
          <option value={10}>10 charms (bracelet 7in)</option>
        </select>
      </div>
      <CharmBuilder slots={slotCount} />
    </div>
  );
}
