import React, { useState } from 'react';
import CharmBuilder from '../components/CharmBuilder';

export default function BuildYourCharm() {
  const [slotCount, setSlotCount] = useState(5);

  return (
    <div className="min-h-screen bg-white text-[#8C6A4E] flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">
        Welcome To The{' '}
        <span
          style={{
            color: '#EC407A',
            textShadow:
              '0 0 5px #EC407A, 0 0 10px #EC407A, 0 0 20px #EC407A, 0 0 40px #EC407A'
          }}
        >
          Charm Bar
        </span>
      </h1>

      <div className="mb-6">
        <label className="block mb-2">Select number of charms:</label>
        <select
          value={slotCount}
          onChange={(e) => setSlotCount(parseInt(e.target.value, 10))}
          className="border border-[#D4AF37] rounded p-2 text-[#8C6A4E] bg-white focus:outline-none"
        >
          <option value={5}>5 charms (bracelet 7in)</option>
          <option value={7}>7 charms (bracelet 7.5–8in)</option>
          <option value={9}>9 charms (necklace 16in)</option>
          <option value={11}>11 charms (necklace 18in)</option>
          <option value={13}>13 charms (necklace 20–24in)</option>
        </select>
      </div>

      <CharmBuilder slots={slotCount} />
    </div>
  );
}
